import React from 'react';

export const AppContext = React.createContext();

export const AppContextProvider = ({ value, children }) => {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
