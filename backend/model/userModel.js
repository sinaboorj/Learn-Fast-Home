import connection from '../config/connection.js'

class userModel{
    static insertUser = async ( email, password, randomToken, verified) => {
        const result = await connection.query(`INSERT INTO users (userID, email, password, token , verified)
        VALUES(uuid(), ?, ?, ?, ?)`, [email, password, randomToken, verified])
        return this.getByEmail(email )
    }
 
    static getByEmail = async (email) => {
        const [result] = await connection.query(`SELECT * FROM users WHERE email = ?`, [email])
        return result[0]  
    } 
   
    static getById = async (userID) => {
        const [result] = await connection.query(`SELECT * FROM users WHERE BINARY userID = ?`, [userID])
        return result[0]   
    }  

    static getIDandToken = async (userID, token) => {
        const [result] = await connection.query(`SELECT * FROM users WHERE BINARY userID = ? and BINARY token = ?`, [userID , token])
        return result[0]  
    } 
  
    static updateUser = async (userID, firstName, lastName, country, phoneNumber, picName, url) => {
        const [result] = await connection.query(`
        UPDATE users 
        SET firstName = ?, lastName = ?, country = ?, phoneNumber = ?, picName= ?, url= ?
        WHERE BINARY userID = ?`,
            [firstName, lastName, country, phoneNumber, picName, url, userID])
        return this.getById(userID)
    }

    static userVerify = async (userID, verified) => {
        const result = await connection.query(`UPDATE users SET verified = ? WHERE BINARY userID = ?`, [verified, userID])
        return this.getById(userID)
    } 

    static updateToken = async (email , token) => {
        const result = await connection.query(`UPDATE users SET token = ? WHERE email = ?`, [token, email])
        return this.getByEmail(email)
    }
  
}

export default userModel 