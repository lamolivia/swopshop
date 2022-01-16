import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [curUser, setCurUser] = useState();

  // Keep track of current user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      (async () => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurUser(docSnap.data());
          } else {
            console.error("ERROR: user document doesn't exist");
          }
        }
      })();
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <AppContext.Provider value={{ curUser, setCurUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
