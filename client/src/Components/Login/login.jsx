import {GoogleLogin} from 'react-google-login'
import {singInWithGoogle} from "../Firebase"

const clientId = "552260192142-vtjdl7oc8tdsflnrq9ibuc07dd6aun0l.apps.googleusercontent.com"

function LoginButton() {
const onSuccess =(res)=>{
    console.log("login success! Current user:", res.profileObj);
} 
const onFailure =(res)=>{
    console.log("login failed! res:", res);
}

return(
    // <div id='signInButton'>
    //     <GoogleLogin
    //         clientId={clientId}
    //         buttonText='Login'
    //         onSuccess={onSuccess}
    //         onFailure={onFailure}
    //         cookiePolicy={'single_host_origin'}
    //         isSignedIn={true}
    //     />
    // </div>
    <button onClick={singInWithGoogle}>SignInWithGoogle</button>
)

}
export default LoginButton