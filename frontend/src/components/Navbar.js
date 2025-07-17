import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoff = () => {
        localStorage.removeItem('user');
        handleNavClick();
        navigate('/');
    };

    const handleNavClick = () => {
        const sidebarMenu = document.getElementById('sidebarMenu');
        if (sidebarMenu && window.bootstrap) {
            const offcanvas = window.bootstrap.Offcanvas.getInstance(sidebarMenu);
            if (offcanvas) offcanvas.hide();
        }
    };

    const isActive = (path) => {
        const current = location.pathname;
        return (current === path || current.startsWith(`${path}/`))
            ? 'active text-bg-dark link-light'
            : 'link-body-emphasis';
    };

    const isSubmenuActive = (paths) => {
        return paths.some(path => location.pathname.startsWith(path));
    };

    return (
        <>
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                    <img className="img-fluid d-flex align-center" src="/logo-menu.webp" title="Logo Web Dezan" alt="Logo Web Dezan" />
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav nav-pills flex-column p-2" id="accordionMenu">

                        {/* Dashboard */}
                        <li className="nav-item">
                            <Link to="/dashboard" onClick={handleNavClick} className={`nav-link d-flex align-items-center gap-2 ${isActive('/dashboard')}`}>
                                <i className="fal fa-tachometer-alt-fast"></i> Dashboard
                            </Link>
                        </li>

                        {/* Banners */}
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 link-body-emphasis" data-bs-toggle="collapse" href="#submenuBanners" role="button">
                                <i className="fal fa-images"></i> Banners
                            </a>
                            <div className={`collapse ${isSubmenuActive(['/banners', '/banners-mobile']) ? 'show' : ''}`} id="submenuBanners">
                                <ul className="list-unstyled fw-normal pb-1 small ps-4">
                                    <li><Link to="/banners" onClick={handleNavClick} className={`nav-link ${isActive('/banners')}`}>Banners</Link></li>
                                    <li><Link to="/banners-mobile" onClick={handleNavClick} className={`nav-link ${isActive('/banners-mobile')}`}>Banners Mobile</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Empresa */}
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 link-body-emphasis" data-bs-toggle="collapse" href="#submenuEmpresa" role="button">
                                <i className="fal fa-building"></i> Empresa
                            </a>
                            <div className={`collapse ${isSubmenuActive(['/sobre', '/enderecos', '/redes-sociais']) ? 'show' : ''}`} id="submenuEmpresa">
                                <ul className="list-unstyled fw-normal pb-1 small ps-4">
                                    <li><Link to="/sobre" onClick={handleNavClick} className={`nav-link ${isActive('/sobre')}`}>Sobre</Link></li>
                                    <li><Link to="/enderecos" onClick={handleNavClick} className={`nav-link ${isActive('/enderecos')}`}>Endereços</Link></li>
                                    <li><Link to="/redes-sociais" onClick={handleNavClick} className={`nav-link ${isActive('/redes-sociais')}`}>Redes Sociais</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Portfólio */}
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 link-body-emphasis" data-bs-toggle="collapse" href="#submenuPortfolio" role="button">
                                <i className="fal fa-briefcase"></i> Portfólio
                            </a>
                            <div className={`collapse ${isSubmenuActive(['/portfolio/itens', '/portfolio/grupos']) ? 'show' : ''}`} id="submenuPortfolio">
                                <ul className="list-unstyled fw-normal pb-1 small ps-4">
                                    <li><Link to="/portfolio/itens" onClick={handleNavClick} className={`nav-link ${isActive('/portfolio/itens')}`}>Itens</Link></li>
                                    <li><Link to="/portfolio/grupos" onClick={handleNavClick} className={`nav-link ${isActive('/portfolio/grupos')}`}>Grupos</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Blog */}
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 link-body-emphasis" data-bs-toggle="collapse" href="#submenuBlog" role="button">
                                <i className="fal fa-blog"></i> Blog
                            </a>
                            <div className={`collapse ${isSubmenuActive(['/blog/posts', '/blog/categorias', '/blog/autores']) ? 'show' : ''}`} id="submenuBlog">
                                <ul className="list-unstyled fw-normal pb-1 small ps-4">
                                    <li><Link to="/blog/posts" onClick={handleNavClick} className={`nav-link ${isActive('/blog/posts')}`}>Posts</Link></li>
                                    <li><Link to="/blog/categorias" onClick={handleNavClick} className={`nav-link ${isActive('/blog/categorias')}`}>Categorias</Link></li>
                                    <li><Link to="/blog/autores" onClick={handleNavClick} className={`nav-link ${isActive('/blog/autores')}`}>Autores</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Ferramentas */}
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 link-body-emphasis" data-bs-toggle="collapse" href="#submenuFerramentas" role="button">
                                <i className="fal fa-tools"></i> Ferramentas
                            </a>
                            <div className={`collapse ${isSubmenuActive(['/ferramentas/configuracoes', '/ferramentas/contatos-recebidos']) ? 'show' : ''}`} id="submenuFerramentas">
                                <ul className="list-unstyled fw-normal pb-1 small ps-4">
                                    <li><Link to="/ferramentas/configuracoes" onClick={handleNavClick} className={`nav-link ${isActive('/ferramentas/configuracoes')}`}>Configurações</Link></li>
                                    <li><Link to="/ferramentas/contatos-recebidos" onClick={handleNavClick} className={`nav-link ${isActive('/ferramentas/contatos-recebidos')}`}>Contatos Recebidos</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Administrador */}
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2 link-body-emphasis" data-bs-toggle="collapse" href="#submenuAdministrador" role="button">
                                <i className="fal fa-user-cog"></i> Administrador
                            </a>
                            <div className={`collapse ${isSubmenuActive(['/usuarios', '/tamanho-imagens']) ? 'show' : ''}`} id="submenuAdministrador">
                                <ul className="list-unstyled fw-normal pb-1 small ps-4">
                                    <li><Link to="/usuarios" onClick={handleNavClick} className={`nav-link ${isActive('/usuarios')}`}>Usuários</Link></li>
                                    <li><Link to="/tamanho-imagens" onClick={handleNavClick} className={`nav-link ${isActive('/tamanho-imagens')}`}>Tamanho Imagens</Link></li>
                                </ul>
                            </div>
                        </li>

                        <hr className="my-3" />

                        {/* Sair */}
                        <li className="nav-item">
                            <button onClick={handleLogoff} className="nav-link link-danger d-flex align-items-center gap-2">
                                <i className="fal fa-sign-out-alt"></i> Sair
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;