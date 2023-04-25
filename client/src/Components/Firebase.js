import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";

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
export const auth = getAuth(app)

const provider = new GoogleAuthProvider ()

export const singInWithGoogle =  () =>{
    signInWithPopup (auth, provider).then((result) =>{
        const name = result._tokenResponse.firstName
        const surname = result._tokenResponse.lastName
        const token = result.user.accessToken
        const role = 1

        sessionStorage.setItem("name", name)
        sessionStorage.setItem("surname", surname)
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("role", role)

        console.log(result);
    
    }).catch((error) =>{
        console.log(error);
    })
};
// const analytics = getAnalytics(app);