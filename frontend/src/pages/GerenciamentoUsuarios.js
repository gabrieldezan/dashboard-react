import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GerenciamentoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        email: '',
        senha: ''
    });

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        const response = await axios.get('http://localhost/dashboard-react/backend/api/usuarios.php');
        setUsuarios(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.id) {
            await axios.put('http://localhost/dashboard-react/backend/api/usuarios.php', formData);
        } else {
            await axios.post('http://localhost/dashboard-react/backend/api/usuarios.php', formData);
        }

        carregarUsuarios();
        setFormData({ id: '', nome: '', email: '', senha: '' });
    };

    const handleEditar = (usuario) => {
        setFormData(usuario);
    };

    const handleDeletar = async (id) => {
        await axios.delete('http://localhost/dashboard-react/backend/api/usuarios.php', { data: { id } });
        carregarUsuarios();
    };

    return (
        <div>
            <h1>Gerenciamento de Usuários</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required />
                <button type="submit">{formData.id ? 'Atualizar' : 'Criar'}</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={() => handleEditar(usuario)}>Editar</button>
                                <button onClick={() => handleDeletar(usuario.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GerenciamentoUsuarios;