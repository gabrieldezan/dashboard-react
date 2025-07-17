import React, { useState, useEffect } from 'react';
import FormularioPadrao from '../components/FormularioPadrao';
import UploadImagem from '../components/UploadImagem';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const BannerFormulario = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        link: '',
        texto_botao: '',
        imagem: null,
        abrir_nova_guia: false,
        posicao: 0,
        status: true,
    });

    const campos = [
        { tipo: 'text', name: 'titulo', label: 'Título', placeholder: 'Informe o título', obrigatorio: true, col: 5 },
        { tipo: 'text', name: 'descricao', label: 'Descrição', placeholder: 'Informe a descrição', col: 7 },
        {
            name: 'imagem',
            componenteCustom: (
                <UploadImagem
                    name="imagem"
                    imagem={formData.imagem}
                    onImagemChange={(name, file) =>
                        setFormData((prev) => ({ ...prev, [name]: file }))
                    }
                    pasta="banners"
                    label="Imagem"
                    obrigatorio={false}
                    tamanho_imagens="1"
                />
            )
        },
        { tipo: 'text', name: 'texto_botao', label: 'Texto do Botão', col: 4 },
        { tipo: 'text', name: 'link', label: 'Link', placeholder: '/contato', col: 6 },
        { tipo: 'number', name: 'posicao', label: 'Posição', obrigatorio: true, col: 2 },
        { tipo: 'checkbox', name: 'abrir_nova_guia', label: 'Abrir em nova guia', col: 6 },
        { tipo: 'checkbox', name: 'status', label: 'Status', col: 6 }
    ];

    useEffect(() => {
        if (id) buscarDados();
    }, [id]);

    const buscarDados = async () => {
        try {
            const response = await axios.get(`http://localhost/dashboard-react/backend/api/banners.php?id=${id}`);
            setFormData((prev) => ({ ...prev, ...response.data }));
        } catch (err) {
            Swal.fire('Erro', 'Erro ao buscar dados', 'error');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'imagem' && !value) return;
            data.append(key, value);
        });

        try {
            await axios.post('http://localhost/dashboard-react/backend/api/banners.php', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Swal.fire('Sucesso', 'Banner salvo com sucesso', 'success').then(() => navigate('/banners'));
        } catch (err) {
            Swal.fire('Erro', 'Erro ao salvar', 'error');
        }
    };

    return (
        <FormularioPadrao
            tituloPagina={id ? "Editar Banner" : "Novo Banner"}
            tituloCabecalho={id ? "Editar Banner" : "Novo Banner"}
            retornoListagemLink="banners"
            campos={campos}
            valores={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default BannerFormulario;