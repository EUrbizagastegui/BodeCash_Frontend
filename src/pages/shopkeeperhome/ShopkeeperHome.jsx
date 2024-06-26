import './ShopkeeperHome.css'
import NavBarComponent from '../components/navBarComponent/NavBarComponent'
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ShopkeeperHome = () => {
    const navigate = useNavigate()
    return (
        <div className="home">
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className='home-body'>
                <div className="hb-center">
                    <h1>¡Bienvenido a Bodecash!</h1>
                    <p>¡En Bodecash, encontrarás herraminetas para poder facilitar créditos a tus clientese habituales!</p>
                    <h3>Nuestra misión</h3>
                    <p>Hacer que brindar créditos a tus clientes sea un acto de amor propio.</p>
                    <h3>Nuestra visión</h3>
                    <p>Brindar a tus clientes la mejor experiencia de credito.</p>
                    <Button
                    label='Crear credito'
                    severity="secondary"
                    onClick={() => navigate('/crear-credito')}/>
                </div>
            </div>
        </div>
    )
}

export default ShopkeeperHome