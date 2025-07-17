import React from 'react';
import ListagemPadrao from '../components/ListagemPadrao';

const BannersListagem = () => {
    const colunasTabela = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true,
            width: '70px'
        },
        {
            name: 'Título',
            selector: row => row.titulo,
            sortable: true,
        },
        {
            name: 'Imagem',
            cell: row => (
                row.imagem ? (
                    <img
                        src={`http://localhost/dashboard-react/backend/uploads/banners/${row.imagem}`}
                        alt={row.titulo}
                        width="100"
                    />
                ) : 'Sem imagem'
            ),
        },
        {
            name: 'Posição',
            selector: row => row.posicao,
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <span className={`badge ${row.status === true ? 'bg-success' : 'bg-danger'}`}>
                    {row.status === true ? 'Ativo' : 'Inativo'}
                </span>
            ),
            sortable: true,
        },
    ];

    return (
        <ListagemPadrao
            titulo="Banners"
            endpoint="http://localhost/dashboard-react/backend/api/banners.php"
            colunasTabela={colunasTabela}
            pastaImagens="banners"
            rotaEdicao="banners/editar"
            linkCabecalho="banners"
        />
    );
};

export default BannersListagem;