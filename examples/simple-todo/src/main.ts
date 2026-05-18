import { addTodo, toggleTodo, deleteTodo, clearCompleted, getTodos, getStats } from './todo';

// 範例操作
const todo1 = addTodo('學習 TypeScript');
const todo2 = addTodo('使用 CodeGraph');
const todo3 = addTodo('完成專案');

toggleTodo(todo1.id);
toggleTodo(todo3.id);

console.log('所有任務：', getTodos());
console.log('待完成：', getTodos({ status: 'active' }));
console.log('已完成：', getTodos({ status: 'completed' }));
console.log('統計：', getStats());

deleteTodo(todo2.id);
clearCompleted();