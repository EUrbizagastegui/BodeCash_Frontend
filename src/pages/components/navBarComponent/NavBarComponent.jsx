import './NavBarComponent.css'
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const NavBarComponent = () => {
    const navegar = useNavigate()

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => navegar('/shopkeeper-home')
        },
        {
            label: 'Crear crédito',
            icon: 'pi pi-fw pi-file',
            command: () => navegar('/crear-credito')
        }
    ]

    return (
        <div className='nav'>
            <Menubar model={items}  />
        </div>
    )
}

export default NavBarComponent