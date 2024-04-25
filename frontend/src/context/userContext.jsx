import { createContext, useState } from "react";

export const UserContext=createContext(null)

//********************************************** User Context ****************************** */
const UserContextProvider = (props) => {
  const [login, setLogin] = useState(true)
  const [Msg, setMsg] = useState({});
  const [messageStatus, setMessageStatus] = useState(false);
  const [schemaLoginError, setSchemaLoginError] = useState(false);
  const [schemaRegisterError, setSchemaRegisterError] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [hidden, setHidden]=useState(false)

  const UserContextValue = {
    login, setLogin, Msg, setMsg, messageStatus, setMessageStatus,
    schemaLoginError, setSchemaLoginError, schemaRegisterError, setSchemaRegisterError,
    loginEmail, setLoginEmail, registerEmail, setRegisterEmail, hidden, setHidden
  }

  return <UserContext.Provider value={UserContextValue}>{props.children} </UserContext.Provider>
}
export default UserContextProvider





