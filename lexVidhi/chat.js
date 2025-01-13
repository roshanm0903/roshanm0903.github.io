import { callOpenAIAPI } from './api.js';
import { getDocumentContent } from './document.js';
import { logEvent } from './analytics.js';

async function sendChat() {
  const chatInputElement = document.getElementById("chat-input");
  const chatInput = chatInputElement.value;
  if (!chatInput) return;

  // Clear the input box immediately
  chatInputElement.value = "";

  const messagesContainer = document.getElementById("chat-messages");
  // Add user message
  const userMessage = document.createElement("div");
  userMessage.className = "chat-bubble user";
  userMessage.textContent = chatInput;
  messagesContainer.appendChild(userMessage);

  // Log the question
  logEvent("Q&A", "User Question", "", chatInput);

  // Show typing indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "chat-bubble bot typing";
  typingIndicator.innerHTML =
    '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';
  messagesContainer.appendChild(typingIndicator);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  const documentContent = await getDocumentContent();
  const response = await callOpenAIAPI(documentContent, chatInput);
  const parsedResponse = JSON.parse(response);

  messagesContainer.removeChild(typingIndicator);

  // Add bot response with citations
  const botMessage = document.createElement("div");
  botMessage.className = "chat-bubble bot";
  
  // Create main answer container
  const answerContainer = document.createElement("div");
  answerContainer.innerHTML = parsedResponse.answer;
  botMessage.appendChild(answerContainer);

  // Add citations if available
  if (parsedResponse.citations && parsedResponse.citations.length > 0) {
    const citationsToggle = document.createElement("div");
    citationsToggle.className = "citations-toggle";
    citationsToggle.innerHTML = `
      <i class="bi bi-chevron-down"></i>
      <span>Show ${parsedResponse.citations.length} citations</span>
    `;

    const citationsContainer = document.createElement("div");
    citationsContainer.className = "citations-container";
    citationsContainer.innerHTML = parsedResponse.citations.map(citation => `
      <div class="citation-item">
      <div class="citation-text">"${citation.text}"</div>
      <button class="citation-nav-btn" onclick="navigateToText('${citation.text.replace(/'/g, "\\'")}', 'Q&A')">
        <i class="bi bi-send-fill"></i>
      </button>
      </div>
    `).join('');

    // Toggle citations visibility
    citationsToggle.onclick = () => {
      const isExpanded = citationsContainer.classList.contains("show");
      citationsContainer.classList.toggle("show");
      citationsToggle.innerHTML = `
        <i class="bi bi-chevron-${isExpanded ? 'down' : 'up'}"></i>
        <span>${isExpanded ? 'Show' : 'Hide'} ${parsedResponse.citations.length} citations</span>
      `;
    };

    botMessage.appendChild(citationsToggle);
    botMessage.appendChild(citationsContainer);
  }

  messagesContainer.appendChild(botMessage);

  // Add follow-up questions as chips below the response
  if (parsedResponse.followUpQuestions && parsedResponse.followUpQuestions.length > 0) {
    const suggestionsWrapper = document.createElement("div");
    suggestionsWrapper.className = "suggestions-wrapper mt-2 mb-3";
    
    const suggestionsLabel = document.createElement("div");
    suggestionsLabel.className = "suggestions-label text-muted mb-2";
    suggestionsLabel.textContent = "Follow-up Questions:";
    suggestionsWrapper.appendChild(suggestionsLabel);
    
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.className = "d-flex flex-wrap gap-2";
    
    parsedResponse.followUpQuestions.forEach(question => {
      const chip = document.createElement("button");
      chip.className = "btn btn-sm btn-light border";
      chip.textContent = question;
      chip.onclick = () => {
        document.getElementById("chat-input").value = question;
        document.getElementById("chat-input").focus();
        logEvent("Q&A", "Suggested Question", "", question); // Log the suggested question click event
      };
      suggestionsContainer.appendChild(chip);
    });
    
    suggestionsWrapper.appendChild(suggestionsContainer);
    messagesContainer.appendChild(suggestionsWrapper);
  }

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add event listener for Enter key
document.getElementById("chat-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendChat();
  }
});

export { sendChat };
