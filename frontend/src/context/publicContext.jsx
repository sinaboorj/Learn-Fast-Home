import { createContext, useEffect, useState } from "react";
import Strings from "../helper/strings";
import { useNavigate } from "react-router-dom";

export const PublicContext = createContext(null) 
//********************************************** Language Context ****************************** */
const PublicContextProvider = (props) => {
  const [lang, setLang] = useState(JSON.parse(localStorage.getItem('language')) ?? true)
  const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') ?? 'home'); //برای ثابت ماندن رنگ لینک انتخابی
  const nav = useNavigate()

  //********************************* Save local storage ************************************* */
  useEffect(() => {
    const url = window.location.href;// ست كردن رنگ در زمان رفرش شدن

    if (url.includes('/api/login') && activeLink !== 'Register') setActiveLink('login')
    
    let currenturl = localStorage.getItem('currentURL')// رفتن به لينك قبل از رفرش شدن
  
    if (currenturl !== null) {
     
      if (currenturl.includes('/api/')) {
        let myLink = currenturl.slice(0, currenturl.indexOf('/api/'));
        currenturl = currenturl.replace(myLink, '')
      } else {
        currenturl = '/'
      }
      nav(currenturl)
    } else {
      nav('/')
    }
  }, [])

  useEffect(() => {
    if (lang !== undefined) localStorage.setItem('language', JSON.stringify(lang))
    if (activeLink !== undefined) {
      localStorage.setItem('activeLink', activeLink)
      const currentURL = window.location.href;
      localStorage.setItem('currentURL', currentURL)
    }

  }, [lang, activeLink])


  //******************************** Main Body ************************************************ */
  
  lang ? Strings.setLanguage('en') : Strings.setLanguage('fa')

  //********************************* Value ************************************************* */
  const PublicContextValue = {
    lang, setLang, activeLink, setActiveLink
  }
    
  return <PublicContext.Provider value={PublicContextValue}>{props.children}</PublicContext.Provider>
}
 
export default PublicContextProvider;