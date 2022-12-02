import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import swal from '@sweetalert/with-react';

function Detalle () {
    let token = sessionStorage.getItem("token");
    let query = new URLSearchParams(window.location.search)
    let movieID = query.get("movieID")

    const [movie, setMovie] = useState(null);

    useEffect(() => {

        const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=8a073ce471b715b903c2a9c4ad4d633c&language=en-US`
        axios.get(endpoint)
            .then(response => {
                const movieData = response.data;
                setMovie(movieData)
            })
            .catch(error => {
                console.log(error)
                swal(<h2>Hubo en error, intenta más tarde #{error.message}</h2>);
            })
    }, [movieID])

    return(
        <>
         {!token && <Navigate to={`/`} />}
         {!movie && <p>cargando...</p>}
         { movie && 
         <>
         <h2>Título: {movie.title}</h2>
         <div className='row'>
            <div className='col-4'>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="movie poster" />
            </div>
            <div className='col-8'>
                
                <h5>Fecha de estreno: {movie.release_date}</h5>
                <h5>Reseña:</h5>
                <p>{movie.overview}</p>
                <h5>Rating: {movie.vote_average}</h5>
                <h5>Géneros:</h5>
                <ul>
                    {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                </ul>
            </div>
         </div>
         </>
         }
        </>
    )
}

export default Detalle;
