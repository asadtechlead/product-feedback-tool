// src/components/Header.js
import React, { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext} from "../contexts/AuthContext";
import {userLogout} from "../services/ApiService";

const Header = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await userLogout();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">Home</Link>
                <button onClick={handleLogout} className="bg-grey-500 text-white px-4 py-2 rounded-lg">Logout ({user.name})</button>
            </div>
        </header>
    );
};

export default Header;
