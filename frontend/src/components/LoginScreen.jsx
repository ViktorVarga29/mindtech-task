import {Register} from "./Register.jsx";
import {SignIn} from "./SignIn.jsx";

const LoginScreen = () => {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{width: "300px"}}>
                <Register></Register>
                <SignIn></SignIn>
            </div>
        </div>

    )
}

export default LoginScreen;