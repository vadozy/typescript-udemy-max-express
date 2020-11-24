import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.status(201).json({ message: 'Created the todo', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const newText = (req.body as { text: string }).text;
  const todo = TODOS.find(td => td.id === id);
  if (todo) {
    todo.text = newText;
  } else {
    throw new Error('Cannot find todo');
  }
  res.json({ message: 'Updated the todo', updatedTodo: todo });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const todoIndex = TODOS.findIndex(td => td.id === id);
  if (todoIndex < 0) {
    throw new Error('Cannot find todo');
  }
  TODOS.splice(todoIndex, 1);
  res.status(201).json({ message: 'Deleted the todo', deletedId: id });
};
