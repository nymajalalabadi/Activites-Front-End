import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../app/layout/App";


export const routes : RouteObject[] = [
    {
        path: "/",
        element: <App />,
    },
];

export const router = createBrowserRouter(routes);