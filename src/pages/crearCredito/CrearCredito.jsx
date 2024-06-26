import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import NavBarComponent from '../components/navBarComponent/NavBarComponent'
import { InputSwitch } from 'primereact/inputswitch';
import BodecashService from '../../shared/services/bodecash-service';
import './CrearCredito.css';

const CrearCredito = () => {
    const [isPP, setIsPP] = useState(false);
    const [interestRate, setInterestRate] = useState(0);
    const [interestType, setInterestType] = useState('');
    const [capitalization, setCapitalization] = useState('');
    const [penaltyInterestRate, setPenaltyInterestRate] = useState(0);
    const [type, setType] = useState('');
    const [creditAmount, setCreditAmount] = useState(0);
    const [usedCredit, setUsedCredit] = useState(0);
    const [remainingCredit, setRemainingCredit] = useState(0);
    const [isPG, setIsPG] = useState(false);
    const [pgType, setPgType] = useState('');
    const [totalTerms, setTotalTerms] = useState(null);
    const [pgTerms, setPgTerms] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [opcionesDropdown, setOpcionesDropdown] = useState([]);

    let contadorPP = 1;
    let contadorPG = 1;
    let capital = creditAmount;
    let saldoInicial = creditAmount;
    let interes = 0;
    let cuota = 0;
    let amortizacion = 0;
    let dueDate = null;
    let IPPayments = []

    const interestTypes = [
        { label: 'TED14', value: 'TED14' },
        { label: 'TND14', value: 'TND14' }
    ];

    const TNTypes = [
        { label: 'Diaria', value: 'D' }
    ];

    const pgTypes = [
        { label: 'Parcial', value: 'P' },
        { label: 'Total', value: 'T' }
    ];

    const ttTypes = [
        { label: '2 semanas', value: 2 }
    ]

    const getCurrentDateTime = () => {
        const now = new Date();
        const isoDateTime = now.toISOString();
        return isoDateTime;
    };

    const calculateDueDate = () => {
        // Obtener la fecha y hora actual
        const currentDateTime = new Date();
    
        // Calcular la fecha actual más 14 días
        const dueDate = new Date(currentDateTime.getTime() + (14 * 24 * 60 * 60 * 1000));
    
        // Convertir la fecha a formato ISO 8601
        const dueDateISO = dueDate.toISOString();
    
        return dueDateISO;
    };

    const sendIPPayments = async (iPPayments) => {
        for (let i = 0; i < iPPayments.length; i++) {
            await BodecashService.createIPPayment(IPPayments[i])
        }
    }

    const calcularPlanDePagos = (fechaInicio, installmentPlanId) => {
        if(contadorPP > totalTerms) {
            contadorPP = 0
            console.log("IPPayments:", IPPayments)
            sendIPPayments(IPPayments)
            return
        }

        if (interestType === 'TND14') {
            setInterestRate(prev => (((1 + (prev / 100) / 14) ** 14) - 1) * 100)
            console.log("interestRate:", interestRate)
        }

        if (isPG && contadorPG <= pgTerms) {
            if (pgType === 'P') {
                saldoInicial = capital
                interes = saldoInicial * interestRate / 100
                cuota = interes
                amortizacion = 0
                capital = saldoInicial - amortizacion
            } else {
                saldoInicial = capital
                interes = saldoInicial * interestRate / 100
                cuota = 0
                amortizacion = 0
                capital = interes + saldoInicial
            }
            contadorPG++;
        } else {
            saldoInicial = capital
            interes = saldoInicial * interestRate / 100
            cuota = saldoInicial * (interestRate / 100 / (1 - (1 + interestRate / 100) ** (-(Number(totalTerms) - Number(pgTerms)))))
            amortizacion = cuota - interes
            capital -= amortizacion
        }

        let dueDate = new Date(fechaInicio);
        dueDate.setDate(dueDate.getDate() + 7 * (contadorPP - 1));
        const dueDateString = dueDate.toISOString();

        IPPayments.push({
            "capital": capital,
            "interest": interes,
            "fee": cuota,
            "amortization": amortizacion,
            "saldoInicial": saldoInicial,
            "dueDate": dueDateString,
            "isPaid": false,
            "daysPastDue": 0,
            "paymentDate": null,
            "installmentPlanId": installmentPlanId
        })

        contadorPP++;
        calcularPlanDePagos(dueDateString, installmentPlanId)
    }

    const ejecutarCrearCredito = async () => {
        if (isPP) {
            try {
                const fee = (creditAmount * interestRate / 100) / (1 - (1 + interestRate / 100)**(-totalTerms))
                const data = {
                    "fee": fee,
                    "isGracePeriod": isPG,
                    "gracePeriodType": pgType,
                    "gracePeriodPeriods": pgTerms,
                    "totalTerm": totalTerms,
                    "paymentTimeType": "SEMANAL",
                    "currentTerm": 1,
                    "interestRate": interestRate/100,
                    "interestType": interestType,
                    "capitalization": capitalization,
                    "penaltyInterestRate": penaltyInterestRate/100,
                    "disbursementDate": getCurrentDateTime(),
                    "type": "PP",
                    "creditAmount": creditAmount,
                    "usedCredit": 0,
                    "remainingCredit": creditAmount,
                    "isCreditPayed": false,
                    "shopkeeperId": Number(localStorage.getItem('shopkeeperId')),
                    "clientId": Number(selectedOption)
                }

                console.log("Creando credito: ", data)

                const response = await BodecashService.createInstallmentPlan(data)

                console.log("Credito creado con exito: ", response)

                calcularPlanDePagos(getCurrentDateTime(), response.data.id)
            } catch (error) {
                alert("Ocurrio un error al crear el credito. Puede que el cliente tenga otro crédito que aun no haya pagado.")
                console.log("Ocurrióe un error al crear el credito: ", error)
            }
        } else {
            try {
                const data = {
                    "amountDue": 0,
                    "dueDate": calculateDueDate(),
                    "paymentDate": null,
                    "isPaid": false,
                    "daysPastDue": 0,
                    "interestRate": interestRate / 100,
                    "interestType": interestType,
                    "capitalization": capitalization,
                    "penaltyInterestRate": penaltyInterestRate / 100,
                    "disbursementDate": getCurrentDateTime(),
                    "type": "PO",
                    "creditAmount": creditAmount,
                    "usedCredit": 0,
                    "remainingCredit": creditAmount,
                    "isCreditPayed": false,
                    "shopkeeperId": Number(localStorage.getItem('shopkeeperId')),
                    "clientId": Number(selectedOption)
                }

                console.log("Creando credito: ", data)
                const response = await BodecashService.createNormalPurchase(data)

                console.log("Credito creado con exito: ", response)
                alert("Credito creado con exito")
            } catch (error) {
                alert("Ocurrio un error al crear el credito. Puede que el cliente tenga otro credito que aun no haya pagado.")
                console.log("Ocurrio un error al crear el credito: ", error)
            }
        }
    }

    const obtenerClientesYConstruirDropdown = async () => {
        try {
            // Llamar al endpoint que devuelve todos los clientes
            const response = await BodecashService.getAllClients();
    
            // Array para almacenar las opciones del dropdown
            let opcionesDropdown = [];
    
            // Iterar sobre cada cliente
            for (const cliente of response.data) {
                // Obtener los datos personales del cliente por personalDataId
                const personalDataResponse = await BodecashService.getPersonalDataById(cliente.personalDataId);
    
                // Construir objeto para la opción del dropdown
                const opcion = {
                    label: personalDataResponse.data.name,
                    value: cliente.id
                };
    
                // Agregar la opción al array de opciones del dropdown
                opcionesDropdown.push(opcion);
            }
    
            // Aquí opcionesDropdown contendrá todas las opciones para el dropdown
            console.log(opcionesDropdown);
            
            // Guardar opcionesDropdown en el estado o donde necesites utilizarlo
            setOpcionesDropdown(opcionesDropdown); // Ejemplo: usando useState
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            showToast('error', 'Error', 'Error al obtener clientes');
        }
    }


    useEffect(() => {
        obtenerClientesYConstruirDropdown();
    }, []);

    useEffect(() => {
        // Actualizar min y max de pgTerms cuando totalTerms cambie
        if (totalTerms !== null && totalTerms !== undefined) {
            setPgTerms(Math.min(pgTerms, totalTerms - 1)); // Ajustar pgTerms si supera el nuevo límite
        }
    }, [totalTerms]);

    return (
        <div className="crear-credito">
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className='cc-center'>
                <h1>Crear Crédito</h1>
                <div className="p-fluid">
                    <div className="isPP">
                        <InputSwitch id="isPP" checked={isPP} onChange={(e) => setIsPP(e.value)} />
                        <label htmlFor="isPP">Plan de pagos</label>
                    </div>
                    <label htmlFor="clients">Cliente</label>
                    <div className='p-field'>
                        <Dropdown 
                            id="clients"
                            optionLabel="label" // Propiedad para indicar cuál es la etiqueta que se mostrará en el dropdown
                            optionValue="value" // Propiedad para indicar cuál es el valor que se asocia a cada opción
                            value={selectedOption} // Estado que maneja la opción seleccionada (opcional)
                            options={opcionesDropdown} // Array de opciones para el dropdown
                            onChange={(e) => setSelectedOption(e.value)} // Manejador para el cambio de opción seleccionada (opcional)
                            placeholder="Selecciona un cliente" // Texto que se muestra cuando no hay ninguna opción seleccionada
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="interestRate">Tasa de interés</label>
                        <InputNumber 
                            id="interestRate"
                            value={interestRate} 
                            onValueChange={(e) => setInterestRate(e.value)}
                            min={1}
                            max={3}
                            minFractionDigits={1}
                            maxFractionDigits={7}
                            step={0.1}
                            suffix=" %"
                            showButtons
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="interestType">Tipo de interés</label>
                        <Dropdown id="interestType" value={interestType} options={interestTypes} onChange={(e) => setInterestType(e.value)} placeholder="Selecciona el tipo de tasa de interés" />
                    </div>
                    {interestType === 'TND14' &&
                        <div className="p-field">
                            <label htmlFor="capitalization">Capitalización</label>
                            <Dropdown id="capitalization" value={capitalization} options={TNTypes} onChange={(e) => setCapitalization(e.target.value)} />
                        </div>
                    }
                    <div className="p-field">
                        <label htmlFor="penaltyInterestRate">Tasa moratoria</label>
                        <InputNumber 
                            id='penaltyInterestRate'
                            value={penaltyInterestRate}
                            onValueChange={(e) => setPenaltyInterestRate(e.value)}
                            min={interestRate}
                            max={interestRate * 2}
                            minFractionDigits={1}
                            maxFractionDigits={7}
                            step={0.1}
                            suffix=" %"
                            showButtons
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="creditAmount">Valor del crédito</label>
                        <InputNumber 
                            id="creditAmount"
                            value={creditAmount} 
                            onValueChange={(e) => setCreditAmount(e.value)}
                            min={30}
                            max={300}
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            prefix="S/ "
                        />
                    </div>
                    {isPP && 
                        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1em'}}>
                            <div className="isPP">
                                <InputSwitch id="isPG" checked={isPG} onChange={(e) => setIsPG(e.value)} />
                                <label htmlFor="isPG">Periodo de gracia</label>
                            </div>
                            {isPG &&
                            <div className="isPG">
                                <label htmlFor="totalTerm">Plazos totales</label>
                                <Dropdown id="totalTerm" value={totalTerms} options={ttTypes} onChange={(e) => setTotalTerms(e.value)} placeholder="Selecciona el total de plazos" />
                                <label htmlFor="pgType">Tipo de periodo de gracia</label>
                                <Dropdown id="pgType" value={pgType} options={pgTypes} onChange={(e) => setPgType(e.value)} placeholder="Selecciona el tipo de periodo de gracia" />
                                <label htmlFor="pgTerms">Plazos del periodo de gracia</label>
                                <InputNumber 
                                    id="pgTerms"
                                    value={pgTerms}
                                    onValueChange={(e) => { setPgTerms(e.value) }}
                                    min={totalTerms !== null && totalTerms !== undefined ? 1 : undefined}
                                    max={totalTerms !== null && totalTerms !== undefined ? totalTerms - 1 : undefined}
                                    step={1}
                                    showButtons
                                    disabled={totalTerms === null || totalTerms === undefined}
                                />
                            </div>
                            }
                        </div>
                    }
                    <div className="p-field">
                        <Button label="Submit" onClick={ejecutarCrearCredito} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearCredito;
