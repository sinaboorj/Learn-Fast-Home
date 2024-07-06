import { createContext, useEffect, useState } from "react";
import Strings from "../helper/strings";


export const LanguageContext = createContext(null) 
//********************************************** Language Context ****************************** */
const LanguageContextProvider = (props) => {

  const [lang, setLang] = useState(JSON.parse(localStorage.getItem('language')) ?? true)

  //********************************* Save local storage ************************************* */ 
  useEffect(() => {
    if (lang !== undefined) localStorage.setItem('language', JSON.stringify(lang))
  }, [lang])

  //******************************** Main Body ************************************************ */
  
  lang ? Strings.setLanguage('en') : Strings.setLanguage('fa')

  //********************************* Value ************************************************* */
  const languageContextValue = { lang, setLang }
    
  return <LanguageContext.Provider value={languageContextValue}>{props.children}</LanguageContext.Provider>
}
 
export default LanguageContextProvider;