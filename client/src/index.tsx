import React from 'react';
import ReactDOM from 'react-dom/client';
import IndexComponent from "./components/Index/IndexComponent";
import SignUpComponent from "./components/SignUp/SignUpComponent";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppRouter from "./routes/AppRouter";
const val = document.getElementById('root');

if (val != null) {
    const root = ReactDOM.createRoot(val);
    root.render(
        <AppRouter/>
    );
}

