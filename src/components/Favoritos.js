import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favoritos(props) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const favsInLocal = localStorage.getItem("favs");

        if (favsInLocal != null) {
            const favsArray = JSON.parse(favsInLocal);
            setFavorites(favsArray)
        }
    }, [favorites])

    return (
        <>

            <div className='row'>

                {   !props.favorites.length && <div className='col-12 text-danger'> No hay nada en favoritos</div>}
                { 
                    props.favorites.map((oneMovie, idx) => {
                        return (
                            <div className='col-3' key={idx}>
                                <div className="card">
                                    <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
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

export default Favoritos;