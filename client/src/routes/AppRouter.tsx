import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexComponent from "../components/Index/IndexComponent";
import SignUp from "../pages/Signup";
import React from "react";
const AppRouter = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<IndexComponent/>}/>
            <Route path={"/signup"} element={<SignUp/>}/>
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

export default AppRouter;