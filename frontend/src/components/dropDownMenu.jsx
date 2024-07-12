import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../sass/dropDownMenu.scss'
import { useEffect, useRef, useState } from 'react';

const DropDownMenu = () => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef()
  
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        
        return ()=>{document.removeEventListener('mousedown', handler)}
    },[])
    return (
        <>
            <div className='menu-container'  ref={menuRef}> 
                <div className='linebar-title'>
                    <div className='bars' onClick={()=>{setOpen(!open)}}>
                        <div className='bar'></div>
                        <div className='bar'></div>
                        <div className='bar'></div>
                    </div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' ,color:'white'}}>
                        <span>Hossein Zarei</span>
                    </div>
                </div>
                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                    <ul  onClick={()=>{setOpen(!open)}}>
                        <Link to='/'><DropDownItem icon={faShop} text=' Home' /></Link>
                        <Link to='/cart'><DropDownItem icon={faShoppingCart} text=' dashboard' /> </Link>
                        <Link to='/about'><DropDownItem icon={faInfoCircle} text=' chart' /></Link>
                        <Link to='/users'><DropDownItem icon={faUserGroup} text=' planning' /></Link>
                        <Link to='/login'><DropDownItem icon={faSignIn} text=' maintenance' /></Link>
                        <Link to='/login'><DropDownItem icon={faSignIn} text=' statistics' /></Link>
                        <Link to='/login'><DropDownItem icon={faSignIn} text=' Login' /></Link>
                    </ul>
                </div>
            </div>
        </>
    );
    function DropDownItem(props) {
        return (
            <li className='item'>
                <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
                <span>{props.text}</span>
            </li>
        )
    }
}
 
export default DropDownMenu;


