import GoogleLogin from "../Firebase"
import style from './googleLogin.module.css'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
// import { getAnalytics } from "firebase/analytics";
import jwtDecode from 'jwt-decode';


function LoginButton() {

  const [success, setSuccess] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyBK98pU08vT93dpaUCP_ik9PmpzYgOeZrU",
    authDomain: "chocolatehub-7cdf2.firebaseapp.com",
    projectId: "chocolatehub-7cdf2",
    storageBucket: "chocolatehub-7cdf2.appspot.com",
    messagingSenderId: "303023514092",
    appId: "1:303023514092:web:75e2e8fb59564236c520c9",
    measurementId: "G-8T7HY2F8NQ"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  const provider = new GoogleAuthProvider()

  const singInWithGoogle = () => {

    signInWithPopup(auth, provider).then(async (result) => {
      const name = result._tokenResponse.firstName;
      const surname = result._tokenResponse.lastName;
      const mail = result._tokenResponse.email;

      const data = { mail, surname, name };

      try {

        console.log(data, "data de google");
        const response = await axios.post("/auth/google", data);
        console.log(response.data, "soy data")
        if (response.data.token) {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("Name", JSON.stringify(name));
          sessionStorage.setItem("mail", JSON.stringify(mail));
          sessionStorage.setItem("user", JSON.stringify(data));


          ;
          const decodedToken = jwtDecode(response.data.token);
          const userRole = decodedToken.rol;
          const id = decodedToken.id;
          sessionStorage.setItem('id', id);
          // Guardar el rol en sessionStorage
          sessionStorage.setItem("userRole", userRole);
          console.log(response, "RESPUESTA AXIOS");
          setSuccess(true)

        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  const handleOnClickGoogle = (event) => {
    event.preventDefault()
    singInWithGoogle()
  }














  return (
    <>{success ? (
      <Redirect to="/home" />
    ) : (
      <><button onClick={handleOnClickGoogle} type="button" className={style.loginBtnGoogle}>
        Sign in with Google
      </button><button className={style.loginBtnFacebook} onClick={GoogleLogin}>Sign In With Facebook</button></>
    )}</>
  )

}
export default LoginButton