import React, { useEffect, useState } from 'react';
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import { v4 as uuidv4 } from "uuid";


const TodosLogic = () => {
     const [todos, setTodos] = useState(getInitialTodos());

    function getInitialTodos() {
      // getting stored items
      const temp = localStorage.getItem('todos');
      const savedTodos = JSON.parse(temp);
      return savedTodos || [];
    }
       useEffect(() => {
      // storing todos items
      const temp = JSON.stringify(todos);
      console.log(temp);
      localStorage.setItem('todos', temp);
    }, [todos]);
  

   
    const setUpdate = (updatedTitle, id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            todo.title = updatedTitle;
          }
          return todo;
        })
      );
    };

    
    const delTodo = (id) => {
        setTodos([
            ...todos.filter((todo) => {
            return todo.id !== id;
            }),
        ]);
    };

    const addTodoItem = (title) => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

  
 
  return (
    <div>
        <InputTodo addTodoItem={addTodoItem} />
        <TodosList 
          todosProps={todos} 
          setTodos={setTodos} 
          delTodo={delTodo}
          setUpdate={setUpdate}
        />
    </div>
  );
};
export default TodosLogic;
