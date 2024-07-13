import "../../sass/signInUp.scss";
import Login from "./login";
import Register from "./register";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import Home from "../home";
import '../../sass/font.scss'
import { PublicContext } from "../../context/publicContext";

const SignInUp = () => {
    const { login, setLogin, Msg, messageStatus, setMessageStatus } = useContext(UserContext)
    const { lang ,activeLink, setActiveLink  } = useContext(PublicContext);
     
    const handleLinkClick = (link) => {
        setActiveLink(link);
    }
     
    return (
        <>
            <br />
            <div className="login-container">
                <div className="sign-form-container">
                    <div className="sign-form">
                        <div className="user-sign">
                            <span className={`sign ${activeLink === 'login' ? 'active' : ''}`} onClick={() => { handleLinkClick('login'); setLogin(true); setMessageStatus(false) }}> {lang ? 'Login' : 'ورود'}</span>
                            <span className={`sign ${activeLink === 'Register' ? 'active' : ''}`}  onClick={() => { handleLinkClick('Register');setLogin(false);  setMessageStatus(false) }}> {lang ? 'Register' : 'ثبت نام'}</span>
                        </div>
                        {login ? <Login /> : <Register />}
                    </div>
                </div>
                {/* *********************************** Add User Msg ********************************  */}
                {messageStatus && (
                    <div className="user-add-msg" style={{ backgroundColor: Msg.status ? "rgb(16, 189, 27)" : "rgb(238, 44, 44)" }}>
                        <span>{Msg.msg}</span>
                    </div>
                )}
            </div>
           <Home />
        </>
    );
}

export default SignInUp
