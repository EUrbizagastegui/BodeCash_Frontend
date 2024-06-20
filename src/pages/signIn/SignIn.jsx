import './SignIn.css'
import { InputText } from 'primereact/inputtext';

export default function SignIn() {
    return (
        <div className="sign-in">
            <h1>Sign In</h1>
            <InputText type="text" className="p-inputtext-sm" placeholder="Small" />
            <InputText type="text" placeholder="Normal" />
            <InputText type="text" className="p-inputtext-lg" placeholder="Large" />
        </div>
    )
}