import React, { createContext, useEffect, useState } from "react";
// Use the default export if your package version supports it:
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 1. Define the sign-out function first so it's available to useEffect
  const handleSignOut = () => {
    setLoading(true);
    try {
      localStorage.removeItem("jwtToken"); // Remove token from localStorage
      setUser(null);
      setIsAuthenticated(false);
      console.log("User signed out.");
    } catch (error) {
      console.error("Sign-Out Failed", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. On initial load, check localStorage for the token and decode it
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded token:", decodedUser);
        // Check token expiration (assuming exp is in seconds)
        if (decodedUser.exp * 1000 < Date.now()) {
          console.log("Token expired, logging out.");
          handleSignOut(); // Token expired, so sign out
        } else {
          setUser(decodedUser);
          setIsAuthenticated(true);
          console.log("JWT user loaded:", decodedUser);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("jwtToken");
      }
    }
  }, []); // This runs once on component mount

  // 3. Sign in function to authenticate the user
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post("https://cat-charity-sgdi.vercel.app/api/login", {
        email,
        password,
      });
      if (res.data?.jwtToken) {
        const { jwtToken } = res.data;
        localStorage.setItem("jwtToken", jwtToken);
        const decodedUser = jwtDecode(jwtToken);
        setUser(decodedUser);
        setIsAuthenticated(true);
        console.log("JWT sign in successful:", decodedUser);
        // Return the user so that your login component can handle role-based redirection
        return { success: true, message: "Login successful", user: decodedUser };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login failed", error);
      return { success: false, message: "Login failed. Try again." };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, handleSignOut, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
