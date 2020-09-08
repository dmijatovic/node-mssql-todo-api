const msSQL = require('mssql');
const { getPool } = require("./index")

// const client = getClient()
function GetAllTodoLists(){
  return getPool().then(pool=>{
    const sql=`SELECT TOP(50) id,title FROM todo_list;`
    return pool.query(sql)
    .then(result=>{
      // console.log("execQuery.result: ", result)
      const {recordset} = result
      return recordset
    })
    // better to catch error later in other function
  })
}

function AddTodoList(todolist){
  if (!todolist['title']){
    throw Error("Missing property title")
  }
  return getPool().then(pool=>{
    // console.log("todolist:", todolist)
    const req = new msSQL.Request(pool)
    // define input variables
    req.input('title',msSQL.NVarChar, todolist['title'])
    // constuct T-SQL statement
    const sql=`INSERT INTO todo_list (title) OUTPUT inserted.id, inserted.title VALUES(@title);`
    // logInfo(`AddTodoList SQL: ${sql}`)
    // run query
    return req.query(sql)
      .then(result=>{
        // console.log("AddTodoList.result: ", result)
        const {recordset} = result
        if (recordset.length==1){
          return recordset[0]
        }else{
          throw Error("Failed to add todo list")
        }
      })
    // better to catch error in other function
  })
}

function UpdateTodoList(todolist){
  if (!todolist['title']){
    throw Error("Missing property title")
  }
  return getPool().then(pool=>{
    // console.log("todolist:", todolist)
    const req = new msSQL.Request(pool)
    // define input variables
    req.input('title',msSQL.NVarChar, todolist['title'])
    req.input('id',msSQL.BigInt, todolist['id'])
    // constuct SQL statement
    const sql=`UPDATE todo_list SET title=@title OUTPUT inserted.id, inserted.title WHERE id=@id;`
    // logInfo(`UpdateTodoList SQL: ${sql}`)
    // run query
    return req.query(sql)
      .then(result=>{
        // console.log("UpdateTodoList.result: ", result)
        const {recordset} = result
        if (recordset.length==1){
          return recordset[0]
        }else{
          throw Error("Failed to add todo list")
        }
      })
    // better to catch error in other function
  })
}

function DeleteTodoList(id=0){
  if (id===0){
    throw Error("Missing id property")
  }
  return getPool().then(pool=>{
    // console.log("todolist:", todolist)
    const req = new msSQL.Request(pool)
    req.input('id',msSQL.BigInt, id)
    const sql=`DELETE FROM todo_list OUTPUT deleted.id, deleted.title WHERE id=@id;`
    // logInfo(`DeleteTodoList SQL: ${sql}`)
    // run query
    return req.query(sql)
      .then(result=>{
        // console.log("DeleteTodoList.result: ", result)
        const {recordset} = result
        if (recordset.length==1){
          return recordset[0]
        }else{
          // throw Error("Failed to DELETE list. Check id")
          return `No todo list with id=${id}`
        }
      })
    // better to catch error in other function
  })
}

module.exports={
  GetAllTodoLists,
  AddTodoList,
  UpdateTodoList,
  DeleteTodoList
}