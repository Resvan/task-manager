import { RouteObject } from "react-router";
import Layout from "../layout";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "../services/protectedRoute";
import UnAuthenticated from "../services/unAuthenticated";
import Project from "../pages/Project";



const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/project/:id",
        element: <Layout />,
        children: [
            {
                path: "",
                element: (
                    <ProtectedRoute>
                        <Project />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: (
            <UnAuthenticated>
                <AuthPage login />
            </UnAuthenticated>
        ),
    },
    {
        path: "/register",
        element: (
            <UnAuthenticated>
                <AuthPage  />
            </UnAuthenticated>
        ),
    },
];

export default routes;
