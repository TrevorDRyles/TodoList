import React from 'react';
import ReactDOM from 'react-dom/client';
import IndexComponent from "./components/Index/IndexComponent";

import {BrowserRouter, Route, Routes} from 'react-router-dom';

const val = document.getElementById('root');

if (val != null) {
    const root = ReactDOM.createRoot(val);
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexComponent/>}/>
                {/*<Route path="/about" element={<About />}>*/}
                {/*    <Route*/}
                {/*        path="history"*/}
                {/*        element={<History />}*/}
                {/*    />*/}
                {/*</Route>*/}
                {/*<Route*/}
                {/*    path="/contact"*/}
                {/*    element={<Contact />}>*/}
            </Routes>
        </BrowserRouter>
    );
}

