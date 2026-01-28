import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // { username, role, token }

    // Load user from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("loggedinuser");
        const role = localStorage.getItem("userrole");

        if (token && username && role) {
            setUser({ token, username, role });
        }
    }, []);

    // Login function
    const login = ({ token, username, role }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("loggedinuser", username);
        localStorage.setItem("userrole", role);
        setUser({ token, username, role });
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("userrole");
        setUser(null);
        navigate("/login");
    };

    const isLoggedIn = !!user?.token;

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
