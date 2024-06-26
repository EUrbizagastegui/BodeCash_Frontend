import './ClientHome.css'
import ClientNavBarComponent from '../components/clientNavBarComponent/ClientNavbarComponent'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ClientHome = () => {
    const navigate = useNavigate()
    return (
        <div className="client-home">
            <div className='home-nav'>
                <ClientNavBarComponent />
            </div>
            <div className='home-body'>
                <div className="hb-center">
                    <h1>¡Bienvenido a Bodecash!</h1>
                    <p>¡En Bodecash, encontrarás herraminetas para poder facilitar créditos a tus clientese habituales!</p>
                    <h3>Nuestra misión</h3>
                    <p>Hacer que te sea más fácil obtener créditos en bodegas.</p>
                    <h3>Nuestra visión</h3>
                    <p>¡Lograr convertirnos en tu aplicación favorita para buscar créditos!</p>
                    <Button
                    label='Crear credito'
                    severity="secondary"
                    onClick={() => navigate('/crear-credito')}/>
                </div>
            </div>
        </div>
    )
}

export default ClientHome