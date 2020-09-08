const resp = require("../utils/resp")
const db = require("../msdb/todo_item")

function getTodoItems(req, res){
  const {lid} = req.params
  return db.GetTodoItems(lid)
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

function addTodoItem(req, res){
  const todo = req.body
  return db.AddTodoItem(todo)
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

function updateTodoItem(req, res){
  const todo = req.body
  return db.UpdateTodoItem(todo)
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

function deleteTodoItem(req, res){
  const {id} = req.params
  return db.DeleteTodoItem(id)
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

module.exports={
  getTodoItems,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem
}