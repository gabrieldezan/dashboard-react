import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// COMPONENTES
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// PÁGINAS
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BannersListagem from './pages/BannersListagem';
import BannersFormulario from './pages/BannersFormulario';
import BannersMobileListagem from './pages/BannersMobileListagem';
import BannersMobileFormulario from './pages/BannersMobileFormulario';
import SobreFormulario from './pages/SobreFormulario';
import EnderecosListagem from './pages/EnderecosListagem';
import EnderecosFormulario from './pages/EnderecosFormulario';
import RedesSociaisListagem from './pages/RedesSociaisListagem';
import RedesSociaisFormulario from './pages/RedesSociaisFormulario';
import GerenciamentoUsuarios from './pages/GerenciamentoUsuarios';
import TamanhoImagensListagem from './pages/TamanhoImagensListagem';
import TamanhoImagensFormulario from './pages/TamanhoImagensFormulario';
import NotFound from './pages/NotFound';

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
    const token = localStorage.getItem('user');
    return !!token;
};

// Componente de rota condicional
const ConditionalRoute = () => {
    return isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota condicional para a raiz ("/") */}
                <Route path="/" element={<ConditionalRoute />} />

                {/* Rotas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/banners"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <BannersListagem />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/banners/novo"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <BannersFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/banners/editar/:id"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <BannersFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/banners-mobile"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <BannersMobileListagem />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/banners-mobile/novo"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <BannersMobileFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/banners-mobile/editar/:id"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <BannersMobileFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sobre"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <SobreFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/enderecos"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <EnderecosListagem />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/enderecos/novo"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <EnderecosFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/enderecos/editar/:id"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <EnderecosFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/redes-sociais"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <RedesSociaisListagem />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/redes-sociais/novo"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <RedesSociaisFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/redes-sociais/editar/:id"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <RedesSociaisFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/usuarios"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <GerenciamentoUsuarios />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tamanho-imagens"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <TamanhoImagensListagem />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tamanho-imagens/novo"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <TamanhoImagensFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tamanho-imagens/editar/:id"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <TamanhoImagensFormulario />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Rota para página 404 (Not Found) */}
                <Route
                    path="*"
                    element={
                        <Layout>
                            <NotFound />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;