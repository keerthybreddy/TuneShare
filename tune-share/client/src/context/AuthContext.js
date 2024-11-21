import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";

// Create an AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AuthProvider component that will wrap your app and provide authentication data
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);  // Store logged-in user info here

    // Set the currentUser once when the component mounts
    useEffect(() => {
        // Check if there's a saved user in localStorage
        const savedUser = localStorage.getItem('currentUser');

        if (savedUser) {
            // Parse the saved user and set it to state
            setCurrentUser(JSON.parse(savedUser));
        } else {
            // Optionally set a default user or handle unauthenticated state
            //setCurrentUser({ username: 'yourUsernameHere' });  // Uncomment if you want a default user
        }

    }, []);  // Empty dependency array ensures this effect runs only once when the component mounts


    // Provide the currentUser and setCurrentUser function to the entire app
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
