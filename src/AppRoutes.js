// src/App.js
import {useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {AuthContext} from './contexts/AuthContext';
import Login from './components/Auth/LoginForm';
import Register from './components/Auth/RegisterForm';
import AdminPanel from './components/Admin/AdminPanel';
import FeedbackList from './components/Feedback/FeedbackList';
import SingleFeedback from "./components/Feedback/FeedbackSingle";
import Header from "./components/Header";

function AppRoutes() {
    const {isAuthenticated, user} = useContext(AuthContext);

    return (

        <Router>
            {user && isAuthenticated && <Header/>}
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                {user && isAuthenticated ? (
                    <>
                        <Route path="/feedback/:id" element={<SingleFeedback/>}/>
                        <Route path="/" element={user.is_admin ? <Navigate to="/admin"/> : <FeedbackList/>}/>

                        {user.is_admin && (
                            <Route path="/admin" element={<AdminPanel/>}/>
                        )}
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Login />}/>
                        <Route path="/login" element={<Navigate to="/"/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
