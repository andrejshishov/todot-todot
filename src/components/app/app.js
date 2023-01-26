/* eslint-disable no-unused-vars */
import { Component } from 'react';

import NewTodo from '../new-todo';
import TodoList from '../todo-list/todo-list';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    items: [
      this.createTodoItem('First task', ''),
      this.createTodoItem('Second task', ''),
      this.createTodoItem('Third task', ''),
  ],
  filter: 'all',
  };

  createTodoItem(label, status = '') {
    return {
      label,
      status,
      date: new Date(),
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
    }
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ items }) => {
      const newArr = [
        ...items,
        newItem,
      ];
      return {
        items: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((el) => el.id === id);
      const newData = [
        ...items.slice(0, idx),
        ...items.slice(idx + 1),
      ];
      return {
        items: newData,
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (id === item.id) {
          const status = item.status === '' ? 'completed' : ''
          return { ...item, status }
        }
        return item;
      }),
    }));
  };

  onToggleEdit = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (item.status === 'editing') {
          return { ...item, status: '' }
        }
        if (item.id === id && item.status !== 'completed') {
          return { ...item, status: 'editing' }
        }
        return item
      }),
    }));
  };

  editInputHandler = (id, value) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (item.id === id) {
          return { ...item, label: value }
        }
        return item
      }),
    }));
  };

  onEditSubmit = (id) => {
    this.setState(({ items }) => ({
      items: items.map((item) => {
        if (item.id === id) {
          return { ...item, status: '' }
        }
        return item
      }),
    }));
  };

  onFilterChange = (value) => {
    this.setState({
      filter: value,
    });
  };

  onClearCompleted = () => {
    this.setState(({ items }) => {
      const newArr = [...items];
      const compArr = newArr.filter((el) => el.status !== 'completed');
      return {
        items: compArr,
      }
    });
  };

  render() {
   const { items, filter } = this.state;

   return (
    <section className='todoapp'>
      <NewTodo onItemAdded={this.addItem}/>
    <section className='main'>
      <TodoList
      items={ items }
      onDeleted={ this.deleteItem }
      onToggleDone={ this.onToggleDone }
      onToggleEdit={ this.onToggleEdit }
      editInputHandler={ this.editInputHandler}
      onEditSubmit={ this.onEditSubmit }
      filter={filter}/>
      <Footer
      left={items.filter((item) => item.status !== 'completed').length}
      filter={filter}
      onFilterChange={ this.onFilterChange }
      clearCompleted={ this.onClearCompleted }/>
    </section>
    </section>
  )
  }
}
