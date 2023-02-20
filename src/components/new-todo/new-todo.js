import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTodo extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    if (e.target.value.length === 1) {
        const label = e.target.value.replace(/^\s*$/, ' ');
        this.setState({
            label,
        });
    } else {
        this.setState({
            label: e.target.value,
        });
    }
};

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({
      label: '',
    });
    };

  render() {
    return (
    <header className="header">
            <h1>todos</h1>
      <form onSubmit={this.onSubmit}>
      <input type="text"
           className="new-todo"
           placeholder="What needs to be done?"
           autoFocus
           onChange={this.onLabelChange}
           value={this.state.label}
           required/>
      </form>
    </header>
    );
  }
}

NewTodo.defaultProps = {
  onItemAdded: () => {},
};

NewTodo.propTypes = {
  onItemAdded: PropTypes.func,
};