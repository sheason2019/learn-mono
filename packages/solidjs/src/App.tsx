import type { Component } from 'solid-js';

import Todo from './pages/todo';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>
          Solid.js TODO Test
        </p>
        <Todo />
      </header>
    </div>
  );
};

export default App;
