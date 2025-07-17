import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const location = useLocation();

    // Verifica se a rota atual é a página de Login
    const isLoginPage = location.pathname === '/';

    return (
        <>
            {/* HEADER */}
            <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
                <div className="navbar-brand col-md-3 col-lg-2 col-6 me-0 px-3">
                    <img className="img-fluid p-2 d-flex align-center" src="/logo-painel.webp" title="Logo Web Dezan" alt="Logo Web Dezan" />
                </div>
                <ul className="navbar-nav flex-row d-md-none">
                    <li className="nav-item text-nowrap">
                        <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fal fa-bars"></i>
                        </button>
                    </li>
                </ul>
            </header>

            {/* CONTENT */}
            <div className="container-fluid">
                <div className="row">
                    {/* NAVBAR */}
                    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                        {!isLoginPage && <Navbar />}
                    </div>

                    {/* CONTEÚDO PÁGINA */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 p-0 mt-4 mb-4 px-md-4 px-3">
                        <div className="card">
                            <div className="card-body p-4">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;