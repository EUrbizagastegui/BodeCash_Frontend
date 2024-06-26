import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/signIn/SignIn';
import ClientHome from '../pages/clientHome/ClientHome';
import ShopkeeperHome from '../pages/shopkeeperhome/ShopkeeperHome';
import SignUp from '../pages/signUp/Signup';
import CrearCredito from '../pages/crearCredito/CrearCredito';
import PagarCredito from '../pages/pagarCredito/PagarCredito';
import BuyProduct from '../pages/buyProduct/BuyProduct';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/client-home" element={<ClientHome />} />
                <Route path="/shopkeeper-home" element={<ShopkeeperHome />} />
                <Route path="/crear-credito" element={<CrearCredito />} />
                <Route path="/pagar-credito" element={<PagarCredito />} />
                <Route path="/buy-product" element={<BuyProduct />} />

                <Route path="/" element={<Navigate to="/sign-in" />} />
                <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter