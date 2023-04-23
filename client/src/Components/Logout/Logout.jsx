import {GoogleLogin} from 'react-google-login'

const clientId = "552260192142-vtjdl7oc8tdsflnrq9ibuc07dd6aun0l.apps.googleusercontent.com"

function LogoutButton() {
const onSuccess =()=>{
    console.log("Logout Successful!");
}


return(
    <div id='signInButton'>
        <GoogleLogin
            clientId={clientId}
            buttonText='Logout'
            onSuccess={onSuccess}
        />
    </div>
)

}
export default LogoutButton