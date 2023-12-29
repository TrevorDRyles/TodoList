import React from "react";
import styles from "./index.module.css";
import TodoAdd from "../TodoAdd/TodoAdd";
import ListTodo from "../ListTodo/ListTodo";

function IndexComponent() {
    return (
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

export default IndexComponent;

