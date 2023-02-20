import PropTypes from 'prop-types';
import { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNowStrict } from "date-fns";

export default class TodoListItem extends Component {
  constructor(props) {
    super(props);
    const { label } = this.props;
    this.state = {
        labelState: label,
        edit: false,
    };
}

  onLabelChange = (e) => {
    this.setState({
        labelState: e.target.value,
    });
};

onSubmit = (e) => {
    const { labelState } = this.state;
    const { changeTitle } = this.props;
    e.preventDefault();
    changeTitle(e.target.id, labelState);
    this.setState({
        edit: false,
    });
};

handlerClick = () => {
  const newEdit = true;
  this.setState({
      edit: newEdit,
  });
};

  render() {
    // eslint-disable-next-line object-curly-newline
    const { label, id, date,
      onDeleted,
      onToggleDone,
       status,
      // eslint-disable-next-line object-curly-newline
       } = this.props;

        const { labelState } = this.state;
        const { edit } = this.state;

        const field = edit ? (
            <form className='' onSubmit={this.onSubmit} id={id}>
                <input
                    type='text'
                    className='edit'
                    placeholder='Editing task'
                    onChange={this.onLabelChange}
                    value={labelState}
                    required
                />
            </form>
        ) : (
            <div className='view'>
                <input
                    id={id.toString()}
                    className='toggle'
                    type='checkbox'
                    onChange={onToggleDone}
                    checked={status}

                />
                <label htmlFor={id} >
                    <span className={status ? 'completed description' : 'description' }>{label}</span>
                    <span className='created'>created {formatDistanceToNowStrict(date)} ago</span>
                </label>
                <button
                    type='button'
                    className='icon icon-edit float-right'
                    onClick={this.handlerClick}
                />
                <button
                    type='button'
                    className='icon icon-destroy float-right'
                    onClick={() => onDeleted(id)}
                />
            </div>
        );

        return <li className={edit ? 'editing' : ''}>{field}</li>;
    }
}

TodoListItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};