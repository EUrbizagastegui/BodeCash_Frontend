import './SignIn.css'
import LabelInput from '../../components/labelInput/LabelInput'
import { useState } from 'react'

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailProps = {
        type: "text",
        label: "Email",
        value: email,
        setValue: setEmail
    }
    const passwordProps = {
        type: "password",
        label: "Password",
        value: password,
        setValue: setPassword
    }

    return (
        <div className="sign-in">
            <div className='si-left'>
                <div className='margin-body'>
                    <h1>Bienvenido a BodeCash!</h1>
                    <p>Inicie sesión o regístrese para disfrutar de nuestro servicio de gestión de créditos.</p>
                </div>
            </div>
            <div className="si-right">
                <h1>Sign In</h1>
                <LabelInput props={emailProps} />
                <LabelInput props={passwordProps} />
            </div>
        </div>
    )
}