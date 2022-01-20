import { Component, JSXElement, Match, Switch } from "solid-js";
import styles from "./todoItem.module.css";

interface Props {
  children?: JSXElement;
  finishTodo?: (target: number) => void;
  undo?: (target: number) => void;
  index: number;
}

const TodoItem: Component<Props> = ({ index, children, finishTodo, undo }) => {
  const action = () => {
    if (finishTodo) {
      finishTodo(index - 1);
    } else if (undo) {
      undo(index - 1);
    }
  };
  return (
    <div class={styles.root}>
      <div class={styles.index}>{index}</div>
      <div class={styles.content}>{children}</div>
      <Switch>
        <Match when={finishTodo}>
          <div class={styles.done} onClick={action}>
            Done
          </div>
        </Match>
        <Match when={undo}>
          <div class={styles.undo} onClick={action}>
            Undo
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default TodoItem;
