import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "../pages/Index/Index";
import SignUp from "../pages/Signup/Signup";
import React from "react";
import UserLanding from "../pages/UserLanding/UserLanding";
const AppRouter = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path={"/signup"} element={<SignUp/>}/>
            <Route path={"/home"} element={<UserLanding/>}/>
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