import React from 'react';
import api from '../api';
import '../styles/TodoList.css';

const TodoList = ({ todos, onDeleteTodo ,updateTodo}) => {
  const handleStatusChange = (id, e) => {
      const status = e.target.value;
      const updatedTodo = todos.find((todo) => todo.todoId === id);
      updatedTodo.status = status;
      updateTodo(id, updatedTodo);
  };

  const handleDelete = (id) => {
    api.delete(`todos/${id}`)
      .then(() => {
        onDeleteTodo();
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  return (
    <table className='todo-table'>
      <thead>
        <tr >
          <th>Title</th>
          <th>Status</th>
          <th>List</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        {todos.map((todo) => (
          <tr key={todo.todoId}>
            <td >{todo.title}</td>
            <td>
              <select className={`todo-status-${todo.status.toLowerCase().replace(' ', '-')}`} value={todo.status} onChange={(e) => handleStatusChange(todo.todoId, e)}>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td>{todo.listId}</td>
            <td>
              <button  onClick={() => handleDelete(todo.todoId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
