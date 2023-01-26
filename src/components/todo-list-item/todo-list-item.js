import PropTypes from 'prop-types';
import { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNowStrict } from "date-fns";

export default class TodoListItem extends Component {
  render() {
    // eslint-disable-next-line object-curly-newline
    const { label, id, status, date,
      onDeleted,
      onToggleDone,
      onToggleEdit,
      editInputHandler,
      // eslint-disable-next-line object-curly-newline
      onEditSubmit } = this.props;

    function onSubmitHandler(e) {
      e.preventDefault();
      onEditSubmit(id)
    }

    const editInput = status === 'editing' ? (
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <input type="text" className="edit" value={label} onChange={(e) => editInputHandler(id, e.target.value)} />
      </form>
    ) : ('');

    return (
      <li className={status}
      key={id}>
      <div className="view">
      <input className='toggle'
      type='checkbox'
      checked={status === 'completed'}
      onChange={() => onToggleDone(id)}
      />
      <label onClick={() => onToggleDone(id)}>
      <span
        className="description">
        {label}
      </span>
      <span
      className='created'>created {formatDistanceToNowStrict(date)} ago</span>
      </label>
      <button type="button"
              className="icon icon-edit"
              onClick={() => onToggleEdit(id)}
              >
      </button>
      <button type='button'
              className='icon icon-destroy'
              onClick={() => onDeleted(id)}>
      </button>
      </div>
      { editInput }
      </li>
    )
  }
}

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};