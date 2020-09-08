module.exports={
  // Test data for post and put
  todoList:{
    title:"New todo list"
  },
  todoItem:(lid=1)=>({
    list_id:lid,
    title:"New item title from autocannon",
    checked: false
  }),

}