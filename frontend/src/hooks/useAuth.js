import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()
    //const ctrl = 20000;

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {

        let msgText = ''
        let msgType = ''

        try {
            const data = await api.post('/users/register', user).then((response) => {
                msgText = 'Cadastro realizado com sucesso!'
                msgType = 'success'
                return response.data
            })
            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

        if (msgType === 'success') {
            setTimeout(() => {
                navigate('/')
            }, 750);
        }
    }

    async function login(user) {
        let msgText = 'Logado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        if (msgType === 'success') {
            setTimeout(() => {
                navigate('/')
            }, 50);
        }
        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {

        setAuthenticated(true)
        sessionStorage.setItem('token', JSON.stringify(data.token))
    }

    function logout() {
        let msgText = 'Logout realizado com sucesso!'
        let msgType = 'success'

        setAuthenticated(false)
        sessionStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)

    }

    async function updateUser(user) {
        let msgText = ''
        let msgType = ''

        try {
            await api.patch('/users/edit/:id', user).then((response) => {
                msgText = 'Cadastro atualizado com sucesso!'
                msgType = 'success'
                return response.data
            })
            //await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

        if (msgType === 'success') {
            setTimeout(() => {
                window.location.reload()
            }, 750);
        }
    }

    return { authenticated, register, logout, login, updateUser }
}