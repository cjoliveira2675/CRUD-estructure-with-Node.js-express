import React, { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext();

function UserProvider({ children }) {
    const { authenticated, register, logout, login, updateUser} = useAuth();
    return (
        <Context.Provider
            value={{ authenticated, register, logout, login, updateUser }}
        >
            {children}
        </Context.Provider>
    );
}

export { Context, UserProvider };