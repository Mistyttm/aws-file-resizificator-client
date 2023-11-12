import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Download from './Filedownload.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/download" element={<Download />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
