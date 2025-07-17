import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormularioPadrao from '../components/FormularioPadrao';

const EnderecosFormulario = () => {
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
            name: 'titulo',
            label: 'Título',
            placeholder: 'ex.: Matriz',
            obrigatorio: true,
            col: 12
        },
        {
            tipo: 'text',
            name: 'endereco',
            label: 'Endereço',
            placeholder: 'ex.: Av. Brasil, 1234 - Centro',
            obrigatorio: true,
            col: 6
        },
        {
            tipo: 'text',
            name: 'cidade',
            label: 'Cidade',
            placeholder: 'ex.: Cascavel',
            obrigatorio: true,
            col: 4
        },
        {
            tipo: 'text',
            name: 'estado',
            label: 'Estado',
            placeholder: 'ex.: PR',
            obrigatorio: true,
            col: 2
        },
        {
            tipo: 'text',
            name: 'mapa',
            label: 'Mapa',
            placeholder: '(Incorporar mapa do Google)',
            obrigatorio: true,
            col: 12
        },
        {
            tipo: 'text',
            name: 'link',
            label: 'Link',
            placeholder: 'ex.: https://g.page/WebDezan?share',
            obrigatorio: true,
            col: 4
        },
        {
            tipo: 'text',
            name: 'horario_atendimento',
            label: 'Horário de Atendimento',
            placeholder: 'ex.: Seg a Sáb / 08:00 - 18:00',
            obrigatorio: true,
            col: 3
        },
        {
            tipo: 'text',
            name: 'telefone',
            label: 'Telefone',
            placeholder: 'ex.: (45) 0000-0000',
            obrigatorio: true,
            col: 3
        },
        {
            tipo: 'checkbox',
            name: 'status',
            label: 'Status',
            col: 2
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
            const response = await axios.get(`http://localhost/dashboard-react/backend/api/enderecos.php?id=${id}`);
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
        data.append('endereco', formData.endereco);
        data.append('cidade', formData.cidade);
        data.append('estado', formData.estado);
        data.append('mapa', formData.mapa);
        data.append('link', formData.link);
        data.append('horario_atendimento', formData.horario_atendimento);
        data.append('telefone', formData.telefone);
        data.append('status', formData.status);

        try {
            await axios.post('http://localhost/dashboard-react/backend/api/enderecos.php', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            exibirSucesso('Endereço salvo com sucesso.', () => {
                navigate('/enderecos');
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
            tituloPagina={isEdicao ? 'Editar Endereço' : 'Novo Endereço'}
            tituloCabecalho={isEdicao ? 'Editar Endereço' : 'Novo Endereço'}
            retornoListagemLink="enderecos"
            campos={campos}
            valores={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default EnderecosFormulario;