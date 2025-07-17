import React from 'react';
import ListagemPadrao from '../components/ListagemPadrao';

const RedesSociaisListagem = () => {
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
            name: 'Link',
            cell: row => (
                <a href={row.link} title={row.title} target='_blank'>{row.link}</a>
            ),
        },
        {
            name: 'Ícone',
            cell: row => (
                <i className={row.icone}></i>
            ),
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
            titulo="Redes Sociais"
            endpoint="http://localhost/dashboard-react/backend/api/redes_sociais.php"
            colunasTabela={colunasTabela}
            pastaImagens=""
            rotaEdicao="redes-sociais/editar"
            linkCabecalho="redes-sociais"
        />
    );
};

export default RedesSociaisListagem;