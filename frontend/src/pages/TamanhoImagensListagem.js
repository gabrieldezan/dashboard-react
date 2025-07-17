import React from 'react';
import ListagemPadrao from '../components/ListagemPadrao';

const TamanhoImagensListagem = () => {
    const colunasTabela = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: '70px'
        },
        {
            name: 'Tabela',
            selector: row => row.tabela,
            sortable: true,
        },
        {
            name: 'Imagem Largura',
            selector: row => row.imagem_largura,
            sortable: true,
        },
        {
            name: 'Imagem Altura',
            selector: row => row.imagem_altura,
            sortable: true,
        },
        {
            name: 'Thumb Largura',
            selector: row => row.thumb_largura,
            sortable: true,
        },
        {
            name: 'Thumb Altura',
            selector: row => row.thumb_altura,
            sortable: true,
        },
    ];

    return (
        <ListagemPadrao
            titulo="Tamanho Imagens"
            endpoint="http://localhost/dashboard-react/backend/api/tamanho_imagens.php"
            colunasTabela={colunasTabela}
            pastaImagens=""
            rotaEdicao="tamanho-imagens/editar"
            linkCabecalho="tamanho-imagens"
        />
    );
};

export default TamanhoImagensListagem;