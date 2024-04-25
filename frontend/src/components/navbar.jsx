import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import '../css/navbar.css'
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Navbar = () => {
    const { hidden } = useContext(UserContext)
    return (
        <>
            {!hidden && (
                <>
                    <div className="main-nav">

                        <div className="nav-left">
                            <Link to='/' className="nav-link "><img className="nav-logo" src="/sysImage/Logo.png" width={30} height={30} alt="Logo" /></Link>
                            <Link to='/' className="nav-link">Learn Fast</Link>
                        </div>

                        <div className="nav-center">
                            <Link to='/api/shop' className="nav-link">Dashboard</Link>
                            <Link to='/api/shop' className="nav-link">Products</Link>
                            <Link to='/api/about' className="nav-link about">About</Link>
                        </div>

                        <div className="nav-right">
                            <Link to='/api/cart' className="nav-link cart-icon"><FontAwesomeIcon icon={faCartShopping} /></Link>
                            <Link to='/api/login:signup' className="nav-link login-item">Login</Link>
                            <img onClick={() => { alert('Coming Soon') }} src="/sysImage/Englan.png" className="nav-link language" title="change language" width={20} height={10} alt="language" />
                        </div>

                    </div>
                </>
            )}
            
        </>
    );
}
 
export default Navbar;
