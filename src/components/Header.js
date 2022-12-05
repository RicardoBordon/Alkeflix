import { Link } from 'react-router-dom';
import Buscador from './Buscador';

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-secondary ">
            <div className="container-fluid ">
                <a className='navbar-brand mb-0 h1'>Soy el header</a>

                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className='navbar-nav p-2'>
                        <li className='nav-item'>
                            <Link className='nav-link' to={"/"}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to={"/listado"}>Listado</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to={"/contacto"}>Contacto</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link ' to={"/favoritos"}>Favoritos</Link>
                        </li>
                        <li className='nav-item '>
                            <span className='nav-link'>
                                {props.favorites.length > 0 && <>Películas en Favoritos: {props.favorites.length}</>}
                            </span>
                        </li>
                        <li className='nav-item' >

                        </li>
                    </ul>
                        <Buscador />
                </div>

            </div>
        </nav>
    )
}

export default Header