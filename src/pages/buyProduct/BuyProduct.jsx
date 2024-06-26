import './BuyProduct.css';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import ClientNavBarComponent from '../components/clientNavBarComponent/ClientNavbarComponent';
import BodecashService from '../../shared/services/bodecash-service';

const BuyProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        quantity: 0,
        value: 0,
        npPurchaseId: 0
    });

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setProductData({ ...productData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await BodecashService.createNPPurchase(productData);
            console.log('Product purchase created:', response.data); // Handle success response
            // Optionally, reset form or show success message
        } catch (error) {
            console.error('Error creating product purchase:', error); // Handle error
        }
    };

    useEffect(() => {
        // Obtener normalPurchaseId del estado de location al cargar el componente
        if (location.state && location.state.normalPurchaseId) {
            setProductData(prevData => ({
                ...prevData,
                npPurchaseId: location.state.normalPurchaseId
            }));
        }
    }, [location.state]);

    return (
        <div className='buy-product'>
            <div className='home-nav'>
                <ClientNavBarComponent />
            </div>
            <div className='product-form'>
                <h2>Comprar Producto</h2>
                    <label htmlFor='name'>Nombre del Producto</label>
                    <InputText id='name' value={productData.name} onChange={(e) => handleInputChange(e, 'name')} />
                    <label htmlFor='quantity'>Cantidad</label>
                    <InputNumber id='quantity' value={productData.quantity} onValueChange={(e) => handleInputChange(e, 'quantity')} mode='decimal' />
                    <label htmlFor='value'>Valor</label>
                    <InputNumber id='value' value={productData.value} onValueChange={(e) => handleInputChange(e, 'value')} mode='currency' currency="USD" locale="en-US" />
                <Button label='Comprar' onClick={handleSubmit} />
            </div>
        </div>
    );
}

export default BuyProduct;
