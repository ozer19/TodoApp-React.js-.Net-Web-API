import React, { useEffect, useState } from 'react';
import api from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterForm from './components/FilterForm';
import './styles/App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedList, setSelectedList] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [search, setSearch] = useState([]);
  
  useEffect(() => {
    api.get('lists')
      .then((response) => {
        setLists(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      api.get('todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchTodos = () => {
      let url = 'todos';
      if (selectedList !== 'All') {
        url = `lists/${selectedList}/todos`;
      }

      api.get(url)
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchTodos();
  }, [selectedList]);
  
  const filterTodos = () => {
    let filteredTodos = todos;

    if (selectedList !== 'All') {
      filteredTodos = filteredTodos.filter((todo) => todo.listId === parseInt(selectedList));
    }

    if (selectedStatus !== 'All') {
      filteredTodos = filteredTodos.filter((todo) => todo.status === selectedStatus);
    }

    return filteredTodos;
  };

  const filteredTodos = filterTodos().filter((todo) =>
    todo.title.toLowerCase().includes(search)
  );

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id, updatedTodo) => {
      api.put(`todos/${id}`, updatedTodo)
          .then(response => {
              const updatedTodos = todos.map(todo => {
                  if (todo.id === id) {
                      return response.data;
                  }
                  return todo;
              });
              setTodos(updatedTodos);
          })
          .catch(error => {
              console.error('Error updating todo:', error);
          });
  };
  
  const handleDeleteTodo = () => {
    const fetchTodos = () => {
      let url = 'todos';
      if (selectedList !== 'All') {
        url = `lists/${selectedList}/todos`;
      }

      api.get(url)
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchTodos();
  };
  
  

  return (
    <div className='container'>
      <h1 >Todo App</h1>
      <TodoForm lists={lists} addTodo={addTodo}/>
      <FilterForm
        lists={lists}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        search={search}
        setSearch={setSearch}
      />
      <TodoList todos={filteredTodos} onDeleteTodo={handleDeleteTodo} updateTodo={updateTodo} />
    </div>
  );
}

export default App;
