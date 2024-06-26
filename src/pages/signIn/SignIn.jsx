import './SignIn.css'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import bodecashService from '../../shared/services/bodecash-service';

const SignIn = () => {
    const navegar = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useRef(null);

    const showToast = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail});
    }

    const signIn = async () => {
        if (email === '' || password === '') {
            showToast('error', 'Error', 'Por favor ingrese su email y contraseña.')
            return;
        }

        const data = {
            "email": email,
            "password": password
        }

        try {
            const response = await bodecashService.verifyCredentials(data)
            if (response.data.userType === 'CLIENT') {
                const personalDataId = response.data.id

                const clientResponse = await bodecashService.getclientByPersonalDataId(personalDataId)
                localStorage.setItem('clientId', JSON.stringify(clientResponse.data.id))

                navegar('/client-home')
            } else if (response.data.userType === 'SHOPKEEPER') {
                const personalDataId = response.data.id

                const shopkeeperResponse = await bodecashService.getShopkeeperByPersonalDataId(personalDataId)
                localStorage.setItem('shopkeeperId', JSON.stringify(shopkeeperResponse.data.id))

                navegar('/shopkeeper-home')
            }
        } catch (error) {
            showToast('error', 'Error', 'Credenciales incorrectas')
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            signIn()
        }
    }

    return (
        <div className="sign-in">
            <Toast ref={toast} />
            <div className='si-left'>
                <div className='sill'>
                    <h1>Bienvenido a Bodecash!</h1>
                    <p>Inicie sesión y disfrute de los beneficios de nuestra aplicación en su vida diaria.</p>
                </div>
            </div>
            <div className="si-right">
                <div className='sir-body'>
                    <label htmlFor="email">Email</label>
                    <InputText
                    id='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña</label>
                    <InputText
                    id='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                    label='Iniciar sesión'
                    onClick={signIn}
                    onKeyDown={handleEnter}
                    />
                    <p>¿No tienes una cuenta? <a href='/sign-up'>Registrate</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn