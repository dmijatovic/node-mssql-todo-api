
const msdb = require('./msdb')
const {api, PORT, API_NAME} = require('./api')
const {logInfo, logError} = require('./utils/log')
const getEnv = require('./utils/getEnv')

function ConnectDB(withDelay=1000){
  setTimeout(()=>{
    msdb.getPool()
      .then(pool =>{
        if (pool) {
          logInfo(`Connected to MSSQL`)
        } else {
          logError(`Filed to connect to MSSQL. ERROR: client not returned from connection pool`)
        }
      })
      .catch(err=>{
        logError(`Filed to connect to MSSQL. ERROR: ${err.message}`)
        msdb.closeDB()
        process.exit(-1)
      })
  },withDelay)
}

// listen to container/process stop
// and stop polka server
process.on("SIGINT",()=>{
  // console.info("Closing node server on SIGINT")
  msdb.closeDB()
  logInfo("Closing server on SIGINT")
  process.exit(0)
})

process.on("SIGTERM",()=>{
  // console.info("Closing node server on SIGTERM")
  msdb.closeDB()
  logInfo("Closing server on SIGTERM")
  process.exit(0)
})

api.listen(PORT, ()=>{
  //delayed connection - default is low for development
  //in production it should be 30 sec.
  const delay = parseInt(getEnv("API_DELAY","1") * 1000)
  ConnectDB(delay)
  // console.log("Polka server on port",PORT)
  logInfo(`API server on port ${PORT}`)
})
