
const polka = require('polka')
const {json} = require('body-parser')

const getEnv = require('./utils/getEnv')
const resp = require("./utils/resp")
// const config = require("./api.config")
const {loggerMiddleware, setApiName} = require('./utils/log')
// const todos = require('./routes/todos')
const todo_list = require('./routes/todo_list')
const todo_item = require('./routes/todo_item')

const PORT = parseInt(getEnv('API_PORT', '8080'))
const API_NAME = getEnv('API_NAME', 'polka-mssql')
setApiName(API_NAME)

const api = polka()
  .use(json())
  .use(loggerMiddleware)

// Home route (not protected)
api.get("/",(req,res)=>{
  res.end(resp.respOK(res,{response:"It works"}))
})


// TODO LIST
api.get("/todolist", todo_list.getAllTodoLists)
api.post("/todolist", todo_list.addTodoList)
api.put("/todolist", todo_list.updateTodoList)
api.delete("/todolist/:id", todo_list.deleteTodoList)

//TODO ITEMS
api.get("/todolist/:lid/items", todo_item.getTodoItems)
api.post("/todo", todo_item.addTodoItem)
api.put("/todo", todo_item.updateTodoItem)
api.delete("/todo/:id", todo_item.deleteTodoItem)

module.exports={
  api,
  PORT,
  API_NAME
}