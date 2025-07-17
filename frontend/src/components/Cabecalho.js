import { Link } from 'react-router-dom';
import React from 'react';

const Cabecalho = ({ titulo, link, retorna_listagem }) => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-0 pb-3 mb-3 border-bottom">
            <h1 className="h2 m-0">{titulo}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                {retorna_listagem && (
                    <Link to={`/${link}`} className='btn btn-sm btn-link'>
                        <i className="fal fa-arrow-left"></i> Retornar à listagem
                    </Link>
                )}
                {link && (
                <Link to={`/${link}/novo`} className='btn btn-sm btn-outline-primary'>
                    <i className="fal fa-plus"></i> Novo
                </Link>
                )}
            </div>
        </div>
    );
};

export default Cabecalho;