import React, { useContext,  useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../sass/register.scss";
import axios from "axios";
import { UserContext } from "../../context/userContext";
//import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash , faEye} from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { Msg, setMsg, messageStatus, setMessageStatus, schemaRegisterError, setSchemaRegisterError, backendUrl } = useContext(UserContext)
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState({ type: 'password', status: true });

  //const navigate = useNavigate()
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(), //password: yup.string().min(6).matches(/[A-Z]+/).matches(/[a-z]+/).matches(/\d*/).matches(/[!,@,#,$,&,*]+/).required(),
    confirmPasswrd: yup.string().required().oneOf([yup.ref("password")], "Confirm password is not matching"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  //**************************************************** Add New User Function ************************************ */
  const addNewUser = async (data) => {
    setIsLoading(true); setSchemaRegisterError(false);
    const newUserData = {
      email: data.email,
      password: data.password,
    };
   
    try {
      if (password !== '' && confirmPassword !== '') {
        const result = await axios.post(`${backendUrl}/api/register`, newUserData);
        if (result) { setMsg(result.data); } //sendeing successfully
      } else {
        setMsg({ status: false, title: 'Error', msg: 'Enter your password' })
      }
      setMessageStatus(true);
    }
    
    catch (err) {
      if (err.response.status === 500) setMsg({ status: false, title: 'Error', msg: 'Something is failed' });  //Internal Service Error 
        
      if (err.response.status === 404) {
        setMsg({ status: false, title: 'Error', msg: 'ERR_BAD_REQUEST : URL Not Found' }); //Url sending Error  or  ERR_BAD_REQUEST 
      }
      else {
        setMsg(err.response.data);   //sending Error
      }
      setMessageStatus(true);
    }

    setIsLoading(false); setPassword(''); setConfirmPassword('');
  };

  //**************************************************** Register Form ************************************ */
  return (
    <>
      <div className="register-form">
        <div className="input-base">

          <form onSubmit={handleSubmit(addNewUser)} className="register-data">

            <div className="register-input" >
              <input {...register("email")} type="email" value={registerEmail}
                onChange={(e) => { setRegisterEmail(e.target.value); setSchemaRegisterError(false); setMessageStatus(false) }}
                placeholder="Email..." tabIndex={1} autoComplete="off"
                className="input" onInput={() => { setMessageStatus(false); }} />
            </div>

            <div className="register-input">
              <input {...register("password")} type={showPass.type} value={password}
                onChange={(e) => { setPassword(e.target.value); setSchemaRegisterError(false); setMessageStatus(false) }}
                placeholder="Password..." className="input" autoComplete='off' tabIndex={2} />
              <FontAwesomeIcon icon={showPass.status ? faEyeSlash : faEye} className="show-pass" title="Show/Hidden"
                onClick={() => { showPass.status ? setShowPass({ type: 'text', status: false }) : setShowPass({ type: 'password', status: true }) }} />
            </div>

            <div className="register-input">
              <input {...register("confirmPasswrd")} type={showPass.type} value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setSchemaRegisterError(false); setMessageStatus(false) }}
                placeholder="Confirm Password..." className="input" autoComplete='off' tabIndex={3} />
              <FontAwesomeIcon icon={showPass.status ? faEyeSlash : faEye} className="show-pass" title="Show/Hidden"
                onClick={() => { showPass.status ? setShowPass({ type: 'text', status: false }) : setShowPass({ type: 'password', status: true }) }} />
            </div>

            <input type="submit" value={"Register"} className="register-btn" onClick={(e) => { setSchemaRegisterError(true); }} tabIndex={4} />
          </form>

        </div>

        {isLoading && <h6 style={{ color: '#0d6efd', textAlign: 'center' }}>Waiting... <img src="/sysImage/loading.gif" width={50} height={50} alt="Loading user" /></h6>}
        {/* *********************************** Sendeing Email Msg ********************************  */}

        {messageStatus && (
          <h6 style={{ color: Msg.status ? 'green' : 'red', marginTop: '20px', textAlign: 'center' }}>{Msg.title}</h6>
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
      <br />
    </>
  );
}

export default Register;
