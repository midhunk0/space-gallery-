import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NasaPhoto from "./components/NasaPhoto.js";
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route Component={Home} path="/"/>
                    <Route Component={NasaPhoto} path="/nasaphoto"/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
