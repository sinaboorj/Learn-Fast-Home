import { createContext, useEffect, useState } from "react";

export const UserContext=createContext(null)

//********************************************** User Context ****************************** */
const UserContextProvider = (props) => {
  const [login, setLogin] = useState(true)
  const [Msg, setMsg] = useState({});
  const [messageStatus, setMessageStatus] = useState(false);
  const [schemaLoginError, setSchemaLoginError] = useState(false);
  const [schemaRegisterError, setSchemaRegisterError] = useState(false);
  const [hidden, setHidden] = useState(false) //براي زماني كه ميخواهيم يك كاربر جديد را وريفاي كنيم و تمام صفحه شدن پيج وريفاي و مخفي شدن پيج فوتر و نوبار بالاي صفحه
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);


  //*********************************  read email, userID and token to local storage   ****************** */ 
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) ?? {};
    setUserData(storedUserData);
  }, []);

  //*********************************  add email, userID and token to local storage   ****************** */ 
  useEffect(() => {
      if (userData !== undefined) localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': userData?.token
  };

  const level_No = {
    level: userData?.level,
    No: userData?.No,
    unit: userData?.unit
  };

  const UserContextValue = {
    login, setLogin, Msg, setMsg, messageStatus, setMessageStatus,
    schemaLoginError, setSchemaLoginError, schemaRegisterError, setSchemaRegisterError,
    hidden, setHidden, userData, setUserData, headers, level_No, isLoading, setIsLoading
  }

  return <UserContext.Provider value={UserContextValue}>{props.children} </UserContext.Provider>
}
export default UserContextProvider





