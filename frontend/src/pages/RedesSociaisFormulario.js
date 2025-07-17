import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormularioPadrao from '../components/FormularioPadrao';

const RedesSociaisFormulario = () => {
    const { id } = useParams();
    const isEdicao = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: '',
        link: '',
        icone: '',
        status: true
    });

    const campos = [
        { tipo: 'text', name: 'titulo', label: 'Título', placeholder: 'ex.: Facebook', obrigatorio: true, col: 12 },
        { tipo: 'text', name: 'link', label: 'Link', placeholder: 'ex.: https://facebook.com.br', obrigatorio: true, col: 6 },
        { tipo: 'text', name: 'icone', label: 'Ícone', placeholder: 'ex.: fa fa-facebook', obrigatorio: true, col: 4 },
        { tipo: 'checkbox', name: 'status', label: 'Status', col: 2 }
    ];

    useEffect(() => {
        if (isEdicao) {
            buscarDados();
        } else {
            resetarFormulario();
        }
    }, [id]);

    const buscarDados = async () => {
        try {
            const response = await axios.get(`http://localhost/dashboard-react/backend/api/redes_sociais.php?id=${id}`);
            setFormData(prev => ({
                ...prev,
                ...response.data
            }));
        } catch (error) {
            exibirErro('Erro ao carregar os dados', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        if (formData.id) data.append('id', formData.id);
        data.append('titulo', formData.titulo);
        data.append('link', formData.link);
        data.append('icone', formData.icone);
        data.append('status', formData.status);

        try {
            await axios.post(`http://localhost/dashboard-react/backend/api/redes_sociais.php`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            exibirSucesso('Rede Social salva com sucesso.', () => {
                navigate('/redes-sociais');
            });
        } catch (error) {
            exibirErro('Erro ao salvar os dados', error.message);
        }
    };

    const resetarFormulario = () => {
        setFormData({
            titulo: '',
            link: '',
            icone: '',
            status: true
        });
    };

    const exibirErro = (titulo, mensagem) => {
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensagem
        });
    };

    const exibirSucesso = (mensagem, callback) => {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: mensagem,
            confirmButtonText: 'Ok'
        }).then(() => {
            if (callback) callback();
        });
    };

    return (
        <FormularioPadrao
            tituloPagina={isEdicao ? "Editar Rede Social" : "Nova Rede Social"}
            tituloCabecalho={isEdicao ? "Editar Rede Social" : "Nova Rede Social"}
            retornoListagemLink="redes-sociais"
            campos={campos}
            valores={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default RedesSociaisFormulario;