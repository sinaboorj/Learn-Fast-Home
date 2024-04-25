import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../css/register.css";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash , faEye} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setLogin, Msg, setMsg, loginEmail, setLoginEmail, messageStatus, setMessageStatus ,schemaLoginError, setSchemaLoginError } = useContext(UserContext)
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState({ type: 'password', status: true });

  const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(), //password: yup.string().min(6).matches(/[A-Z]+/).matches(/[a-z]+/).matches(/\d*/).matches(/[!,@,#,$,&,*]+/).required(),
  });

  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });

  //**************************************************** Login User Function ************************************ */
  const loginUser = async (data) => {
    setIsLoading(true);
    setSchemaLoginError(true)
    const loginUserData = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await axios.post("http://localhost:5500/api/login", loginUserData);
     
      if (result) { setMsg(result.data); setMessageStatus(true) } //Login successfully 
    } catch (err) {
      if (err.code === 'ERR_BAD_REQUEST') {
        navigate('/'); setLogin(false); setIsLoading(false); setMessageStatus(false); //Url login Error  or  ERR_BAD_REQUEST -----> refresh link
      } else {
        setMsg(result.data); setMessageStatus(true); //login Error
      }
    }
    setIsLoading(false); setPassword('');  
  };

  useEffect(() => {
    setMsg({}); setMessageStatus(false); setSchemaLoginError(false);
  }, []);
  
  //**************************************************** Login Form ************************************ */
  return (
    <>
      <div className="register-form">
        <div className="input-base">
          <form onSubmit={handleSubmit(loginUser)} className="register-data">

            <div className="register-input" >
              <input {...register("email")} type="email" value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setSchemaLoginError(false); setMessageStatus(false) }}
                placeholder="Email..." tabIndex={1} 
                className="input" onInput={() => { setMessageStatus(false); }} />
            </div>

            <div className="register-input">
              <input {...register("password")} type={showPass.type} value={password}
                onChange={(e) => { setPassword(e.target.value); setSchemaLoginError(false); setMessageStatus(false) }}
                placeholder="Password..." className="input" autoComplete='off' tabIndex={2} />
              <FontAwesomeIcon icon={showPass.status ? faEyeSlash : faEye } className="show-pass" title="Show/Hidden"
                onClick={() => { showPass.status ? setShowPass({ type: 'text', status: false }) : setShowPass({ type: 'password', status: true }) }} />
            </div>

            <div className="forgotpass" ><Link style={{textDecoration:'none', fontWeight:'400'}}>Forgot Password</Link></div>

            <input type="submit" value={"Login"} className="login-btn" onClick={() => setSchemaLoginError(true)} tabIndex={4} />

          </form>
         
        </div>
        {isLoading && <h6 style={{ color: 'blue', textAlign: 'center' }}>Waiting... <img src="/sysImage/loading.gif" width={50} height={50} alt="Loading user" /></h6>}
        {/* *********************************** Login User Msg ********************************  */}
        {messageStatus && (
          <h6 style={{ color: Msg.sendingMsg ? 'green' : 'red', margin: '0px', textAlign: 'center' }}>{Msg.title}</h6>
        )}
        {/* *********************************** Login User Input Error ********************************  */}
        {errors && schemaLoginError && (
          <div className="error-form-register">
            <span> { errors.email?.message}</span>
            <span> { errors.password?.message}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
