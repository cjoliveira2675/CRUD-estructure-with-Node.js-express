import { useContext, useState } from 'react'
import Input from "../../form/Input"
import { Link } from 'react-router-dom'

import styles from "../../form/Form.module.css"

import { Context } from '../../../context/UserContext'

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu Telefone"
                    handleOnChange={handleChange}
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
                <input type='submit' value='Enviar' />
            </form>
            <p>
                Já tem conta? <Link to="/login">Entrar</Link>
            </p>
        </section>
    )
}

export default Register