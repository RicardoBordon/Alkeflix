import React from 'react';
import axios from "axios";
import swal from '@sweetalert/with-react';
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const submitHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        console.log(regexEmail);
        console.log(email, password);
        if (email === "" || password === "") {
            swal(<h2>Campos Vacios</h2>)
            return
        }
        if (email !== "" && !regexEmail.test(email)){
            swal(<h2>Dirección inválida</h2>)
            return
        }
        if (email !== "challenge@alkemy.org" || password !== "react"){
            swal(<h2>Credenciales inválidas</h2>)
            return
        }

        console.log("todas las validaciones pasadas, listo para enviar");

        axios
        .post('http://challenge-react.alkemy.org', {email, password})
        .then(res => 
            {
             const token = res.data.token;
             sessionStorage.setItem("token",token);
             navigate("/listado");
            })
               
            
                
    }
    let token = sessionStorage.getItem("token");
    
    return (
        <>
            { token && <Navigate to={"/listado"}/>}
            <div className='container text-center'>
            <h2 className='h2'>Formulario de Login</h2>
            <form className='p-4' onSubmit={submitHandler}>
            <label>
                <span>Correo electrónico:</span><br />
                <input type="email" name="email"></input>
            </label>
            <br />
            <label>
                <span>Contraseña:</span><br />
                <input type="password" name="password"></input>
            </label>
            <br />
            <button type="submit">Ingresar</button>
        </form>
        </div>
        </>
    )
}

export default Login;