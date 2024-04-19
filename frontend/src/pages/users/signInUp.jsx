import "../../css/signInUp.css";
import Login from "./login";
import Register from "./register";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect } from "react";
import Learn from "../../components/learn";

const SignInUp = () => {
    const { login, setLogin, addUserMsg, messageStatus, setMessageStatus} = useContext(UserContext)

    useEffect(() => {
        setLogin(true)
    }, [])

    return (
        <>
            <br />
            <div className="login-container">
                <div className="sign-form-container">
                    <div className="sign-form">
                        <div className="user-sign">
                            <span className="sign" style={{ borderBottom: login ? 'solid 2px #ffd461' : 'solid 2px black', color: login ? '#ffd461' : 'rgb(131 131 131)' }} onClick={() => { setLogin(true); setMessageStatus(false) }}>Sign In</span>
                            <span className="sign" style={{ borderBottom: login ? 'solid 2px black' : 'solid 2px #ffd461', color: login ? 'rgb(131 131 131)' : '#ffd461' }} onClick={() => { setLogin(false); setMessageStatus(false) }}>Sign Up</span>
                        </div>
                        {login ? <Login /> : <Register />}
                    </div>
                </div>
                {/* *********************************** Add User Msg ********************************  */}
                {messageStatus && (
                    <div className="user-add-msg" style={{ backgroundColor: addUserMsg.sendingMsg ? "rgb(16, 189, 27)" : "rgb(238, 44, 44)" }}>
                        <span>{addUserMsg.msg}</span>
                    </div>
                )}
            </div>
            <Learn />
        </>
    );
}

export default SignInUp
