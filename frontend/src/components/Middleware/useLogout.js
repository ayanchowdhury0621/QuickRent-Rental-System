import auth from '../config/firebase_auth';
import { signOut } from "firebase/auth";
const useLogout = () => {

  const logOut = () => {
    signOut(auth);
    sessionStorage.clear();
    window.location.href = "/";
  }

  return logOut;
}

export default useLogout;