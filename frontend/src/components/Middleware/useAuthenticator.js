import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase_auth";
import useVerifyer from "./useVerifyer";
import useLogout from "./useLogout";


const useAuthenticator = () => {
  const [user, setUser] = useState(null);
  const verifyFunc = useVerifyer();
  const logOut = useLogout();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {

        setUser(user);
        user.getIdToken().then(async (token) => {
          sessionStorage.setItem('auth_token', token);
          const res = await verifyFunc();
          if (res?.data?.message === "success") {
            console.log("success");
          }
          else {
            logOut();
          }
        })
      }
    })

    return () => unsubscribe();
  }, []);

  return { user };
}

export default useAuthenticator