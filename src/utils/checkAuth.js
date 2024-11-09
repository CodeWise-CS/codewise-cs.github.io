import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function checkAuth(toPage) {
    const navigate = useNavigate();

    onAuthStateChanged(auth, user => {
        if (user) {
            const uid = user.uid;
        } else {
            navigate(toPage)
        }   
      })
}

export default checkAuth;