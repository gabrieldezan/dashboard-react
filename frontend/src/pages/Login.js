import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Configuração do SweetAlert
const MySwal = withReactContent(Swal);

/**
 * Componente de login do sistema
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    /**
     * Realiza o login do usuário
     * @param {Event} e 
     */
    const realizarLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost/dashboard-react/backend/api/login.php', {
                email,
                senha
            });

            if (response.data.id) {
                // Salva os dados do usuário no localStorage
                localStorage.setItem('user', JSON.stringify(response.data));
                // Redireciona para o dashboard
                navigate('/dashboard');
            } else {
                MySwal.fire('Atenção', response.data.message || 'E-mail ou senha inválidos.', 'warning');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            MySwal.fire('Erro', 'Ocorreu um erro ao tentar realizar o login.', 'error');
        }
    };

    return (
        <>
            {/* Título da página */}
            <Title value="Login" />

            {/* Formulário */}
            <div className="d-flex justify-content-center align-items-center vh-100 text-center">
                <div className="p-3">
                    <form onSubmit={realizarLogin}>
                        <img
                            className="img-fluid mb-4"
                            src="logo-login.webp"
                            alt="Logo Web Dezan"
                            title="Logo Web Dezan"
                        />
                        <div className="form-floating mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Login"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Login</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <label>Senha</label>
                        </div>
                        <button
                            className="btn btn-primary w-100 py-2 my-3"
                            type="submit"
                        >
                            <i className="far fa-sign-in"></i> Login
                        </button>
                        <p className="mt-3 text-body-secondary">Web Dezan © 2025</p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;