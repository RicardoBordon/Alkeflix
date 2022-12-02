import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import swal from '@sweetalert/with-react';

function Resultados (props) {

    let { keyword } = useParams();

    console.log(keyword)
   
    const [moviesResults, setMoviesResults] = useState([]);
    
    useEffect(() => {

        let endpoint = `https://api.themoviedb.org/3/search/movie?api_key=8a073ce471b715b903c2a9c4ad4d633c&query&language=en-US&page=1&include_adult=false&query=${keyword}`;
        
        axios.get(endpoint)
        .then(response => {
            const moviesArray =  response.data.results;

            // if(moviesArray.length === 0){
            //     swal(<h4>Tu busqueda no arrojó resultados</h4>)
            // }
            console.log(moviesArray)
            setMoviesResults(moviesArray);
            
        })
        .catch(error => {
            swal(<h2>Hubo en error, intenta más tarde #{error.message}</h2>);
        })
        
    }, [keyword]);

    return(
        <> 
            <h3>Buscaste: {keyword}</h3>
            {moviesResults.length === 0 && <h3>No hay resultados</h3>}
            <div className='row'>
                {
                moviesResults.map((movies, idx) => {
                    return (
                    <div className='col-4' key={idx}>
                        <div className="card">
                            <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} className="card-img-top" alt="..." />
                            <button className='favoutite-btn' onClick={props.addorRemoveFromFav} data-movie-id={movies.id}>🖤</button>
                            <div className="card-body">
                                <h5 className="card-title">{movies.title}</h5>
                                <p className="card-text">{movies.overview}</p>
                                <Link to={`/detalle?movieID=${movies.id}`} className="btn btn-primary">View detail</Link>
                            </div>
                        </div>
                    </div>
                    )

                })}
            </div>

        </>
    )
}

export default Resultados;