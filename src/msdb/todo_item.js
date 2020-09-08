const msSQL = require('mssql');
const { getPool } = require("./index")
const { logInfo } = require("../utils/log")

function GetTodoItems(lid=0){
  if (lid===0){
    throw Error("Missing list id property")
  }
  return getPool().then(pool=>{
    // create new sql request
    const req = new msSQL.Request(pool)
    req.input('lid',msSQL.BigInt, lid)
    const sql=`SELECT TOP(50) id, list_id, title, checked FROM todo_item WHERE list_id=@lid;`
    // run query
    return req.query(sql)
      .then(result=>{
        // console.log("DeleteTodoList.result: ", result)
        const {recordset} = result
        return recordset
      })
    // better to catch error in other function
  })
}


function AddTodoItem(todo){
  if (!todo['list_id']){
    throw Error("Missing list id property")
  }
  return getPool().then(pool=>{
    // create new sql request
    const req = new msSQL.Request(pool)
    // construct input params and sql query
    req.input('list_id',msSQL.BigInt, todo['list_id'])
    req.input('title',msSQL.NVarChar, todo['title'])
    req.input('checked',msSQL.Bit, todo['checked'])
    const sql=`INSERT INTO todo_item (list_id, title, checked)
      OUTPUT inserted.id, inserted.list_id, inserted.title, inserted.checked
      VALUES(@list_id,@title,@checked);`
    // run query
    return req.query(sql)
      .then(result=>{
        // console.log("DeleteTodoList.result: ", result)
        const {recordset} = result
        if (recordset.length==1){
          return recordset[0]
        }else{
          throw Error("Failed to add todo item")
        }
      })
    // better to catch error in other function
  })
}

function UpdateTodoItem(todo){
  if (!todo['id']){
    throw Error("Missing item id property")
  }
  return getPool().then(pool=>{
    // create new sql request
    const req = new msSQL.Request(pool)
    // construct input params and sql query
    req.input('id',msSQL.BigInt, todo['id'])
    req.input('list_id',msSQL.BigInt, todo['list_id'])
    req.input('title',msSQL.NVarChar, todo['title'])
    req.input('checked',msSQL.Bit, todo['checked'])
    const sql=`UPDATE todo_item SET
      list_id=@list_id,
      title=@title,
      checked=@checked
      OUTPUT inserted.id,inserted.list_id,inserted.title,inserted.checked
      WHERE id=@id;`
    // run query
    return req.query(sql)
      .then(result=>{
        // console.log("DeleteTodoList.result: ", result)
        const {recordset} = result
        if (recordset.length==1){
          return recordset[0]
        }else{
          throw Error(`Failed to update todo item with id ${todo['id']}`)
        }
      })
    // better to catch error in other function
  })
}

function DeleteTodoItem(id=0){
  if (id===0){
    throw Error("Missing list id property")
  }
  return getPool().then(pool=>{
    // console.log("todolist:", todolist)
    const req = new msSQL.Request(pool)
    req.input('id',msSQL.BigInt, id)
    const sql=`DELETE FROM todo_item
      OUTPUT deleted.id, deleted.list_id, deleted.title, deleted.checked
      WHERE id=@id;`
    // logInfo(`DeleteTodoList SQL: ${sql}`)
    // run query
    return req.query(sql)
      .then(result=>{
        // console.log("DeleteTodoList.result: ", result)
        const {recordset} = result
        if (recordset.length==1){
          return recordset[0]
        }else{
          // return message
          return `No todo item with id=${id}`
        }
      })
    // better to catch error in other function
  })
}

module.exports={
  GetTodoItems,
  AddTodoItem,
  UpdateTodoItem,
  DeleteTodoItem
}