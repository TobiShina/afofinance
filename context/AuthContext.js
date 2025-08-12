// context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import firebaseConfig from "../firebaseConfig"; // Your firebase config file

WebBrowser.maybeCompleteAuthSession();

// Initialize Firebase Auth with persistence
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up the Google and Facebook auth requests
  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useAuthRequest({
      webClientId:
        "614382783696-fngv1l5lvjb7hcb2ehe7n78j6md2lhis.apps.googleusercontent.com", // from Google Cloud Console
    });

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: "1759118881663290", // from Facebook for Developers
    });

  useEffect(() => {
    // This listens for auth state changes on Firebase
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handle Google and Facebook responses
  useEffect(() => {
    if (responseGoogle?.type === "success") {
      const { id_token } = responseGoogle.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
    if (responseFacebook?.type === "success") {
      const { access_token } = responseFacebook.authentication;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential);
    }
  }, [responseGoogle, responseFacebook]);

  const signInWithGoogle = () => promptAsyncGoogle();
  const signInWithFacebook = () => promptAsyncFacebook();
  const signOut = () => firebaseSignOut(auth);

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
