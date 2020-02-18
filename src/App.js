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
    name: 'some one'
  },
  {
    name: 'some two'
  },
  {
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
    setState(oldState => {
      return ({
        ...oldState,
        todos: [...oldState.todos, {
          name
        }]
      })
    })
  }

  const handleClick = todo => (e) => {
    updateSelected(todo);
  }

  const add = () => {
    if (state.mode !== 'add') {
      updateMode('add');
      return;
    }
    addTodo(state.inputTodoName);
    updateMode('view');
  }

  const clearSelection = () => {
    updateSelected({});
    updateMode('view');
  }

  return (
    <>
      <table className='todo-table'>
        <tr>
          <th className='todo-table__sno'>Sno.</th>
          <th className='todo-table__name'>Name</th>
        </tr>
        {state.todos.map((todo, index) => (
          <tr
            onClick={handleClick(todo)}
            className={state.selected.name === todo.name && 'selected'}
          >
            <td className='todo-table__sno'>{index + 1}</td>
            <td className='todo-table__name'>{todo.name}</td>
          </tr>
        ))}
      </table>
      <button onClick={clearSelection} className='secondary button right'> Clear </button>
      {state.mode === 'add' && <div><input className='todo-input' type='text' onChange={e => { updateInputTodo(e.target.value) }} /></div>}
      <button onClick={add} className='primary button'> Add </button>

    </>
  )
}
export default App;
