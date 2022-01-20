import { Component, createMemo, JSXElement, Show } from "solid-js";

import styles from "./container.module.css";

interface Props {
  title: JSXElement | string;
  centerTitle?: boolean;
  footer?: JSXElement;
  children?: JSXElement;
}

const Container: Component<Props> = (props) => {
  const titleClass = createMemo(() =>
    [styles.title, props.centerTitle ? styles.centerText : ""].join(" ")
  );
  return (
    <div class={styles.container}>
      <p class={titleClass()}>{props.title}</p>
      <div class={styles.content}>{props.children}</div>
      <Show when={props.footer}>
        <div class={styles.footer}>{props.footer}</div>
      </Show>
    </div>
  );
};

export default Container;
