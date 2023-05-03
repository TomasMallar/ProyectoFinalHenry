// import { initializeApp } from "firebase/app";
// import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
// import axios from "axios";
// import { useState } from "react";
// // import { getAnalytics } from "firebase/analytics";
// import { FacebookAuthProvider } from "firebase/auth";
// import jwtDecode from 'jwt-decode';


// export default function GoogleLogin () {

// const firebaseConfig = {
//   apiKey: "AIzaSyBK98pU08vT93dpaUCP_ik9PmpzYgOeZrU",
//   authDomain: "chocolatehub-7cdf2.firebaseapp.com",
//   projectId: "chocolatehub-7cdf2",
//   storageBucket: "chocolatehub-7cdf2.appspot.com",
//   messagingSenderId: "303023514092",
//   appId: "1:303023514092:web:75e2e8fb59564236c520c9",
//   measurementId: "G-8T7HY2F8NQ"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)

// const provider = new GoogleAuthProvider ()
// const providerFb = new FacebookAuthProvider();

// function singInWithGoogle() {

//   signInWithPopup(auth, provider).then(async (result) => {
//     const name = result._tokenResponse.firstName;
//     const surname = result._tokenResponse.lastName;
//     const mail = result._tokenResponse.email;

//     const data = { mail, surname, name };
    
//     try {
      
//       console.log(data, "data de google");
//       const response = await axios.post("http://localhost:3001/auth/google", data);
//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("Name", name);
//         localStorage.setItem("user", mail);

//         ;
//         const decodedToken = jwtDecode(response.data.token);
//         const userRole = decodedToken.rol;
//         const id = decodedToken.id;
//         localStorage.setItem('id', id);
//         // Guardar el rol en localStorage
//         localStorage.setItem("userRole", userRole);
//         console.log(response, "RESPUESTA AXIOS");
        
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }
// const singInWithFacebook = () => {
// // const analytics = getAnalytics(app);
// const auth = getAuth();
// signInWithPopup(auth, providerFb)
//   .then((result) => {
//     // The signed-in user info.
//     const name = result._tokenResponse.firstName
//     const surname = result._tokenResponse.lastName
//     const token = result.user.accessToken
//     const role = 1

//     localStorage.setItem("name", name)
//     localStorage.setItem("surname", surname)
//     localStorage.setItem("token", token)
//     localStorage.setItem("role", role)
     
//     console.log(result);

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;

//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = FacebookAuthProvider.credentialFromError(error);

//     // ...
//   });
// }

// return (
//   <>
//   </>
// )
// }
