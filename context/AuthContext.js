// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app, auth, db } from "../firebaseConfig"; // <-- IMPORTANT: Import initialized services

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useAuthRequest({
      webClientId:
        "614382783696-pbdehd5hm30v70dj7t7rkud6jo7bqss6.apps.googleusercontent.com",
      androidClientId:
        "614382783696-7jaau6r07np0bord5h078jq6q147f8uk.apps.googleusercontent.com",
      iosClientId:
        "614382783696-okm0l285kqdetpmpni3fq0en6q1a9c7d.apps.googleusercontent.com",
    });

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: "1759118881663290",
    });

  const createUserProfile = async (user) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(),
      },
      { merge: true }
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        await createUserProfile(authUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
