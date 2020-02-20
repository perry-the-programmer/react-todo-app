import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const appName = "Todo builder";
  return (
    <div className="App">
      <header className="App-header">
        <h1>{appName}</h1>
      </header>
      <TodoList />
    </div>
  );
}
function TodoList() {
  let dummyData = [{
    code: 1,
    name: 'some one'
  },
  {
    code: 2,
    name: 'some two'
  },
  {
    code: 3,
    name: 'some three'
  }
  ];
  const [state, setState] = useState({
    todos: dummyData,
    selected: {},
    mode: 'view',
    inputTodoName: ''
  })

  const updateSelected = (selected) => {
    setState(oldState => {
      return ({
        ...oldState,
        selected,
      })
    })
  }
  const updateMode = (mode) => {
    setState(oldState => {
      return ({
        ...oldState,
        mode
      })
    })
  }

  const updateInputTodo = (inputTodoName)=>{
    setState(oldState => {
      return ({
        ...oldState,
        inputTodoName
      })
    })
    
  }

  const addTodo = (name) => {
    const code = nextSequence();
    const todoToBeAdded = {code,name};
    setState(oldState => {
      return ({
        ...oldState,
        todos: [...oldState.todos, {
          ...todoToBeAdded
        }]
      })
    })
    return todoToBeAdded;
  }


  const updateTodo = () => {
    const code = state.selected.code;
    const name = state.inputTodoName;
    const todoToBeUpdated = {code,name};
    setState(oldState => {
      return ({
        ...oldState,
        todos: [...oldState.todos, {
          ...todoToBeUpdated
        }]
      })
    })
    return todoToBeUpdated;
  }

  const handleClick = todo => (e) => {
    updateSelected(todo);
  }

  const add = () => {
    if (state.mode !== 'add') {
      updateMode('add');
      return;
    }
    const addedTodo = addTodo(state.inputTodoName);
    viewMode(addedTodo);
  }


  const edit = () => {
    if(!state.selected.name) return;
    if (state.mode !== 'edit') {
      updateMode('edit');
      return;
    }
    const updatedTodo = updateTodo();
    viewMode(updatedTodo);
  }


  const clearSelection = () => {
    viewMode();
  }

  const viewMode = (selected = {}) => {
    updateSelected(selected);
    updateMode('view');
  }
  return (
    <>
      <table className='todo-table'>
        <thead><tr>
          <th className='todo-table__sno'>Sno.</th>
          <th className='todo-table__name'>Name</th>
        </tr>
        </thead>
        <tbody>
        {state.todos.map((todo, index) => (
          <tr
            onClick={handleClick(todo)}
            className={state.selected.name === todo.name ? 'selected':undefined}
            key={todo.code}
          >
            <td className='todo-table__sno'>{index + 1}</td>
            <td className='todo-table__name'>{todo.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <button onClick={clearSelection} className='secondary button right'> Clear </button>
      {state.mode === 'add' && <div><input className='todo-input' type='text' onChange={e => { updateInputTodo(e.target.value) }} /></div>}
      {state.mode === 'edit' && <div>
        <span>Code : {state.selected.code}</span>
        <input className='todo-input' type='text' value={state.selected.name} onChange={e => { updateInputTodo(e.target.value) }} />
        </div>}
      <button onClick={add} className='primary button'> Add </button>
      <button onClick={edit} className='primary button'> {state.mode === 'edit' ? 'Update':'Edit'} </button>

    </>
  )

  function nextSequence() {
    return (state.todos.length + 1);
  }
}
export default App;
