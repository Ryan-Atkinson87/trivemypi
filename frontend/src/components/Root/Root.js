import React from "react";
import { Outlet } from "react-router-dom";
import "./Root.css"

export default function Root() {
    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    )
}