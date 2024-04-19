import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../css/register.css";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setLogin, addUserMsg, setAddUserMsg, loginEmail, setLoginEmail, messageStatus, setMessageStatus ,schemaLoginError, setSchemaLoginError } = useContext(UserContext)
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState({ type: 'password', status: true });

  const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(), //password: yup.string().min(6).matches(/[A-Z]+/).matches(/[a-z]+/).matches(/\d*/).matches(/[!,@,#,$,&,*]+/).required(),
  });

  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });

  //**************************************************** Add New User Function ************************************ */
  const addNewUser = async (data) => {
    setIsLoading(true);
    setSchemaLoginError(true)
    const newUserData = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await axios.post("http://localhost:5500/api/register", newUserData);
      if (result) { setAddUserMsg(result.data); setMessageStatus(true) } //sendeing successfully
    } catch (err) {
      if (err.code === 'ERR_BAD_REQUEST') {
        navigate('/'); setLogin(false); setIsLoading(false); setPassword(''); setMessageStatus(false); //Url sending Error  or  ERR_BAD_REQUEST -----> refresh link
      } else {
        setAddUserMsg(result.data); setMessageStatus(true); setPassword('');  //sending Error
      }
    }
    setIsLoading(false); setPassword(''); //sending Error
  };

  useEffect(() => {
    setSchemaLoginError(false)
  }, []);
  
  //**************************************************** Register Form ************************************ */
  return (
    <>
      <div className="register-form">
        <h5 className="register-title">Login:</h5>
        <div className="input-base">
          <form onSubmit={handleSubmit(addNewUser)} className="register-data">

            <div className="register-input" >
              <input {...register("email")} type="email" value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setSchemaLoginError(false) }}
                placeholder="Email..." tabIndex={1}
                className="input" onInput={() => { setMessageStatus(false); }} />
            </div>
            <div className="register-input">
              <input {...register("password")} type={showPass.type} value={password}
                onChange={(e) => { setPassword(e.target.value); setSchemaLoginError(false) }}
                placeholder="Password..." className="input" autoComplete='off' tabIndex={2} />
              <FontAwesomeIcon icon={faEyeSlash} className="show-pass" title="Show/Hidden"
                onClick={() => { showPass.status ? setShowPass({ type: 'text', status: false }) : setShowPass({ type: 'password', status: true }) }} />
            </div>

            <input type="submit" value={"Login"} className="register-btn" onClick={() => setSchemaLoginError(true)} tabIndex={4} />
          </form>
        </div>
        {isLoading && <h6 style={{ color: 'blue', textAlign: 'center' }}>Waiting... <img src="/sysImage/addUser.gif" width={50} height={50} alt="Loading user" /></h6>}
        {/* *********************************** Add User Msg ********************************  */}
        {messageStatus && (
          <h6 style={{ color: addUserMsg.sendingMsg ? 'green' : 'red', margin: '0px', textAlign: 'center' }}>{addUserMsg.title}</h6>
        )}
        {/* *********************************** User Input Error ********************************  */}
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
