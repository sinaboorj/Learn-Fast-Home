import { Link } from "react-router-dom";
import '../css/footer.css';
import { FaSkype , FaEnvelope, FaMobileAlt, FaMapPin, FaLinkedin} from 'react-icons/fa';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faMapPin, faEnvelope ,faMobileAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <>
            <div className="footer">
             
                <div className="contact">
                    <span className="contact-us"> <FaEnvelope style={{color:'#ffd461'}}/> : sina_boorj@yahoo.com</span>
                    <span className="contact-us"> <FaSkype style={{ color: '#ffd461' }} /> : live:.cid.75d52dccd1467185</span>
                    <span><a className="contact-us unlink-color unlink-decoration" href="https://www.linkedin.com/in/hossein-zarei-462a8a215/"><FaLinkedin  style={{color:'#ffd461'}}/> : Hossein Zarei</a></span>
                    <span className="contact-us"> <FaMapPin style={{color:'#ffd461'}} /> : Iran.Ahvaz</span>
                </div>
                <div>
                    <img className="lf-footer" src="/sysImage/LF-black.png" width={100} height={100} alt="Logo" />
                </div>
                <div className="zarei">
                    <ul style={{color:'rgba(241, 241, 241, 0.54)',fontSize:'15px'}}>
                        <li>Backend: Hossein Zarei (Sina)</li>
                        <li>Fronend: Hossein Zarei (Sina)</li>
                        <li>Database: Hossein Zarei (Sina)</li>
                        <li>Design: Hossein Zarei (Sina)</li>
                    </ul>
                </div>
           
            </div>
            <div className="under-footer" style={{ fontSize: '13px',color:'#383838', backgroundColor:'white' }}>This page was programmed (Backend and Frontend) and designed by Hossein Zarei alias Sina in March 2024.</div>
        </>
    );
}
 
export default Footer;