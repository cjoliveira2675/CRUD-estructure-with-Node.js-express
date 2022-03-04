import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const { setFlashMessage } = useFlashMessage()

    async function register(user) {

        let msgText = ''
        let msgType = ''

        try {
            const data = await api.post('/users/register', user).then((response) => {
                msgText = 'Cadastro realizado com sucesso!'
                msgType = 'success'
                return response.data
            })
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)

        if (msgType == 'success') {
            setTimeout(() => {
                window.location.reload()
            }, 3050);
        }
    }
    return { register }
}