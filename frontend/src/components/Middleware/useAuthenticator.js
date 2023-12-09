import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase_auth";

// const useAuthenticator = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const getLoggedInUser = async () => {
//       const u_data = await onAuthStateChanged(auth, (user) => {
//         // Null if no user otherwise complete details
//         console.log("From hook: ", user);
//       });
//       setData(u_data);
//       setLoading(false);
//     }

//     getLoggedInUser();
//   }, [data, loading]);

//   return { data, loading };
// }

const useAuthenticator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
    })

    return () => unsubscribe();
  }, []);

  return { user };
}

export default useAuthenticator