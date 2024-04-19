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

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { setLogin, addUserMsg, registerEmail, setRegisterEmail, setAddUserMsg, messageStatus, setMessageStatus, schemaRegisterError, setSchemaRegisterError } = useContext(UserContext)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState({ type: 'password', status: true });

  const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(), //password: yup.string().min(6).matches(/[A-Z]+/).matches(/[a-z]+/).matches(/\d*/).matches(/[!,@,#,$,&,*]+/).required(),
    confirmPasswrd: yup.string().oneOf([yup.ref("password")], "Confirm password is not matching").required(),
  });

  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setSchemaRegisterError(false)
  }, []);
  //**************************************************** Add New User Function ************************************ */
  const addNewUser = async (data) => {
    setIsLoading(true);
    setSchemaRegisterError(true)
    const newUserData = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await axios.post("http://localhost:5500/api/register", newUserData);
      if (result) { setAddUserMsg(result.data); setMessageStatus(true) } //sendeing successfully
    } catch (err) {
      if (err.code === 'ERR_BAD_REQUEST') {
        navigate('/'); setLogin(false); setIsLoading(false); setPassword(''); setConfirmPassword(''); setMessageStatus(false); //Url sending Error  or  ERR_BAD_REQUEST -----> refresh link
      } else {
        setAddUserMsg(result.data); setMessageStatus(true); setPassword(''); setConfirmPassword(''); //sending Error
      }
    }
    setIsLoading(false); setPassword(''); setConfirmPassword(''); //sending Error
  };

  //**************************************************** Register Form ************************************ */
  return (
    <>
      <div className="register-form">
        <h5 className="register-title">Register:</h5>
        <div className="input-base">
          <form onSubmit={handleSubmit(addNewUser)} className="register-data">

            <div className="register-input" >
              <input {...register("email")} type="email" value={registerEmail}
                onChange={(e) => { setRegisterEmail(e.target.value); setSchemaRegisterError(false) }}
                placeholder="Email..." tabIndex={1}
                className="input" onInput={() => { setMessageStatus(false); }} />
            </div>
            <div className="register-input">
              <input {...register("password")} type={showPass.type} value={password}
                onChange={(e) => { setPassword(e.target.value); setSchemaRegisterError(false) }}
                placeholder="Password..." className="input" autoComplete='off' tabIndex={2} />
              <FontAwesomeIcon icon={faEyeSlash} className="show-pass" title="Show/Hidden"
                onClick={() => { showPass.status ? setShowPass({ type: 'text', status: false }) : setShowPass({ type: 'password', status: true }) }} />
            </div>

            <div className="register-input">
              <input {...register("confirmPasswrd")} type={showPass.type} value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setSchemaRegisterError(false) }}
                placeholder="Confirm Password..." className="input" autoComplete='off' tabIndex={3} />
              <FontAwesomeIcon icon={faEyeSlash} className="show-pass" title="Show/Hidden"
                onClick={() => { showPass.status ? setShowPass({ type: 'text', status: false }) : setShowPass({ type: 'password', status: true }) }} />
            </div>

            <input type="submit" value={"Register"} className="register-btn" onClick={() => setSchemaRegisterError(true)} tabIndex={4} />
          </form>
        </div>
        {isLoading && <h6 style={{ color: 'blue', textAlign: 'center' }}>Waiting... <img src="/sysImage/addUser.gif" width={50} height={50} alt="Loading user" /></h6>}
        {/* *********************************** Add User Msg ********************************  */}
        {messageStatus && (
          <h6 style={{ color: addUserMsg.sendingMsg ? 'green' : 'red', margin: '0px', textAlign: 'center' }}>{addUserMsg.title}</h6>
        )}
        {/* *********************************** User Input Error ********************************  */}
        {errors && schemaRegisterError && (
          <div className="error-form-register">
            <span>{errors.email?.message}</span>
            <span>{errors.password?.message}</span>
            <span>{errors.confirmPasswrd?.message}</span>
          </div>
        )}
      </div>
      <div>H</div>
    </>
  );
}

export default Register;
