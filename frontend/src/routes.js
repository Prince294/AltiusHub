import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";

// log in imports  
const LoginLayout = React.lazy(() =>
    import("./shared/Login_Layout")
);

const Login = React.lazy(() =>
    import("./components/Login/Login")
);

// Home imports 
const HomeLayout = React.lazy(() =>
    import("./shared/Home_Layout")
);
const Home = React.lazy(() =>
    import("./components/Home/Home")
);

export default function Router() {
    const loggedIn = useSelector((state) => state?.login?.isLoggedIn);

    const loading = (
        <div className="loading">
            Loading...
        </div>
    );

    return (
        <Suspense fallback={loading}>
            <Routes>
                {!loggedIn ?
                    <Route path="/" element={<LoginLayout />} >
                        <Route
                            path={"login"}
                            element={<Login />}
                        />

                        <Route path="*" element={<Navigate to="/login" />} />
                        <Route path="/" element={<Navigate to="/login" />} />

                    </Route> :
                    <Route path="/" element={<HomeLayout />} >
                        <Route
                            path="home"
                            element={<Home />}
                        />
                        <Route path="*" element={<Navigate to="/home" />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Route>
                }
            </Routes>
        </Suspense>
    )
}