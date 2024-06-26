import './PagarCredito.css'
import ClientNavBarComponent from '../components/clientNavBarComponent/ClientNavbarComponent'
import BodecashService from '../../shared/services/bodecash-service';
import { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate y useLocation

const PagarCredito = () => {
    let credit = {}
    let installmentPlan = {}
    const [currentIPPayment, setCurrentIPPayment] = useState({})
    const [normalPurchase, setNormalPurchase] = useState({})
    let creditType = ''
    const navigate = useNavigate(); // Hook para navegación
    const location = useLocation(); // Hook para obtener la ubicación actual

    const getCredit = async () => {
        const response = await BodecashService.getCreditByClientId(Number(localStorage.getItem('clientId')));
        console.log("Credit: ", response.data[0]);
        creditType = response.data[0].type
        credit = response.data[0];
    }

    const getInstallmentPlan = async () => {
        const response = await BodecashService.getInstallmentplanByCreditId(credit.id);
        console.log("Installment Plan: ", response.data[0]);
        installmentPlan = response.data[0];
    }

    const getNormalPurchase = async () => {
        const response = await BodecashService.getNormalPurchaseByCreditId(credit.id);
        console.log("Normal Purchase: ", response.data[0]);
        setNormalPurchase(response.data[0]);
    }

    const getCurrentIPPayment = async () => {
        await getCredit();

        if (creditType === 'PP') {
            await getInstallmentPlan();
        
            const response = await BodecashService.getIPPaymentByInstallmentPlanIdAndPosition(installmentPlan.id, installmentPlan.currentTerm);
            console.log("Current IP Payment: ", response.data);
            setCurrentIPPayment(response.data);
        } else {
            await getNormalPurchase();
        }
    }

    useEffect(() => {
        getCurrentIPPayment();
    }, [])

    const handleComprarClick = () => {
        // Navegar a BuyProduct y pasar normalPurchase.Id en el estado de location
        navigate('/buy-product', { state: { normalPurchaseId: normalPurchase.id } });
    }

    return (
        <div className="pagar-credito">
            <div className='home-nav'>
                <ClientNavBarComponent />
            </div>
            <div className='payment-details'>
                <h2>Detalles del Pago</h2>
                {currentIPPayment && (
                    <div className='payment-card'>
                        <p>Cuota: <span>{currentIPPayment.fee}</span></p>
                        <p>Estado: <span>{currentIPPayment.isPaid ? 'Pagado' : 'No Pagado'}</span></p>
                        <p>Fecha de Vencimiento: <span>{new Date(currentIPPayment.dueDate).toLocaleDateString()}</span></p>
                        <p>Días Pasados desde la Fecha de Cobro: <span>{currentIPPayment.daysPastDue}</span></p>
                        <Button onClick={handleComprarClick}>Comprar</Button>
                        <Button>Pagar</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PagarCredito
