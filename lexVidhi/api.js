const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === "development" 
    ? "http://127.0.0.1:5000" 
    : "https://cenco.pythonanywhere.com",
  endpoints: {
    process: '/api/openai/process',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    status: '/api/auth/status'
  }
};

const fetchConfig = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: 'cors'
};

async function callOpenAIAPI(content, instruction, mode = "qa") {
    console.log("API call to server");
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.process}`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify({
        content,
        instruction,
        mode,
        email: localStorage.getItem("userEmail")
      }),
    });

    const data = await response.json();

    if (response.status === 401) {
      await showLoginScreen();
      throw new Error('Session expired');
    }

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data.response;
  } catch (error) {
    console.error("API call failed:", error);
    if (error.message === 'Session expired') {
      showLoginScreen();
    }
    throw error;
  }
}

export { callOpenAIAPI, API_CONFIG, fetchConfig };
