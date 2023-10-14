import { createContext, useState, useEffect } from 'react';
import {getUser, userLogout} from "../services/ApiService";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [commentState, setCommentState] = useState(null);
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            getUser().then((results) => {
                if(results.user)
                {
                    setIsAuthenticated(true);
                    setUser(results.user);
                    setCommentState(results.commentState)
                }
                else
                {
                    logout()
                }
            }).catch(e => {
                console.log({e})
                logout();
            })
        }
    }, []);

    const makeLogin = (user) => {
        setIsAuthenticated(true);
        setUser(user);
    };

    const updateCommentState = (commentState) => {
        setCommentState(commentState)
    }

    const logout = () => {
        userLogout().then(() => {
            localStorage.setItem('token', null);
        }).catch(e => {
            console.error(e)
        });
        localStorage.setItem('token', null)
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, makeLogin, logout, commentState, updateCommentState }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;
