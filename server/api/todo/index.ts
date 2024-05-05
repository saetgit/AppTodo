import { db } from "../../db";
import { v4 as uuid } from "uuid";
import {createError,sendError} from "h3"

export default defineEventHandler((e) => {
  const method=e.req.method;
  if(method ==="GET"){
    return db.todos;
  }

  if(method==="POST"){
    const body=await useBody(e);

    if(!body.item) {
        const TodoNotFoundError=createError({
            statusCode:404,
            statusMessage:"No item provided",
            data:{}
        });
        sendError(e,TodoNotFoundError)

    }
        const newTodo={
            id:uuid(),
            item:body.item,
            completed:false
        };
        db.todos.push(newTodo)
        return newTodo
  }
});
