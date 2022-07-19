import { useState, createContext, useEffect } from "react";
// import { onAuthStateChanged } from "@firebase/auth";
// import { auth } from "../configs/firebase";
// import APP from "../configs/app";
// import Loading from "../components/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    // const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const credentials = JSON.parse(localStorage.getItem("app-auth"));
        if (credentials && Object.keys(credentials) !== 0) {
            setUser(credentials);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
