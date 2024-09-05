import { create } from "zustand";

import {TodoListType} from "../App";


export type TodoStoreState = {
  todos: TodoListType[];
};

export type TodoStoreActions = {
  addTodo: (todo: TodoListType) => void;
  toggleTodo: (index: number) => void;
  updateTodo: (name: string, priority:number, index:number) => void;
  deleteTodo: (index:number) => void;
};

export const useTodoStore = create<TodoStoreState & TodoStoreActions>()(
  (set) => ({
    // initialize state
    todos: [],

    // setters
    addTodo: (newTodo: TodoListType) => set((state) => {
      const ns = JSON.parse(JSON.stringify(state.todos));
      ns.push(newTodo);
      return { todos: ns}
    }),
    toggleTodo: (index: number) => set((state) => {
      const ns = JSON.parse(JSON.stringify(state.todos));
      ns[index].status = ns[index].status === 'done' ? 'not_done' : 'done';
      return { todos: ns };
    }),
    updateTodo: (name: string, priority: number, index: number) => set((state) => {
      const ns = JSON.parse(JSON.stringify(state.todos));
      ns[index]['name'] = name;
      ns[index]['priority'] = priority;
      return({ todos: ns });
    }),
    deleteTodo: (index: number) => set((state) => {
      const ns = JSON.parse(JSON.stringify(state.todos));
      const res = ns.filter((_: TodoListType, i:number) => {
        if (i !== index) {
          return true;
        }

        return false
      });

      return({todos: res});
    })
  })
)