import '../css/underLoginForm.css' 
import { FaGoogle,FaApple} from 'react-icons/fa';
    
const LoginWith = () => {
    return (
        <>
            <br />
            <div className='or-login-with'>or login with</div>
            <div className='sign-with-contaner'>
                <div className="sign-in-with-form">
                    <button className="sign-in-with" > <FaGoogle style={{ marginRight: '5px' }} /> Continue with Google</button>
                    <button className="sign-in-with"> <FaApple style={{ marginRight: '5px' }} /> Sign in with Apple</button>
                </div>
            </div>
        </>
    );
}
 
export default LoginWith;