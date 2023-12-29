import React from 'react';
import ReactDOM from 'react-dom/client';
import ListTodo from "./components/ListTodo/ListTodo";
import TodoAdd from "./components/TodoAdd/TodoAdd";
import styles from './index.module.css';

const val = document.getElementById('root'
    )
;
if (val != null) {
    const root = ReactDOM.createRoot(val);
    root.render(
        <React.StrictMode>
            <div id={styles.header}>
                <h1>Trevor's To-Do List</h1>
            </div>
            <div className={`${styles.homePage} ${styles.container}`}>
                <TodoAdd/>
                <ListTodo/>
            </div>
        </React.StrictMode>
    );
}
