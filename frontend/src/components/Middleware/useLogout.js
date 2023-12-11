import auth from '../config/firebase_auth';
import { signOut } from "firebase/auth";
const useLogout = () => {

  const logOut = () => {
    signOut(auth);
    sessionStorage.clear();
  }

  return logOut;
}

export default useLogout;