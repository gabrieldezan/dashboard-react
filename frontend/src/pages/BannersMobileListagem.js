import React from 'react';
import ListagemPadrao from '../components/ListagemPadrao';

const BannersMobileListagem = () => {
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
                        src={`http://localhost/dashboard-react/backend/uploads/banners_mobile/${row.imagem}`}
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
            titulo="Banners Mobile"
            endpoint="http://localhost/dashboard-react/backend/api/banners_mobile.php"
            colunasTabela={colunasTabela}
            pastaImagens="banners_mobile"
            rotaEdicao="banners-mobile/editar"
            linkCabecalho="banners-mobile"
        />
    );
};

export default BannersMobileListagem;