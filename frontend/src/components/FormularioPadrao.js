import React from 'react';
import Title from './Title';
import Cabecalho from './Cabecalho';

const FormularioPadrao = ({
    tituloPagina,
    tituloCabecalho,
    retornoListagemLink,
    campos,
    onChange,
    onSubmit,
    valores,
    children,
    botoes = true,
}) => {
    return (
        <>
            <Title value={tituloPagina} />
            <Cabecalho titulo={tituloCabecalho} link={retornoListagemLink} retorna_listagem={!!retornoListagemLink} />

            <form className="row g-3" onSubmit={onSubmit}>
                {campos.map((campo, idx) => {
                    const { tipo, name, label, placeholder, obrigatorio, col, valor, componenteCustom } = campo;
                    const valorCampo = valores[name] ?? '';

                    if (componenteCustom) {
                        return (
                            <div className={`col-md-${col || 12}`} key={idx}>
                                {React.cloneElement(componenteCustom, {
                                    value: valorCampo,
                                    onChange: (v) => onChange({ target: { name, value: v } }),
                                })}
                            </div>
                        );
                    }

                    if (tipo === 'textarea') {
                        return (
                            <div className={`col-md-${col || 12}`} key={idx}>
                                <label htmlFor={name} className="fw-medium">{label}</label>
                                <textarea
                                    id={name}
                                    name={name}
                                    className="form-control form-control-sm"
                                    rows="5"
                                    placeholder={placeholder}
                                    value={valorCampo}
                                    onChange={onChange}
                                    required={obrigatorio}
                                />
                            </div>
                        );
                    }

                    if (tipo === 'checkbox') {
                        return (
                            <div className={`col-md-${col || 6}`} key={idx}>
                                <div className="form-check mt-2">
                                    <input
                                        type="checkbox"
                                        id={name}
                                        name={name}
                                        className="form-check-input"
                                        checked={valorCampo}
                                        onChange={onChange}
                                    />
                                    <label htmlFor={name} className="form-check-label">{label}</label>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div className={`col-md-${col || 12}`} key={idx}>
                            <label htmlFor={name} className="fw-medium">{label}{obrigatorio ? ' *' : ''}</label>
                            <input
                                type={tipo}
                                id={name}
                                name={name}
                                className="form-control form-control-sm"
                                placeholder={placeholder}
                                value={valorCampo}
                                onChange={onChange}
                                required={obrigatorio}
                            />
                        </div>
                    );
                })}

                {children}

                {botoes && (
                    <div className="col-12 d-flex justify-content-end pt-0 pt-3 mt-3 border-top">
                        <button type="submit" className="btn btn-success">
                            <i className="fal fa-save"></i> Salvar
                        </button>
                    </div>
                )}
            </form>
        </>
    );
};

export default FormularioPadrao;