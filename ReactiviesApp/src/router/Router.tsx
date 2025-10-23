import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import LoginForm from "../features/users/LoginForm";


export const routes : RouteObject[] = [ 
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "activities",
                element: <ActivityDashboard submitting={false} />,
            },
            {
                path: "activities/:id",
                element: <ActivityDetails />,
            },
            {
                path: "createActivity",
                element: <ActivityForm submitting={false} key="createactivity" />,
            },
            {
                path: "manage/:id",
                element: <ActivityForm submitting={false} key="manageactivity" />,
            },
            {
                path: "login",
                element: <LoginForm />,
            },
        ],
    },
]

export const router = createBrowserRouter(routes)