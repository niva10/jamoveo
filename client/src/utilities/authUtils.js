
import { BASE_SERVER_URL } from "./api";

// Fetch the currently logged-in user from the backend
export async function fetchCurrentUser() {
    try {
      const res = await fetch(`${BASE_SERVER_URL}/auth/me`, {
        method: "GET",
        credentials: "include", // includes session cookies in the request
      });
  
      if (!res.ok) return null;
  
      const user = await res.json();
      return user; 

    } catch (err) {
      console.error("Failed to fetch current user:", err);
      return null;
    }
}

// Send login request to the backend
export async function loginUser(userName, password) {
  try {
    const response = await fetch(`${BASE_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",     // Enables session cookie
      body: JSON.stringify({ userName, password }),
    });

    if (!response.ok) {
      return null; 
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Login error:", error.message);
    return null;
  }
}

// Send signup request to the backend
export async function signupUser(userName, password, instrument, role) {
  try {
    const response = await fetch(`${BASE_SERVER_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userName, password, instrument, role }),
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
    
  } catch (error) {
    console.error("Signup error:", error.message);
    return null;
  }
}


  