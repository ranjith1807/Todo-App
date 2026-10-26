import React from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number, currentStatus: boolean) => void;
    onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    return (
        <li className="todo-item">
            <div className="todo-item-content">
                <input 
                    type="checkbox" 
                    checked={todo.is_completed}
                    onChange={() => onToggle(todo.id, todo.is_completed)}
                />
                <span className={`todo-text ${todo.is_completed ? 'completed' : ''}`}>
                    {todo.title}
                </span>
            </div>
            <button onClick={() => onDelete(todo.id)} className="delete-button">
                Delete
            </button>
        </li>
    );
};