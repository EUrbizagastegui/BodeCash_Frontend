import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/signIn/SignIn';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />

                <Route path="/" element={<Navigate to="/sign-in" />} />
                <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter