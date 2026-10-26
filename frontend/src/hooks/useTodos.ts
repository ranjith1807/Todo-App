import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';
import type { Todo, TodoCreate } from '../types';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTodos = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data } = await apiClient.get<Todo[]>('/todos/');
            setTodos(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch todos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const addTodo = async (todoData: TodoCreate) => {
        const { data } = await apiClient.post<Todo>('/todos/', todoData);
        setTodos(prev => [data, ...prev]);
    };

    const toggleStatus = async (id: number, currentStatus: boolean) => {
        // Optimistic UI update
        setTodos(prev => prev.map(t => t.id === id ? { ...t, is_completed: !currentStatus } : t));
        
        try {
            await apiClient.patch(`/todos/${id}/status?status=${!currentStatus}`);
        } catch (err) {
            // Revert on failure
            setTodos(prev => prev.map(t => t.id === id ? { ...t, is_completed: currentStatus } : t));
            setError('Failed to update status');
        }
    };
    // Add this function below toggleStatus
    const deleteTodo = async (id: number) => {
        // Optimistic UI update
        setTodos(prev => prev.filter(t => t.id !== id));
        
        try {
            await apiClient.delete(`/todos/${id}`);
        } catch (err) {
            // Revert on failure by refetching
            fetchTodos();
            setError('Failed to delete task');
        }
    };

    // Update the return statement at the bottom to include deleteTodo
    return { todos, isLoading, error, addTodo, toggleStatus, deleteTodo };

};