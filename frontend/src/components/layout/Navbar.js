import {Link} from 'react-router-dom'

import styles from './Navbar.module.css'

function Navbar(){
    return (
        <nav className={styles.navbar}>
            <div>
                <h1>Jade Vine</h1>
                <h2>Para Mulheres Meninas</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Entrar</Link>
                </li>
                <li>
                    <Link to="/register">Cadastrar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar