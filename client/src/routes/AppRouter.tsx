import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "../pages/Index/Index";
import SignUp from "../pages/Signup/Signup";
import React from "react";
import UserLanding from "../pages/UserLanding/UserLanding";
import SignIn from "../pages/Signin/Signin";
import {PrivateRoute} from "../auth/PrivateRoute";

const AppRouter = () => {
    return(
    <BrowserRouter>
        <Routes>
            {/*private route*/}
            <Route path="/"
                   element={
                       <PrivateRoute>
                           <Index/>
                       </PrivateRoute>
                   }
            />
            {/*<PrivateRoute element={<Index/>} path="/"></PrivateRoute>*/}
            <Route path={"/signup"} element={<SignUp/>}/>
            <Route path={"/home"} element={<UserLanding/>}/>
            <Route path={"/signin"} element={<SignIn/>}/>
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