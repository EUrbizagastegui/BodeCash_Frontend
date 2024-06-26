import './SignUp.css'
import bodecashService from '../../shared/services/bodecash-service';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const SignUp = () => {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('')
    const [DNI, setDNI] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [isBoeguero, setIsBoeguero] = useState(false)
    const [store, setStore] = useState('')

    const activateBodeguero = () => {
        setIsBoeguero(true)
    }

    const deactivateBodeguero = () => {
        setIsBoeguero(false)
    }

    const register = async () => {
        if (nombre === '' || DNI === 0 || email === '' || password === '' || repetirPassword === '') {
            alert('Por favor, complete todos los campos.')
            return;
        } else if (password !== repetirPassword) {
            alert('Las contraseñas no coinciden.')
            return;
        } else if (isBoeguero && store === '') {
            alert('Por favor llene la tienda del bodeguero.')
            return;
        }

        try {
            if (isBoeguero) {
                const dataShopkeeper = {
                    "name": nombre,
                    "email": email,
                    "password": password,
                    "dni": DNI,
                    "userType": "SHOPKEEPER",
                    "store": store
                }

                const response = await bodecashService.createShopkeeper(dataShopkeeper)
                alert('Cuenta creada')
                navigate('/sign-in')
            } else {
                const dataClient = {
                    "name": nombre,
                    "email": email,
                    "password": password,
                    "dni": DNI,
                    "userType": "CLIENT"
                }
    
                const response = await bodecashService.createClient(dataClient)
                alert('Cuenta creada')
                navigate('/sign-in')

            }
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            register()
        }
    }

    return (
        <div className="sign-up">
            <div className='su-body'>
                <div className="sub-title">
                    <h1>Crea tu cuenta</h1>
                </div>
                <p>¿Ya tienes una cuenta? <a href='/sign-in'>Inicia sesión</a></p>
                <div className="su-header">
                    <Button label='Cliente' onClick={deactivateBodeguero} />
                    <Button label='Bodeguero' onClick={activateBodeguero} />
                </div>
                <label htmlFor="nombre">Nombre</label>
                <InputText
                id='nombre'
                placeholder='Nombre'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
                <label htmlFor="dni">DNI</label>
                <InputText
                id='dni'
                placeholder='DNI'
                keyfilter="pnum"
                value={DNI}
                onChange={e => setDNI(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <InputText
                id='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="contraseña">Contraseña</label>
                <InputText
                id='contraseña'
                placeholder='Contraseña'
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="repetir-contraseña">Repetir contraseña</label>
                <InputText
                id='repetir-contraseña'
                placeholder='Repetir contraseña'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
                />
                {isBoeguero &&
                <div className='su-store'>
                    <label htmlFor="store">Tienda</label>
                    <InputText
                    id='store'
                    placeholder='Tienda'
                    value={store}
                    onChange={e => setStore(e.target.value)}
                    />
                </div>}
                <Button
                label='Registrarse'
                onClick={register}
                onKeyDown={handleEnter}
                />
            </div>
        </div>
    )
}

export default SignUp