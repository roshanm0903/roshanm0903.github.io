import { API_CONFIG, fetchConfig } from './api.js';

async function checkSession() {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.status}`, {
      ...fetchConfig,
      method: 'GET'
    });
    
    const data = await response.json();
    
    if (response.ok && data.authenticated) {
      hideLoginScreen();
      return true;
    }
    
    showLoginScreen();
    return false;
  } catch (error) {
    console.error('Session check failed:', error);
    showLoginScreen();
    return false;
  }
}

async function handleLogin() {
  const email = document.getElementById("login-email").value.trim();
  if (!email) return { success: false };

  try {
    document.getElementById("login-btn").disabled = true;
    document.getElementById("login-error").style.display = "none";

    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`, {
      ...fetchConfig,
      method: 'POST',
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem("userEmail", email);
    hideLoginScreen();
    return { success: true };
  } catch (error) {
    console.error('Login failed:', error);
    document.getElementById("login-error").innerText = error.message || "Login failed. Please try again.";
    document.getElementById("login-error").style.display = "block";
    return { success: false };
  } finally {
    document.getElementById("login-btn").disabled = false;
  }
}

async function handleLogout() {
  try {
    document.getElementById("logout-btn").disabled = true;
    
    await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.logout}`, {
      ...fetchConfig,
      method: 'POST'
    });
    
    localStorage.removeItem("userEmail");
    showLoginScreen();
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    document.getElementById("logout-btn").disabled = false;
  }
}

function showLoginScreen() {
  document.querySelector(".landing-container").style.display = "block";
  document.getElementById("nav-tabs").style.display = "none";
  document.querySelector(".home-container").style.display = "none";
}

function hideLoginScreen() {
  document.querySelector(".landing-container").style.display = "none";
  document.getElementById("nav-tabs").style.display = "block";
  document.querySelector(".home-container").style.display = "block";
  
}

export { checkSession, handleLogin, handleLogout };
