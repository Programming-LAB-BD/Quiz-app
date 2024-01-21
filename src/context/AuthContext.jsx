import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // // // signup function
  // // My Function
  // async function signup(email, password, username) {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, email, password);

  //   // update profile
  //   await updateProfile(auth.currentUser, {
  //     displayName: username,
  //   });

  //   const user = auth.currentUser;
  //   setCurrentUser({
  //     ...user,
  //   });
  // }

  // // AI Provieded Function
  async function signup(email, password, username) {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      // Update profile
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      setCurrentUser(auth.currentUser);
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  }

  // // // login function
  // // My Function
  // function login(email, password) {
  //   const auth = getAuth();
  //   return signInWithEmailAndPassword(auth, email, password);
  // }

  // // AI Provieded Function
  async function login(email, password) {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  }

  // // // logout function
  // // My Function
  // function logout() {
  //   const auth = getAuth();
  //   return signOut(auth);
  // }

  // // AI Provided Function
  async function logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
