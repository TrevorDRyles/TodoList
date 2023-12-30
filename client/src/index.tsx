import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppRouter from "./routes/AppRouter";
const val = document.getElementById('root');

if (val != null) {
    const root = ReactDOM.createRoot(val);
    root.render(
        <AppRouter/>
    );
}

