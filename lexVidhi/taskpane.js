/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office, Word, fetch */

import { checkSession, handleLogin, handleLogout, showLoginScreen, hideLoginScreen } from './session.js';
import { sendChat } from './chat.js';
import { improveSelectedText, getDocumentContent, navigateToText, addComment, monitorSelectionChanges, applySuggestion, updateFields } from './document.js';
import { callOpenAIAPI, API_CONFIG, fetchConfig } from './api.js';
import { logEvent, logDocumentInfo } from './analytics.js';

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    // Check session status on startup
    checkSession();
    
    
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("send-chat").onclick = sendChat;
    document.getElementById("improve-text").onclick = improveSelectedText;
    // Add Quick Fill tab change listener
    document.getElementById("nav-quickfill-tab").addEventListener("shown.bs.tab", () => {
      logEvent("Quick Fill", "Tab Click");
      extractFields();
    });
    document.getElementById("update-fields").onclick = updateFields;

    document.getElementById("start-review").onclick = startDocumentReview;
    document.getElementById("nav-review-tab").addEventListener("shown.bs.tab", () => {
      logEvent("Review", "Tab Click");
      handleReviewTabShown();
    });

    // Add refresh button handler
    document.getElementById("refresh-review").onclick = () => {
      logEvent("Review", "Refresh Action");
      currentSuggestions = [];
      handleReviewTabShown();
    };

    monitorSelectionChanges();
    // Add login button handler
    document.getElementById("login-btn").onclick = async () => {
      const loginResponse = await handleLogin();
      if (loginResponse.success) {
        generateDocumentSummary();
      }
    };

    document.getElementById("nav-timeline-tab").addEventListener("shown.bs.tab", () => {
      logEvent("Timeline", "Tab Click");
      handleTimelineTabShown();
    });

    document.getElementById("nav-qa-tab").addEventListener("shown.bs.tab", () => {
      logEvent("Q&A", "Tab Click");
    });

    document.getElementById("refresh-timeline").onclick = () => {
      logEvent("Timeline", "Refresh Action");
      handleTimelineTabShown();
    };
  }
});

async function generateDocumentSummary() {
  try {
    const documentContent = await getDocumentContent();
    console.log("Document content fetched:", documentContent);
    const response = await callOpenAIAPI(documentContent, null, "summary");
    console.log("API response received:", response);
    const parsedResponse = JSON.parse(response);
    const summaryElement = document.getElementById("document-summary");
    summaryElement.textContent = parsedResponse.summary;
    // Log the document type
    const wordCount = documentContent.split(/\s+/).length;
    console.log("Logging document info:", wordCount, parsedResponse.documentType, parsedResponse.summary);
    await logDocumentInfo(wordCount, parsedResponse.documentType, parsedResponse.summary);
  } catch (error) {
    console.error("Error generating document summary:", error);
  }
}

// Make handleLogout available globally
window.handleLogout = handleLogout;

async function extractFields() {
  try {
    const documentContent = await getDocumentContent();
    const response = await callOpenAIAPI(documentContent, null, "field_extraction");
    const fields = JSON.parse(response);
    console.log("Extracted fields:", fields);

    // Store original values in data attributes
    const formHtml = Object.entries(fields)
      .map(
        ([key, value]) => `
      <div class="mb-3">
        <label class="form-label">${formatFieldName(key)}</label>
        <input type="text" class="form-control" data-field="${key}" data-original="${value}" value="${value}">
      </div>
    `
      )
      .join("");

    document.getElementById("fields-form").innerHTML = formHtml;
    document.getElementById("update-fields").disabled = false;
  } catch (error) {
    console.error("Error extracting fields:", error);
    document.getElementById("fields-form").innerHTML = '<div class="alert alert-danger">Error extracting fields</div>';
  }
}

function formatFieldName(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
}


async function startDocumentReview() {
  // Switch to review tab
  const reviewTab = document.getElementById("nav-review-tab");
  reviewTab.click();
}

// Add this variable at the top level
let currentSuggestions = [];

async function handleReviewTabShown() {
  try {
    const suggestionContainer = document.getElementById("review-suggestions");
    
    // Only fetch new suggestions if we don't have any
    if (currentSuggestions.length === 0) {
      suggestionContainer.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div></div>';
      
      const documentContent = await getDocumentContent();
      const response = await callOpenAIAPI(documentContent, null, "review");
      currentSuggestions = JSON.parse(response).suggestions;
    }
    
    renderSuggestions();
  } catch (error) {
    console.error("Error reviewing document:", error);
  }
}

// Make handleReviewTabShown available globally
window.handleReviewTabShown = handleReviewTabShown;

// Make navigateToText available globally
window.navigateToText = (text, context) => {
  logEvent("navigate_button_click", { event: context });
  navigateToText(text, context);
};

