// import sql from 'mssql'
// dotenv.config(); 


// const sqlConfig = {  
//     user: process.env.DB_SQL_USERNAME, 
//     password: process.env.DB_SQL_PASSWORD,
//     database:  process.env.DB_SQL_DATABASE, 
//     server:  process.env.DB_SQL_HOST,
//     options: {
//       encrypt: false, 
//     }
//   } 
    
  
//   const poolPromise = new sql.ConnectionPool(sqlConfig).connect().then((pool) => {
//           console.log('connected to pool')
//           return pool
//       }).catch(err => 
//           console.log('Error:'+ err)
//   )
  
//    const gettolid = async () => {
//       const pool = await poolPromise
//       const request = pool.request()
//       const result = await request.query('SELECT * FROM tb_Produce') 
//       console.log(result)
//    }
  
//    gettolid()