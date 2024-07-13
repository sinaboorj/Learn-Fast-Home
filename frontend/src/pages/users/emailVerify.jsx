import { useContext, useEffect, useState } from 'react'
import '../../sass/emailVerify.scss'
import success from '/sysImage/success.png'
import error from '/sysImage/warningSmall.png'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext'

const EmailVerify = () => {
    const [validationMsg, setValidationMsg] = useState('')
    const { userID, token } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const {setHidden , backendUrl} = useContext(UserContext);

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `${backendUrl}/api/${userID}/mail-verification/${token}` //localhost:متغيير 
                const result = await axios.put(url)
               
                if (result) {        // تاييد ايميل 
                    setValidationMsg(result.data)
                }
    
            } catch (error) {        // خطاي تاييد ايميل يا خطاي لينك
                setValidationMsg(error.response.data)
            }
            setIsLoading(false)
        }
        setHidden(true)
        verifyEmailUrl()
    }, [userID, token])

    return (
        <>
            {isLoading && (
                <div className='contaner-verify'>
                    <h4 style={{ color: '#b7b2b2', textAlign: 'center' }}>Waiting... <img src="/sysImage/loading.gif" width={100} height={100} alt="Loading user" /></h4>
                </div>
            )}

            {validationMsg.verification && validationMsg.title === 'Successful' && (
                <div className='contaner-verify'>
                    <img src={success} alt="Verify-img" className='verification-img' />
                    <h5 style={{ color: '#b7b2b2', textAlign: 'center' }}>{validationMsg.msg}</h5>
                    <Link to={'/api/login'} className='verifylogin'>
                        Login
                    </Link>
                </div>
            )}

            {validationMsg.verification && validationMsg.title === 'Error' && (
                <div className='contaner-verify'>
                    <img src={success} alt="Verify-img" className='verification-img' />
                    <h5 style={{ color: 'red', textAlign: 'center' }}>{validationMsg.msg}</h5>
                    <Link to={'/api/login'} className='verifylogin'>
                        Login
                    </Link> 
                </div>
            )}
           
            {!validationMsg.verification && validationMsg.title === 'Error' && (
                <div className='contaner-verify'>
                    <img src={error} alt="Verify-img" className='verification-img' />
                    <h5 style={{ color: 'red', textAlign: 'center' }}>{validationMsg.title}</h5>
                    <h6 style={{ color: '#b7b2b2' }}>{validationMsg.msg}</h6>
                </div>
            )}
        </>
    )
}
export default EmailVerify
