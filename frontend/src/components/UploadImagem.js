import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Swal from 'sweetalert2';

const UploadImagem = ({
    name,
    imagem,
    onImagemChange,
    pasta = '',
    label = 'Imagem',
    obrigatorio = false,
    tamanho_imagens = ''
}) => {
    const [dimensoesImagem, setDimensoesImagem] = useState(null);

    useEffect(() => {
        if (tamanho_imagens) {
            buscarDimensoesImagem(tamanho_imagens);
        }
    }, [tamanho_imagens]);

    const buscarDimensoesImagem = async (id) => {
        try {
            const response = await axios.get(`http://localhost/dashboard-react/backend/api/tamanho_imagens.php?id=${id}`);
            setDimensoesImagem(response.data);
        } catch (error) {
            console.error('Erro ao buscar dimensões da imagem:', error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];

                // ✅ Validação de tipo
                const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                    alert('Formato inválido. Apenas PNG, JPG e WEBP são permitidos.');
                    return;
                }

                // ✅ Validação de tamanho (2MB = 2 * 1024 * 1024 bytes)
                const maxSize = 2 * 1024 * 1024;
                if (file.size > maxSize) {
                    exibirErro('Tamanho excedido', 'A imagem deve ter no máximo 2MB.');
                    return;
                }

                onImagemChange(name, file);
            }
        },
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/webp': []
        },
        multiple: false,
        maxFiles: 1,
    });

    const previewSrc = imagem
        ? typeof imagem === 'string'
            ? `http://localhost/dashboard-react/backend/uploads/${pasta}/${imagem}`
            : URL.createObjectURL(imagem)
        : null;

    /**
     * EXIBE ALERTA DE ERRO
     */
    const exibirErro = (titulo, mensagem) => {
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensagem
        });
    };

    return (
        <div className="row mb-3">
            <label htmlFor={name} className="form-label fw-medium d-block">
                {label} {obrigatorio && '*'}
            </label>
            <div className="col-md-3">
                {previewSrc && (
                    <div className="text-center mt-2 mb-2">
                        <img
                            src={previewSrc}
                            alt="Preview"
                            className="img-fluid"
                            style={{ maxHeight: '150px' }}
                        />
                    </div>
                )}
            </div>
            <div className="col-md-9">
                <div
                    {...getRootProps()}
                    className={`p-4 border rounded text-center bg-light ${isDragActive ? 'border-secondary-subtle' : 'border-light-subtle'}`}
                    style={{ cursor: 'pointer' }}
                >
                    <input {...getInputProps()} name={name} />
                    <i className="fal fa-upload fa-2x text-muted mb-2"></i>
                    <p className="mb-1 text-muted">
                        {imagem ? 'Clique ou solte para substituir a imagem' : 'Clique ou arraste uma imagem aqui'}
                    </p>
                    <small className="text-muted">
                        Formatos permitidos: JPG, PNG, WEBP. Máximo: 2MB.
                    </small>
                </div>
                {dimensoesImagem && (
                    <small className="text-center fw-light d-block mt-1">
                        <em>Tamanho recomendado: {dimensoesImagem.imagem_largura}x{dimensoesImagem.imagem_altura}px</em>
                    </small>
                )}
            </div>
        </div>
    );
};

export default UploadImagem;