// Make addComment available globally
window.addComment = (text, change, explanation, context) => {
  logEvent("add_comment_click", { event: context });
  addComment(text, change, explanation, context);
};

function renderSuggestions() {
  const suggestionContainer = document.getElementById("review-suggestions");
  
  const suggestionHtml = currentSuggestions.map((suggestion, index) => `
    <div class="suggestion-card card mt-4" id="suggestion-${index}">
      <div class="card-body">
        <i class="bi bi-x-lg close-suggestion" onclick="dismissSuggestion(${index})"></i>
        <div class="d-flex justify-content-between align-items-start m-0">
          <span class="badge badge-importance ${suggestion.importance.toLowerCase()}">${suggestion.importance}</span>
        </div>
        <div class="d-flex justify-content-between align-items-start mb-0">
          <div class="suggestion-title">${suggestion.title}</div>
        </div>
        <div class="original-text mb-2">
          <strong>Original:</strong>
          <p class="mb-0">${suggestion.originalText}</p>
        </div>
        <div class="suggested-text mb-2">
          <strong>Suggestion:</strong>
          <p class="mb-0">${suggestion.suggestedText}</p>
        </div>
        <div class="mb-2">
          <p class="mb-0">${suggestion.explanation}</p>
        </div>
        <div class="d-flex justify-content-between gap-2">
          <button class="btn btn-sm btn-outline-secondary" onclick="navigateToText('${suggestion.originalText.replace(/'/g, "\\'")}', 'Review Tab')">
            <i class="bi bi-send-fill"></i> Navigate
          </button>
          <button class="btn btn-sm btn-primary" 
            onclick="addComment('${suggestion.originalText.replace(/'/g, "\\'")}', '${suggestion.suggestedText.replace(/'/g, "\\'")}', '${suggestion.explanation.replace(/'/g, "\\'")}', 'Review Tab')">
            <i class="bi bi-chat-quote"></i> Add Comment
          </button>
          <button class="btn btn-primary btn-sm apply-suggestion" data-original="${suggestion.originalText.replace(/'/g, "\\'")}" 
            data-suggested="${encodeURIComponent(suggestion.suggestedText)}">
            Apply Change
          </button>
        </div>
      </div>
    </div>
  `).join('');

  suggestionContainer.innerHTML = suggestionHtml || '<div class="alert alert-info">No suggestions available</div>';

  // Add click handlers for apply buttons
  document.querySelectorAll('.apply-suggestion').forEach(button => {
    button.onclick = () => {
      logEvent("apply_change_click", { event: "Review Tab" });
      applySuggestion(
        decodeURIComponent(button.dataset.original),
        decodeURIComponent(button.dataset.suggested)
      );
    };
  });
}

// Add this function to handle suggestion dismissal
function dismissSuggestion(index) {
  currentSuggestions.splice(index, 1);
  renderSuggestions();
}

// Make dismissSuggestion available globally
window.dismissSuggestion = dismissSuggestion;



async function handleTimelineTabShown() {
  try {
    const timelineContainer = document.getElementById("timeline-container");
    timelineContainer.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div></div>';
    
    const documentContent = await getDocumentContent();
    const response = await callOpenAIAPI(documentContent, null, "timeline");
    const timelineData = JSON.parse(response);
    
    renderTimeline(timelineData.events);
    logEvent("Timeline", "Load", "SUCCESS", "Timeline refreshed successfully");
  } catch (error) {
    console.error("Error loading timeline:", error);
    document.getElementById("timeline-container").innerHTML = 
      '<div class="alert alert-danger">Error loading timeline</div>';
    logEvent("Timeline", "Load", "FAIL", error.message);
  }
}

function renderTimeline(events) {
  // Sort events by date and time
  events.sort((a, b) => {
    const dateA = new Date(a.date + (a.time ? 'T' + a.time : ''));
    const dateB = new Date(b.date + (b.time ? 'T' + b.time : ''));
    return dateA - dateB;
  });

  const typeDescriptions = {
    deadline: 'Critical deadline or due date',
    milestone: 'Important project milestone',
    effective: 'Effective date or start date',
    execution: 'Document execution or signing',
    other: 'General event'
  };

  const timelineHtml = `
    <div class="timeline">
      ${events.map(event => `
        <div class="timeline-item ${event.type}">
          <div class="timeline-date">
            ${formatDate(event.date)}
            ${event.time ? ' at ' + formatTime(event.time) : ''}
          </div>
          <div class="timeline-event ${event.type}" 
               data-type="${typeDescriptions[event.type] || 'Event'}"
               title="${event.event}">
            ${event.event}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById("timeline-container").innerHTML = timelineHtml;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(timeStr) {
  return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  });
}
