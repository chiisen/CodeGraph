import { Todo } from './types';

const STORAGE_KEY = 'simple-todo-items';

export function loadTodos(): Todo[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    const parsed = JSON.parse(data);
    return parsed.map((item: Todo) => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }));
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}
