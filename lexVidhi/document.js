import { callOpenAIAPI } from './api.js';
import { logEvent } from './analytics.js';

async function getDocumentContent() {
  return Word.run(async (context) => {
    const body = context.document.body;
    body.load("text");
    await context.sync();
    return body.text;
  });
}

async function setTrackChanges(enable) {
  try {
    await Word.run(async (context) => {
      const document = context.document;
      document.changeTrackingMode = enable ? Word.ChangeTrackingMode.trackAll : Word.ChangeTrackingMode.off;
      await context.sync();
    });
  } catch (error) {
    console.error("Error setting track changes:", error);
  }
}

async function improveSelectedText() {
  try {
    await Word.run(async (context) => {
      const selection = context.document.getSelection();
      selection.load("text");
      await context.sync();

      if (!selection.text.trim()) {
        throw new Error("Please select some text first");
      }

      // Show loading state
      const button = document.getElementById("improve-text");
      const originalText = button.textContent;
      button.textContent = "Improving...";
      button.disabled = true;

      // Enable track changes before improving text
      await setTrackChanges(true);

      const response = await callOpenAIAPI(selection.text, null, "text_improvement");
      selection.insertText(response, Word.InsertLocation.replace);
      await context.sync();

      // Disable track changes after improving text
      await setTrackChanges(false);

      // Reset button state
      button.textContent = originalText;
      button.disabled = false;

      logEvent("Improve Text", "Improve Text", "SUCCESS", selection.text);
    });
  } catch (error) {
    console.error("Error:", error);
    // Reset button state and ensure track changes is off in case of error
    const button = document.getElementById("improve-text");
    button.textContent = "Improve Text";
    button.disabled = false;
    await setTrackChanges(false);

    logEvent("Improve Text", "Improve Text", "FAIL", selection.text);
  }
}

async function navigateToText(text, tabContext) {
  try {
    await Word.run(async (context) => {
      const body = context.document.body;
      
      // Get the longest clean substring
      const searchText = findLongestCleanSubstring(text);
      console.log('Searching for:', searchText);
      
      if (searchText.length < 5) {
        console.warn('Search text too short, using original:', text);
        logEvent(tabContext, "Navigate to Text", "FAIL", text);
        return;
      }

      // Search with the clean substring
      const searchResults = body.search(searchText, {
        matchCase: false,
        matchWholeWord: false,
        matchWildcards: false,
        ignorePunct: true,
        ignoreSpace: true
      });
      searchResults.load("items");
      await context.sync();
      
      if (searchResults.items.length > 0) {
        // Select and highlight the text
        const firstMatch = searchResults.items[0];
        firstMatch.select();
        await context.sync();

        logEvent(tabContext, "Navigate to Text", "SUCCESS", searchText);
      } else {
        console.warn("Text not found:", searchText);
        logEvent(tabContext, "Navigate to Text", "FAIL", searchText);
      }
    });
  } catch (error) {
    console.error("Error navigating to text:", error);
    if (error.debugInfo) {
      console.error("Debug info:", error.debugInfo);
    }
    logEvent(tabContext, "Navigate to Text", "FAIL", text);
  }
}

