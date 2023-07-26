import React, { useState } from 'react';
import api from '../api';
import '../styles/TodoForm.css';


const TodoForm = ({ lists , addTodo }) => {
  const [title, setTitle] = useState('');
  const [selectedList, setSelectedList] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !selectedList) return;

    api.post('todos', { title, status: 'New', listId: parseInt(selectedList) })
      .then((response) => {
        console.log(response.data);
        addTodo(response.data);
        setTitle('');
        setSelectedList('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)}  placeholder="Add a todo" />
      <select  value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
        <option value="">Select a list</option>
        {lists.map((list) => (
          <option key={list.listId} value={list.listId}>{list.name}</option>
        ))}
      </select>
      <button  type="submit" >Add Todo</button>
    </form>
  );
};

export default TodoForm;
