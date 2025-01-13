/* eslint-disable no-undef */
import { API_CONFIG, fetchConfig } from './api.js';

async function logEvent(functionName, eventType, outcome = '', data = '') {
  console.log("Logging event:" + eventType + "\nFunction: " + functionName + "\nOutcome: " + outcome + "\nData: " + data);
  console.log("Email:" + localStorage.getItem("userEmail"));

  try {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    const response = await fetch(`${API_CONFIG.baseUrl}/api/analytics/log`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify({
        email,
        function: functionName,
        event: eventType,
        outcome,
        data
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to log event');
    }
  } catch (error) {
    console.error("Error logging event:", error);
  }
}

async function logDocumentInfo(documentLength, documentType, documentSummary) {
  console.log("Logging document info");
  console.log("Email:" + localStorage.getItem("userEmail"));

  try {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    const response = await fetch(`${API_CONFIG.baseUrl}/api/analytics/log_document_info`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify({
        email,
        document_length: documentLength,
        document_type: documentType,
        document_summary: documentSummary
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to log document info');
    }
  } catch (error) {
    console.error("Error logging document info:", error);
  }
}

export { logEvent, logDocumentInfo };