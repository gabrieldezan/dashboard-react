// IMPORTS
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from './Title';
import Cabecalho from './Cabecalho';

// CONFIGURAÇÃO DO SWEET ALERT
const MySwal = withReactContent(Swal);

const ListagemPadrao = ({
    titulo,
    endpoint,
    colunasTabela,
    rotaEdicao,
    linkCabecalho,
    exibirDelete = true,
    textoConfirmDelete = 'Essa ação não pode ser desfeita!',
    textoSucessoDelete = 'O item foi removido com sucesso.',
    textoErroDelete = 'Ocorreu um erro ao tentar excluir o item.'
}) => {
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Carrega os dados ao montar o componente
    useEffect(() => {
        buscarDados();
    }, []);

    /**
     * Busca os dados da API
     */
    const buscarDados = async () => {
        setCarregando(true);
        try {
            const response = await axios.get(endpoint);
            setDados(response.data);
        } catch (error) {
            console.error(`Erro ao buscar ${titulo.toLowerCase()}:`, error);
            MySwal.fire('Erro!', `Ocorreu um erro ao buscar os ${titulo.toLowerCase()}.`, 'error');
        }
        setCarregando(false);
    };

    /**
     * Deleta um item
     */
    const deletarItem = async (id) => {
        const resultado = await MySwal.fire({
            title: 'Tem certeza?',
            text: textoConfirmDelete,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (resultado.isConfirmed) {
            try {
                await axios.delete(endpoint, { data: { id } });
                MySwal.fire('Excluído!', textoSucessoDelete, 'success');
                buscarDados();
            } catch (error) {
                console.error(`Erro ao deletar ${titulo.toLowerCase()}:`, error);
                MySwal.fire('Erro!', textoErroDelete, 'error');
            }
        }
    };

    /**
     * Monta as colunas com as ações (editar e excluir)
     */
    const colunasComAcoes = [
        ...colunasTabela,
        {
            name: 'Ações',
            cell: row => (
                <>
                    {rotaEdicao && (
                        <Link to={`/${rotaEdicao}/${row.id}`}>
                            <button className="btn btn-sm btn-secondary me-2">
                                <i className="fal fa-edit"></i>
                            </button>
                        </Link>
                    )}
                    {exibirDelete && (
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deletarItem(row.id)}
                        >
                            <i className="fal fa-trash-alt"></i>
                        </button>
                    )}
                </>
            ),
            ignoreRowClick: true,
        }
    ];

    /**
     * Estilo customizado da tabela
     */
    const customStyles = {
        headCells: {
            style: { fontWeight: 'bold' }
        },
    };

    /**
     * Tradução da paginação
     */
    const paginationComponentOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <>
            <Title value={titulo} />
            <Cabecalho titulo={titulo} link={linkCabecalho} retorna_listagem={false} />
            <DataTable
                columns={colunasComAcoes}
                data={dados}
                pagination
                highlightOnHover
                striped
                noDataComponent="Nenhum registro encontrado."
                customStyles={customStyles}
                paginationComponentOptions={paginationComponentOptions}
                progressPending={carregando}
                progressComponent={<span>Carregando...</span>}
            />
        </>
    );
};

export default ListagemPadrao;