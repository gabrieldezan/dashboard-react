import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Verifica se o usuário está logado (exemplo: verifica se há um token no localStorage)
    const isAuthenticated = localStorage.getItem('user');

    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Se o usuário estiver autenticado, renderiza o componente filho (a rota protegida)
    return children;
};

export default ProtectedRoute;