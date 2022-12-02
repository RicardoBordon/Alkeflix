import swal from '@sweetalert/with-react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Resultados from './Resultados';

function Buscador () {

    const navigate = useNavigate();

    const submitHandler = e => {
        
        e.preventDefault()
        const keyword = e.currentTarget.keyword.value.trim();

        if(keyword.length === 0){
            swal(<h5>Tienes que escribir una palabra clave </h5>)
        }
        else if(keyword.length < 4){
            swal(<h5>Tienes que escribir más de 3 caracteres</h5>)
        }
        else {
            e.currentTarget.keyword.value = '';
            navigate(`/resultados/${keyword}`);
        }
    }

    return(
        <>
        <form className='d-flex align-items-center' onSubmit={submitHandler}>
        <label className='form-label mb-0 mx-2'>
            <input className='form-control' type='text' name="keyword" placeholder="Escríbe una palabra clave..."/>
        </label>
        <button className="btn btn-primary" type="submit">Buscar</button>
        </form>
        </>
    )
}

export default Buscador;