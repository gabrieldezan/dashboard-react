import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormularioPadrao from '../components/FormularioPadrao';

const TamanhoImagensFormulario = () => {
    const { id } = useParams();
    const isEdicao = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: '',
        endereco: '',
        cidade: '',
        estado: '',
        mapa: '',
        link: '',
        horario_atendimento: '',
        telefone: '',
        status: true
    });

    const campos = [
        {
            tipo: 'text',
            name: 'tabela',
            label: 'Tabela',
            placeholder: 'ex.: Banner',
            obrigatorio: true,
            col: 12
        },
        {
            tipo: 'number',
            name: 'imagem_largura',
            label: 'Imagem Largura',
            placeholder: 'ex.: 1920',
            obrigatorio: true,
            col: 3
        },
        {
            tipo: 'number',
            name: 'imagem_altura',
            label: 'Imagem Altura',
            placeholder: 'ex.: 1080',
            obrigatorio: true,
            col: 3
        },
        {
            tipo: 'number',
            name: 'thumb_largura',
            label: 'Thumb Largura',
            placeholder: 'ex.: 1920',
            obrigatorio: false,
            col: 3
        },
        {
            tipo: 'number',
            name: 'thumb_altura',
            label: 'Thumb Altura',
            placeholder: 'ex.: 1080',
            obrigatorio: false,
            col: 3
        }        
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
            const response = await axios.get(`http://localhost/dashboard-react/backend/api/tamanho_imagens.php?id=${id}`);
            setFormData(prev => ({
                ...prev,
                ...response.data
            }));
        } catch (error) {
            exibirErro('Erro ao carregar os dados', error.message);
        }
    };

    const resetarFormulario = () => {
        setFormData({
            tabela: '',
            imagem_largura: '',
            imagem_altura: '',
            thumb_largura: '',
            thumb_altura: ''
        });
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
        data.append('tabela', formData.tabela);
        data.append('imagem_largura', formData.imagem_largura);
        data.append('imagem_altura', formData.imagem_altura);
        data.append('thumb_largura', formData.thumb_largura);
        data.append('thumb_altura', formData.thumb_altura);

        try {
            await axios.post('http://localhost/dashboard-react/backend/api/tamanho_imagens.php', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            exibirSucesso('Tamanho Imagem salvo com sucesso.', () => {
                navigate('/tamanho-imagens');
            });

        } catch (error) {
            exibirErro('Erro ao salvar os dados', error.message);
        }
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
            tituloPagina={isEdicao ? 'Editar Tamanho Imagem' : 'Novo Tamanho Imagem'}
            tituloCabecalho={isEdicao ? 'Editar Tamanho Imagem' : 'Novo Tamanho Imagem'}
            retornoListagemLink="tamanho-imagens"
            campos={campos}
            valores={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default TamanhoImagensFormulario;