import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormularioPadrao from '../components/FormularioPadrao';
import UploadImagem from '../components/UploadImagem';

const BannersMobileFormulario = () => {
    const { id } = useParams();
    const isEdicao = Boolean(id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        link: '',
        texto_botao: '',
        imagem: null,
        abrir_nova_guia: false,
        posicao: 0,
        status: true
    });

    const campos = [
        { tipo: 'text', name: 'titulo', label: 'Título', placeholder: 'Informe o título aqui', obrigatorio: true, col: 5 },
        { tipo: 'text', name: 'descricao', label: 'Descrição', placeholder: 'Informe a descrição aqui', col: 7 },
        {
            name: 'imagem',
            componenteCustom: (
                <UploadImagem
                    name="imagem"
                    imagem={formData.imagem}
                    onImagemChange={(name, file) =>
                        setFormData(prev => ({ ...prev, [name]: file }))
                    }
                    pasta="banners_mobile"
                    label="Imagem"
                    obrigatorio={false}
                    tamanho_imagens="2"
                />
            )
        },
        { tipo: 'text', name: 'texto_botao', label: 'Texto do Botão', placeholder: 'ex.: Clique aqui', col: 4 },
        { tipo: 'text', name: 'link', label: 'Link', placeholder: 'ex.: /contato', col: 6 },
        { tipo: 'number', name: 'posicao', label: 'Posição', placeholder: 'ex.: 0', obrigatorio: true, col: 2 },
        { tipo: 'checkbox', name: 'abrir_nova_guia', label: 'Abrir link em nova guia', col: 6 },
        { tipo: 'checkbox', name: 'status', label: 'Status', col: 6 }
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
            const response = await axios.get(`http://localhost/dashboard-react/backend/api/banners_mobile.php?id=${id}`);
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
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'imagem' && !value) return;
            data.append(key, value);
        });

        try {
            await axios.post('http://localhost/dashboard-react/backend/api/banners_mobile.php', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            exibirSucesso('Banner salvo com sucesso.', () => {
                navigate('/banners-mobile');
            });
        } catch (error) {
            exibirErro('Erro ao salvar os dados', error.message);
        }
    };

    const resetarFormulario = () => {
        setFormData({
            titulo: '',
            descricao: '',
            link: '',
            texto_botao: '',
            imagem: null,
            abrir_nova_guia: false,
            posicao: 0,
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
            tituloPagina={isEdicao ? "Editar Banner Mobile" : "Novo Banner Mobile"}
            tituloCabecalho={isEdicao ? "Editar Banner Mobile" : "Novo Banner Mobile"}
            retornoListagemLink="banners-mobile"
            campos={campos}
            valores={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default BannersMobileFormulario;