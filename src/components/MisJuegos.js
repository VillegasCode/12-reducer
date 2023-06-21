import React, { useEffect, useReducer } from 'react'
import { JuegoReducer } from '../reducers/JuegoReducer';

//Mantener esta función init siempre encima del componente
const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [];
}

export const MisJuegos = () => {

    const [juegos, dispatch] = useReducer(JuegoReducer, [], init);

    useEffect(()=> {
        localStorage.setItem("juegos", JSON.stringify(juegos))
    }, [juegos]);

    const conseguirDatosForm = e => {
        e.preventDefault();

        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.value
        };


        const accion = {
            type: "crear",
            payload: juego
        };

        dispatch(accion);

        console.log(juegos);
    }
  

    const borramelo = id => {
        const action = {
            type: "borrar",
            payload: id
        };

        dispatch(action);
    }


    return (
    <div>
        <h1>Estos son mis video juegos</h1>

        <p>Número de Videojuegos: {juegos.length}</p>

        <ul>
            {
                juegos.map(juego => (
                    <li key={juego.id}>
                        {juego.titulo}
                        &nbsp; <button onClick={ e => borramelo(juego.id)}>X</button>
                    </li>
                ))
            }
        </ul>

        <h3>Agregar Juego</h3>

        <form onSubmit={conseguirDatosForm}>
            <input type='texto' name='titulo' placeholder='Titulo' />
            <textarea name='descripcion' placeholder='Descripcion'></textarea>
            <input type='submit' value="Guardar" />
        </form>
    </div>
  )
}
