const resp = require('../utils/resp')
const db = require("../msdb/todo_list")

function getAllTodoLists(req, res){
  return db.GetAllTodoLists()
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

function addTodoList(req, res){
  const todolist = req.body
  return db.AddTodoList(todolist)
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

function updateTodoList(req, res){
  const todolist = req.body
  return db.UpdateTodoList(todolist)
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

function deleteTodoList(req, res){
  const {id} = req.params
  return db.DeleteTodoList(id)
    .then(data=>{
      // console.log("data received...", data)
      resp.respOK(res,data)
    })
    .catch(err=>{
      resp.respErr(res,500,err.message)
    })
}

module.exports={
  getAllTodoLists,
  addTodoList,
  updateTodoList,
  deleteTodoList
}