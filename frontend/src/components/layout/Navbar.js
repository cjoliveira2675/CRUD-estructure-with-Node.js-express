import {Link} from 'react-router-dom'
import { useContext } from 'react'
import styles from './Navbar.module.css'

import {Context} from '../../context/UserContext'

function Navbar(){
    const {authenticated, logout} = useContext(Context)

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
                {authenticated ? (
                <>
                    <li><Link to="/user/profile">Perfil</Link></li>
                    <li onClick={logout}>Sair</li>
                </>
                ) : ( 
                <>
                <li>
                    <Link to="/login">Entrar</Link>
                </li>
                <li>
                    <Link to="/register">Cadastrar</Link>
                </li>
                </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar