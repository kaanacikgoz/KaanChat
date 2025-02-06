import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Chat from '../pages/Chat';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path='/chat' element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>      
    ) 
}

export default AppRoutes;