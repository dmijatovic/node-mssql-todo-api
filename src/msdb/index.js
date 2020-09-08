
const mssql = require('mssql')
const getEnv = require('../utils/getEnv')
const { logInfo } = require('../utils/log')

const config={
  "server": getEnv("MSSQL_HOST","localhost"),
  "port": parseInt(getEnv("MSSQL_PORT","1433")),
  "database":getEnv("MSSQL_DB","todo_db"),
  "user":getEnv("MSSQL_USER","SA"),
  "password":getEnv("MSSQL_PASS","Pa55word!"),
  "pool":{
    "max":parseInt(getEnv("MSSQL_POOL_SIZE","30")),
    "min":0,
    "idleTimeoutMillis": 30000
  },
  "options":{
    "enableArithAbort":false
  }
}

let Pool = undefined
function getPool(){
  return new Promise((res,rej)=>{
    if (Pool){
      // console.log("Returning saved Pool...")
      // return saved pool
      res(Pool)
    } else {
      //create new pool
      mssql.connect(config)
        .then(pool=>{
          Pool=pool
          res(Pool)
        })
        .catch(e=>{
          Pool = undefined
          rej(e)
        })
    }
  })
}

function closeDB(){
  logInfo("Closing MSSQL connection...")
  if (Pool){
    Pool.close()
  }
  mssql.close()
}

// export default pool
module.exports = {
  getPool,
  closeDB
}