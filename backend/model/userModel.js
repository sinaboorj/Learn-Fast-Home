import connection from '../config/connection.js'
import profileModel from './profileModel.js'


class userModel {

    static insertUser = async (email, password, randomToken, verified) => {
        const result = await connection.query(`INSERT INTO users (userID, email, password, token , verified)
        VALUES(uuid(), ?, ?, ?, ?)`, [email, password, randomToken, verified])
        return profileModel.getByEmail(email)
    }
 
    static userVerify = async (userID, verified) => {
        const result = await connection.query(`UPDATE users SET verified = ? WHERE BINARY userID = ?`, [verified, userID])
        return profileModel.getById(userID)
    }

    static updateToken = async (email, token) => {
        const result = await connection.query(`UPDATE users SET token = ? WHERE email = ?`, [token, email])
        return profileModel.getByEmail(email)
    }
  
}

export default userModel 