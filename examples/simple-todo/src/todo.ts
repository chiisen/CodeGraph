import { Todo, TodoAction, TodoFilter } from './types';
import { loadTodos, saveTodos, clearStorage } from './storage';

let todos: Todo[] = loadTodos();

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function addTodo(title: string): Todo {
  const todo: Todo = {
    id: generateId(),
    title,
    completed: false,
    createdAt: new Date()
  };
  todos.push(todo);
  saveTodos(todos);
  return todo;
}

export function toggleTodo(id: string): Todo | undefined {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
  return todo;
}

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodos(todos);
    return true;
  }
  return false;
}

export function clearCompleted(): number {
  const before = todos.length;
  todos = todos.filter(t => !t.completed);
  saveTodos(todos);
  return before - todos.length;
}

export function getTodos(filter?: TodoFilter): Todo[] {
  let result = [...todos];

  if (filter?.status === 'active') {
    result = result.filter(t => !t.completed);
  } else if (filter?.status === 'completed') {
    result = result.filter(t => t.completed);
  }

  if (filter?.search) {
    const search = filter.search.toLowerCase();
    result = result.filter(t => t.title.toLowerCase().includes(search));
  }

  return result;
}

export function getTodoById(id: string): Todo | undefined {
  return todos.find(t => t.id === id);
}

export function getStats() {
  const total = todos.length;
  const active = todos.filter(t => !t.completed).length;
  const completed = total - active;

  return { total, active, completed };
}
