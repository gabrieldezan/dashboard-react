import React from 'react';
import ListagemPadrao from '../components/ListagemPadrao';

const EnderecosListagem = () => {
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
            name: 'Endereço',
            selector: row => row.endereco,
            sortable: true,
        },
        {
            name: 'Cidade',
            selector: row => row.cidade,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.estado,
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
            titulo="Endereços"
            endpoint="http://localhost/dashboard-react/backend/api/enderecos.php"
            colunasTabela={colunasTabela}
            pastaImagens=""
            rotaEdicao="enderecos/editar"
            linkCabecalho="enderecos"
        />
    );
};

export default EnderecosListagem;