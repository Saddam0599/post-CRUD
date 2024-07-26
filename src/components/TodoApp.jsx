import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.VITE_BASE_URL}/todos`);
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <ul className="list-disc list-inside">
        {todos.map(todo => (
          <li key={todo.id} className={`p-2 ${todo.checked ? 'line-through' : ''}`}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
