import { createContext, useState } from "react";

export const UserContext=createContext(null)

//********************************************** User Context ****************************** */
const UserContextProvider = (props) => {
  const [login, setLogin] = useState(true)
  const [addUserMsg, setAddUserMsg] = useState({});
  const [messageStatus, setMessageStatus] = useState(false);
  const [schemaLoginError, setSchemaLoginError] = useState(false);
  const [schemaRegisterError, setSchemaRegisterError] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const UserContextValue = {
    login, setLogin, addUserMsg, setAddUserMsg, messageStatus, setMessageStatus,
    schemaLoginError, setSchemaLoginError, schemaRegisterError, setSchemaRegisterError,
    loginEmail, setLoginEmail, registerEmail, setRegisterEmail
  }

  return <UserContext.Provider value={UserContextValue}>{props.children} </UserContext.Provider>
}
export default UserContextProvider





