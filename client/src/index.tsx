import React from 'react';
import ReactDOM from 'react-dom/client';
import ListTodo from "./ListTodo";
import TodoSearch from "./TodoAdd";

const val = document.getElementById('root');
if (val != null) {
    const root = ReactDOM.createRoot(val);
    root.render(
        <React.StrictMode>
            <h1>Trevor's "TODO_List"</h1>
            <TodoSearch/>
            <ListTodo/>
        </React.StrictMode>
    );
}
