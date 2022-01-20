import { Component, For } from "solid-js";
import Container from "./components/container";
import TodoItem from "./components/todoItem";
import { Input, ClearFinish } from "./components/input";
import { addTodo, undo, clear, finishTodo, state } from "./store";
import styles from "./index.module.css";

const Todo: Component = () => {
  return (
    <div class={styles.root}>
      <Container title="ToDo" centerTitle footer={<Input addTodo={addTodo} />}>
        {state.todo.map((item, index) => (
          <TodoItem index={index + 1} finishTodo={finishTodo}>
            {item}
          </TodoItem>
        ))}
      </Container>
      <Container
        title="Finish"
        centerTitle
        footer={<ClearFinish clear={clear} />}
      >
        {state.finish.map((item, index) => (
          <TodoItem index={index + 1} undo={undo}>
            {item}
          </TodoItem>
        ))}
      </Container>
    </div>
  );
};

export default Todo;
