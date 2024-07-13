import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const Profile = () => {
    const { userData, headers, backendUrl } = useContext(UserContext);
    
    try {
        const fetchData = async () => {
            const result = await axios.get(`${backendUrl}/api/user/${userData?.userID}`, { headers: headers })
            console.log('result', result?.data)
        }
        fetchData()
    } catch (error) {
            
    }
  
    
    return (
        <>
            <div className="profile">
                <div className="pro-left">
                    <div className="user-name">
                      
                    </div>
                    <div className="user-info">
    
                    </div>
                </div>
                <div className="pro-right">
                    
                    
                </div>
            </div>
        </>
    );
}
 
export default Profile;