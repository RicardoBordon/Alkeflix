
//Librarias
import { Route, Routes } from 'react-router-dom'
import React from 'react';
import { useEffect, useState } from 'react';

//Login
import Login from './components/Login'
import Listado from './components/Listado';
import Header from './components/Header';
import Footer from './components/Footer';


//Styles
import './css/app.css';
import "./css/bootstrap.min.css";

//Detalle
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';


function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const favsInLocal = localStorage.getItem("favs");

    console.log(favsInLocal)

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray)
    }
  }, [])

  const addorRemoveFromFav = e => {

    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    }
    else { 
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;

    const movieData = {
      imgURL, title, overview, id: btn.dataset["movieId"]
    }
    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
    } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
    }

  }

  return (
    <>

      <Header favorites={favorites}/>
      <div className='container mt-3'>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/listado' element={<Listado addorRemoveFromFav={addorRemoveFromFav} />} />
          <Route path='/detalle' element={<Detalle />} />
          <Route path='/resultados/:keyword' element={<Resultados addorRemoveFromFav={addorRemoveFromFav}/>} />
          <Route path='/favoritos' element={<Favoritos favorites={favorites} addorRemoveFromFav={addorRemoveFromFav} />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
