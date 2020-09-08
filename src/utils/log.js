
let API_NAME="todo-polka-api"

function setApiName(name){
  API_NAME = name
}

function logInfo(message="", service=API_NAME){
  const log=`${Date.now()} ${service} ${message}\n`
  process.stdout.write(log)
}

function logError(message="", service=API_NAME){
  const err=`${Date.now()} ${service} ${message}\n`
  process.stderr.write(err)
}

function loggerMiddleware(req, res, next){
  logInfo(`${req.method} ${req.url} - ${res.statusCode}`)
  next()
}

module.exports = {
  setApiName,
  logInfo,
  logError,
  loggerMiddleware
}