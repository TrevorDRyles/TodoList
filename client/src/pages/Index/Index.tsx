import React from "react";
import styles from "./index.module.css";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import ListTodo from "../../components/ListTodo/ListTodo";

function Index() {
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

export default Index;

