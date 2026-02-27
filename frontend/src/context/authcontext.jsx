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
        const id = localStorage.getItem("userid");

        if (token && username && role) {
            setUser({ token, id, username, role });
        }
    }, []);

    // Login function
   const login = ({ token, userData }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userData._id);
    localStorage.setItem("loggedinuser", userData.name);
    localStorage.setItem("userrole", userData.role);

    setUser({
        token,
        _id: userData._id,
        username: userData.name,
        role: userData.role
    });
};

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("userrole");
        setUser(null);
        navigate("/");
    };

    const isLoggedIn = !!user?.token;

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
