import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import '../App.css';

export const TodoList: React.FC = () => {
    const { todos, isLoading, error, addTodo, toggleStatus, deleteTodo } = useTodos();
    const [newTitle, setNewTitle] = useState('');

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        
        await addTodo({ title: newTitle, description: null, is_completed: false });
        setNewTitle('');
    };

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div className="error-text">{error}</div>;

    return (
        <div className="todo-container">
            <h2 className="todo-header">Task Manager</h2>
            
            <form onSubmit={handleAdd} className="todo-form">
                <input 
                    type="text" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter new task..."
                    className="todo-input"
                />
                <button type="submit" className="todo-button">Add Task</button>
            </form>

            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        onToggle={toggleStatus} 
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
};