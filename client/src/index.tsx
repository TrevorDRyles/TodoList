import React from 'react';
import ReactDOM from 'react-dom/client';
import ListTodo from "./ListTodo";
import TodoAdd from "./TodoAdd";

const val = document.getElementById('root');
if (val != null) {
    const root = ReactDOM.createRoot(val);
    root.render(
        <React.StrictMode>
            <h1>Trevor's "TODO_List"</h1>
            <TodoAdd/>
            <ListTodo/>
        </React.StrictMode>
    );
}