function findLongestCleanSubstring(text) {
  // Split by quotes and special characters
  const parts = text.split(/["']/);
  // Find the longest part
  return parts.reduce((longest, current) => {
    const cleaned = current.trim();
    return cleaned.length > longest.length ? cleaned : longest;
  }, '');
}

async function addComment(text, change, explanation, tabContext) {
  try {
    await Word.run(async (context) => {
      const body = context.document.body;
      const ranges = body.search(text, { matchCase: true, matchWholeWord: false });
      ranges.load("items");
      await context.sync();
      
      if (ranges.items.length > 0) {
        const commentText = `Suggestion: ${change}\n\nWhy: ${explanation}`;
        ranges.items[0].insertComment(commentText);
        ranges.items[0].select(); // Navigate to the text after adding comment
        logEvent(tabContext, "Add Comment", "SUCCESS", text);
      } else {
        logEvent(tabContext, "Add Comment", "FAIL", text);
      }
      await context.sync();
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    logEvent(tabContext, "Add Comment", "FAIL", text);
  }
}

async function monitorSelectionChanges() {
  try {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, handleSelectionChange);
  } catch (error) {
    console.error("Error setting up selection monitor:", error);
  }
}

async function handleSelectionChange() {
  try {
    await Word.run(async (context) => {
      const selection = context.document.getSelection();
      selection.load("text");
      await context.sync();

      const improveTextButton = document.getElementById("improve-text");
      if (selection.text.trim().length > 0) {
        improveTextButton.classList.remove("disabled");
        improveTextButton.disabled = false;
      } else {
        improveTextButton.classList.add("disabled");
        improveTextButton.disabled = true;
      }
    });
  } catch (error) {
    console.error("Error handling selection change:", error);
  }
}

async function applySuggestion(originalText, suggestedText) {
  try {
    await setTrackChanges(true);
    
    await Word.run(async (context) => {
      const body = context.document.body;
      const ranges = body.search(originalText, { matchCase: true, matchWholeWord: false });
      ranges.load("items");
      await context.sync();

      ranges.items[0].insertText(suggestedText, Word.InsertLocation.replace);
      await context.sync();

      logEvent("Review", "Apply Change", "SUCCESS", originalText);
    });
    
    await setTrackChanges(false);
  } catch (error) {
    console.error("Error applying suggestion:", error);
    await setTrackChanges(false);
    logEvent("Review", "Apply Change", "FAIL", originalText);
  }
}

async function updateFields() {
  try {
    const updateButton = document.getElementById("update-fields");
    updateButton.disabled = true;
    updateButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Updating...';

    let hasChanges = false;
    let updateCount = 0;
    const changedFields = {};

    // Collect changed fields
    document.querySelectorAll("#fields-form input[data-field]").forEach(input => {
      const originalValue = input.getAttribute("data-original");
      const currentValue = input.value.trim();
      
      if (originalValue !== currentValue) {
        hasChanges = true;
        changedFields[input.dataset.field] = {
          oldValue: originalValue,
          newValue: currentValue,
        };
      }
    });

    if (!hasChanges) {
      showUpdateMessage('warning', 'No fields were changed');
      resetUpdateButton();
      return;
    }

    await Word.run(async (context) => {
      await setTrackChanges(true);
      const body = context.document.body;

      // Process each changed field
      for (const [field, { oldValue, newValue }] of Object.entries(changedFields)) {
        // Updated search options to include track changes
        const searchOptions = {
          matchCase: true,
          matchWholeWord: true,
          matchPrefix: false,
          matchSuffix: false,
          ignorePunct: false,
          ignoreSpace: false,
          matchWildcards: false,
          includeRevisions: true  // This enables searching in tracked changes
        };

        const searchResults = body.search(oldValue, searchOptions);
        searchResults.load("items");
        await context.sync();

        if (searchResults.items.length > 0) {
          searchResults.items.forEach(searchRange => {
            searchRange.insertText(newValue, Word.InsertLocation.replace);
            updateCount++;
          });

          // Only update the input if the replacement was successful
          const input = document.querySelector(`input[data-field="${field}"]`);
          input.value = newValue;
          input.setAttribute("data-original", newValue);
        } else {
          // If not found, try again with less strict matching
          const looseSearchResults = body.search(oldValue, {
            ...searchOptions,
            matchWholeWord: false,
            includeRevisions: true
          });
          looseSearchResults.load("items");
          await context.sync();

          if (looseSearchResults.items.length > 0) {
            looseSearchResults.items.forEach(searchRange => {
              searchRange.insertText(newValue, Word.InsertLocation.replace);
              updateCount++;
            });

            const input = document.querySelector(`input[data-field="${field}"]`);
            input.value = newValue;
            input.setAttribute("data-original", newValue);
          } else {
            console.warn(`Could not find text to replace: ${oldValue}`);
            showUpdateMessage('warning', `Could not find "${oldValue}" in the document`);
            return;
          }
        }

        await context.sync();
      }

      await setTrackChanges(false);

      // Only show success if we actually made updates
      if (updateCount > 0) {
        showUpdateMessage('success', `Document updated successfully (${updateCount} changes)`);
        logEvent("Quick Fill", "Update Fields", "SUCCESS", JSON.stringify(changedFields));
      } else {
        showUpdateMessage('warning', 'No changes were made to the document');
        logEvent("Quick Fill", "Update Fields", "NONE", JSON.stringify(changedFields));
      }
    });
  } catch (error) {
    console.error("Error updating fields:", error);
    showUpdateMessage('error', `Error updating fields: ${error.message}`);
    logEvent("Quick Fill", "Update Fields", "FAIL", error.message);
  } finally {
    resetUpdateButton();
  }
}

// Add these helper functions after updateFields
function showUpdateMessage(type, message) {
  const updateButton = document.getElementById("update-fields");
  const existingMessage = document.getElementById("update-status-message");
  
  // Remove existing message if present
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageSpan = document.createElement("span");
  messageSpan.id = "update-status-message";
  messageSpan.className = `ms-2 ${type === 'success' ? 'text-success' : 
                                 type === 'warning' ? 'text-warning' : 
                                 'text-danger'}`;
  messageSpan.innerHTML = `<i class="bi ${type === 'success' ? 'bi-check-circle' : 
                                        type === 'warning' ? 'bi-exclamation-circle' : 
                                        'bi-x-circle'}"></i> ${message}`;

  // Insert message after the button
  updateButton.parentNode.insertBefore(messageSpan, updateButton.nextSibling);

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    const msg = document.getElementById("update-status-message");
    if (msg) {
      msg.remove();
    }
  }, 5000);
}

function resetUpdateButton() {
  const updateButton = document.getElementById("update-fields");
  updateButton.className = "btn btn-primary";
  updateButton.innerHTML = 'Update Document';
  updateButton.disabled = false;
}

export { getDocumentContent, setTrackChanges, improveSelectedText, navigateToText, addComment, monitorSelectionChanges, applySuggestion, updateFields };
