import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import swal from '@sweetalert/with-react';

function Listado(props) {
    let token = sessionStorage.getItem("token");
    const [moviesList, setMoviesList] = useState([]);

    console.log(props)
    useEffect(() => {
        const endpoint = "https://api.themoviedb.org/3/discover/movie?api_key=8a073ce471b715b903c2a9c4ad4d633c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
        axios.get(endpoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results);
            })
            .catch(error => {
                console.log(error)
                swal(<h2>Hubo en error, intenta más tarde #{error.message}</h2>);
            })
    }, [setMoviesList])

    return (

        <>
            {!token && <Navigate to={"/"} />}

            <div className='row'>
                {
                moviesList.map((oneMovie, idx) => {
                    return (
                    <div className='col-3' key={idx}>
                        <div className="card">
                            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                            <button className='favoutite-btn' onClick={props.addorRemoveFromFav} data-movie-id={oneMovie.id}>🖤</button>
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title}</h5>
                                <p className="card-text">{oneMovie.overview}</p>
                                <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>
                            </div>
                        </div>
                    </div>
                    )

                })}
            </div>

        </>
    )
}

export default Listado;