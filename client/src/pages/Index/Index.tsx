import React from "react";
import styles from "./index.module.css";
import TodoAdd from "../../components/TodoAdd/TodoAdd";
import ListTodo from "../../components/ListTodo/ListTodo";
import {useUser} from "../../auth/useUser";

function Index() {
    const {username} = useUser();
    return (
        <React.StrictMode>
            <div id={styles.header}>
                <h1>{username}'s To-Do List</h1>
            </div>
            <div className={`${styles.homePage} ${styles.container}`}>
                <TodoAdd/>
                <ListTodo/>
            </div>
        </React.StrictMode>
    );
}

export default Index;

