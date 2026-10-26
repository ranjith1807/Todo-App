export interface Todo {
    id: number;
    title: string;
    description: string | null;
    is_completed: boolean;
}

export type TodoCreate = Omit<Todo, 'id'>;