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

  const shouldDisable = (buttonKey) => {
    return state.mode !== 'view' && state.mode !== buttonKey
  }

  const nextSequence = () => {
    return (state.todos.length + 1);
  }
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

  const addTodo = (name) => {
    const code = nextSequence();
    const todoToBeAdded = { code, name };
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
    const name = state.selected.name;
    const todoToBeUpdated = { code, name };
    setState(oldState => {
      oldState.todos.forEach((item) => {
        item.code === code && (item.name = name)
      })
      return ({
        ...oldState,
        todos: [...oldState.todos]
      })
    })
    return todoToBeUpdated;
  }

  const handleClick = todo => (e) => {
    if (state.mode === 'view') updateSelected(todo);
  }

  const add = () => {
    if (state.mode !== 'add') {
      clearSelection();
      updateMode('add');

      return;
    }
    const addedTodo = addTodo(state.selected.name);
    viewMode(addedTodo);
  }

  const edit = () => {
    if (!state.selected.name) return;
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
      <div className='todo-wrapper'>
        <form onSubmit={(e) => { e.preventDefault() }}>
          <button onClick={clearSelection} className='secondary button right'> Clear </button>
          {state.mode === 'add' &&
            <div>
              <input
                autoFocus
                className='todo-input'
                type='text'
                value={state.selected.name}
                onChange={e => {
                  updateSelected({ name: e.target.value });
                }} />
            </div>}
          {state.mode === 'edit' && <div>
            <span>Code : {state.selected.code}</span>
            <input
              autoFocus
              className='todo-input'
              type='text'
              value={state.selected.name}
              onChange={e => {
                updateSelected({
                  code: state.selected.code,
                  name: e.target.value
                });
              }}
            />
          </div>}
          <button
            onClick={add}
            className='primary button'
            disabled={shouldDisable('add')}
          > Add </button>
          <button
            onClick={edit}
            className='primary button'
            disabled={shouldDisable('edit')}
          >
            {state.mode === 'edit' ? 'Update' : 'Edit'}
          </button>
        </form>
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
                className={state.selected.code === todo.code ? 'selected' : undefined}
                key={todo.code}
              >
                <td className='todo-table__sno'>{index + 1}</td>
                <td className='todo-table__name'>{todo.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default App;
