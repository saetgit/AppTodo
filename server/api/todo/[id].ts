import { db } from "../../db";
export default defineEventHandler((e) => {
  const method = e.req.method;
  const context = e.context;
    const { id } = context.params;

  const findTodoById=(todoId)=>{
    if (method === "PUT") {
        let index;
        const todo = db.todos.find((t, i) => {
          if (t.id === todoId) {
            index = i;
            return true;
          }
          return false;
        });
    
        if (!todo) throw new Error();
    return todo,index
  }
  if (method === "PUT") {
    
const {todo,index}=findTodoById(id)
    const updateTodo = {
      ...todo,
      completed:!todo.completed,
    };

    db.todos[index] = updateTodo;
    return updateTodo;
  }

  if(method==="DELETE"){
    const{todo,index} =findTodoById(id);
    db.todos.splice(index,1);
 return{
    message:"item deleted"
    }
  }
});
