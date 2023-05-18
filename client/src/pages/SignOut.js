import { useSignOut } from "react-auth-kit";

function SignOut(){
    const signOut = useSignOut()
    signOut()
    return(
        <h1>You have signed out</h1>
    )
}
export default SignOut;