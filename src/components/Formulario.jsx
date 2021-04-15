import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {

    //State del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);

    const [ error, guardarError ] = useState(false);

    //Arreglo de monedas
    const MONEDAS = [
        { codigo: 'US', nombre: 'Dolar americano'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'}
    ];

    //Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS); //Les puedes cambiar el nombre al hacer array destructuring

    //Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    //Al hacer submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar si ambos campos estan llenos
        if (moneda === '' || criptomoneda === ''){
            guardarError(true);

            return;
        }

        guardarError(false);
        //Pasar datos al componente principal
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={ cotizarMoneda }
        >
            { error ? <Error mensaje="Completa todos los campos"/> : null }
            <SelectMonedas/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;