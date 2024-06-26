import './ClientNavbarComponent.css'
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const ClientNavBarComponent = () => {
    const navegar = useNavigate()

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => navegar('/client-home')
        },
        {
            label: 'Pagar crédito',
            icon: 'pi pi-fw pi-file',
            command: () => navegar('/pagar-credito')
        }
    ]

    return (
        <div className='nav'>
            <Menubar model={items}  />
        </div>
    )
}

export default ClientNavBarComponent