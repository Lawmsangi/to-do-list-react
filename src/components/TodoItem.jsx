import styles from '@/css/TodoItem.module.css';
import { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import PropTypes from 'prop-types';

const TodoItem = ({ itemProp, setTodos,delTodo,setUpdate }) => {
    const [editing, setEditing] = useState(false);

    const handleEditing = () => {
      setEditing(true);
    };

    let viewMode = {};
    let editMode = {};
    if (editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }

    const completedStyle = {
      fontStyle: 'italic',
      color: '#595959',
      opacity: 0.4,
      textDecoration: 'line-through',
    };

    const handleChange = (id) => {
        setTodos((prevState) =>
            prevState.map((todo) => {
            if (todo.id === id) {
                return {
                ...todo,
                completed: !todo.completed,
                };
            }
            return todo;
            })
        );
    };
    
    const handleUpdatedDone = (event) => {
      if (event.key === 'Enter') {
        setEditing(false);
      }
    };

  return (
    <li className={styles.item} style={itemProp.completed ? completedStyle : null}>
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />
        <span style={viewMode} >{itemProp.title}</span>
        <input
          type="text"
          value={itemProp.title}
          style={editMode}
          onChange={(e) => setUpdate(e.target.value, itemProp.id)}
          onKeyDown={handleUpdatedDone}
        />
          <button onClick={handleEditing}>
            <AiFillEdit style={{ color: "#5e5e5e", fontSize: "16px" }} />
          </button>
        
        <button onClick={() => delTodo(itemProp.id)}>
          <FaTrash style={{ color: "#5e5e5e", fontSize: "16px" }} />
        </button>
      
      </div>
    </li>
  );
};
TodoItem.propTypes = {
  itemProp: PropTypes.objectOf(PropTypes.number, PropTypes.string, PropTypes.bool).isRequired,
  setTodos: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};
export default TodoItem;

