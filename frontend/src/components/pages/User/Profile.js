import api from '../../../utils/api'

import { useState, useEffect, useContext } from 'react'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

import Input from '../../form/Input'
import { Context } from '../../../context/UserContext'


function Profile() {
    const [user, setUser] = useState({})
    const [token] = useState(sessionStorage.getItem('token') || '')
    const { updateUser } = useContext(Context)

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    function handleSubmit(e){
        e.preventDefault()
        updateUser(user)
    }
    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
            </div>
            <form className={formStyles.form_container} onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    value={user.name}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu Telefone"
                    handleOnChange={handleChange}
                    value={user.phone}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Escolha uma senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}
                />
                <input type='submit' value='Atualizar' />
            </form>
        </section>
    )
}

export default Profile