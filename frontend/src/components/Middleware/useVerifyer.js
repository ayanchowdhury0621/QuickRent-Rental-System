import React, { useEffect, useState } from 'react';
import axios from "axios";

const useVerifyer = () => {

  const verifyToken = async () => {
    try {
      const auth_server = 'http://localhost:5000/api/verify';
      const token = sessionStorage.getItem('auth_token');
      const res = await axios.get(auth_server, {
        headers: {
          Authorization: 'Bearer ' + token,
          // Authorization: 'Bearer ' + "token",
        }
      });

      return (res);
    }
    catch (error) {
      console.log("Axios error: ", error);
      return ({ message: "Internal Server Error", location: "frontend", type: "authentication" });
    }
  }

  return verifyToken;
}

export default useVerifyer;