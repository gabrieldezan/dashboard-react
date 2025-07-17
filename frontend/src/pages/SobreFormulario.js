import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FormularioPadrao from '../components/FormularioPadrao';
import UploadImagem from '../components/UploadImagem';
import EditorTexto from '../components/EditorTexto';

const SobreFormulario = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        resumo: '',
        texto: '',
        imagem: null,
        link: ''
    });

    const campos = [
        {
            tipo: 'text',
            name: 'titulo',
            label: 'Título',
            placeholder: 'Informe o título aqui',
            obrigatorio: true,
            col: 12
        },
        {
            tipo: 'textarea',
            name: 'resumo',
            label: 'Resumo',
            placeholder: 'Informe o resumo aqui',
            col: 12
        },
        {
            name: 'texto',
            componenteCustom: (
                <EditorTexto
                    id="texto"
                    label="Texto"
                    value={formData.texto}
                    onChange={(content) => setFormData(prev => ({ ...prev, texto: content }))}
                />
            )
        },
        {
            name: 'imagem',
            componenteCustom: (
                <UploadImagem
                    name="imagem"
                    imagem={formData.imagem}
                    onImagemChange={(name, file) =>
                        setFormData(prev => ({ ...prev, [name]: file }))
                    }
                    pasta="sobre"
                    label="Imagem"
                    obrigatorio={false}
                    tamanho_imagens="3"
                />
            )
        },
        {
            tipo: 'text',
            name: 'link',
            label: 'Link',
            placeholder: 'ex.: /contato',
            col: 12
        }
    ];

    useEffect(() => {
        buscarDados();
    }, []);

    const buscarDados = async () => {
        try {
            const response = await axios.get(`http://localhost/dashboard-react/backend/api/sobre.php`);
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
        data.append('titulo', formData.titulo);
        data.append('resumo', formData.resumo);
        data.append('texto', formData.texto);
        if (formData.imagem && typeof formData.imagem !== 'string') {
            data.append('imagem', formData.imagem);
        }
        data.append('link', formData.link);

        try {
            await axios.post('http://localhost/dashboard-react/backend/api/sobre.php', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            exibirSucesso('Sobre salvo com sucesso.', () => {
                buscarDados();
                setFormData(prev => ({ ...prev, imagem: null }));
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
            tituloPagina="Editar Sobre"
            tituloCabecalho="Editar Sobre"
            retornoListagemLink=""
            campos={campos}
            valores={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default SobreFormulario;