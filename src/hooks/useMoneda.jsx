import React, { Fragment, useState } from 'react';

const useMoneda = (label, stateInicial, opciones) => {
    
    //State del custom hook
    const [ state, actualizarState ] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>
            <label>{ label }</label>
            <select>
                <option value="">-- Seleccione --</option>
                { opciones.map(opcion => (
                    <option key={ opcion.codigo } value={ opcion.codigo }>{ opcion.nombre }</option>
                ))};
            </select>
        </Fragment>
    );

    //Retorna el state, su interfaz y su funcion para actualizar el state
    return [ state, Seleccionar, actualizarState ];
}
 
export default useMoneda;