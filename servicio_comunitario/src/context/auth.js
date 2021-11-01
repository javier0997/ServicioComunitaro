import React, { useEffect, useState } from "react";
import firebase from 'firebase/app'

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user)
            setUser(user);
            setShowChild(true);
        });
    }, []);

    if (!showChild) {
        return <p>Loading</p>;
    } else {
        return (
            <Auth.Provider
                value={{
                    user
                }}
            >
                {children}
            </Auth.Provider>
        );
    }
};