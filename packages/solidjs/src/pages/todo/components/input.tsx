import { Component, createSignal } from "solid-js";
import styles from "./input.module.css";

interface InputProps {
  addTodo: (text: string) => void;
}

const Input: Component<InputProps> = ({ addTodo }) => {
  const [getText, setText] = createSignal<string>("");

  const handleSubmitTodo = () => {
    getText() && addTodo(getText());
    setText("");
  };

  return (
    <div class={styles.root}>
      <p class={styles.p}>新建ToDo</p>
      <input
        class={styles.input}
        value={getText()}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <button class={styles.button} onClick={handleSubmitTodo}>
        Submit
      </button>
    </div>
  );
};

interface ClearFinishProps {
  clear: () => void;
}

const ClearFinish: Component<ClearFinishProps> = ({ clear }) => {
  return (
    <div class={styles.root} style={{ "justify-content": 'flex-end'}}>
      <button class={styles.clear} style={{ height: "26px" }} onClick={clear}>
        Clear Finished
      </button>
    </div>
  );
};

export { Input, ClearFinish };
