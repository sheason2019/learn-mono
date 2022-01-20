import { createStore } from "solid-js/store";

interface ListStore {
  todo: string[];
  finish: string[];
}

const [state, setState] = createStore<ListStore>({
  todo: [],
  finish: [],
});
const addTodo = (text: string) => {
  setState("todo", (todo) => [...todo, text]);
};
const finishTodo = (target: number) => {
  const item = state.todo[target];
  setState("todo", (todo) => todo.filter((_item, index) => target !== index));
  setState("finish", (finish) => [...finish, item]);
};
const undo = (target: number) => {
  const item = state.finish[target];
  setState("finish", (todo) =>
    todo.filter((_item, index) => target !== index)
  );
  setState("todo", (finish) => [...finish, item]);
};
const clear = () => {
  setState("finish", []);
}

export {
  addTodo,
  finishTodo,
  undo,
  clear,
  state,
}