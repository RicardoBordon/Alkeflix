import { Link } from 'react-router-dom';
import Buscador from './Buscador';

function Header(props) {
    return (
        <header>
            <h2>Soy el header</h2>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/listado"}>Listado</Link>
                    </li>
                    <li>
                        <Link to={"/contacto"}>Contacto</Link>
                    </li>
                    <li>
                        <Link to={"/favoritos"}>Favoritos</Link>
                    </li>
                    <li className='d-flex align-items-center'>
                        <span className='text-sucess'>
                            {props.favorites.length > 0 && <>Películas en Favoritos: {props.favorites.length}</>}
                        </span>
                    </li>
                </ul>
                <Buscador />
            </nav>
        </header>
    )
}

export default Header