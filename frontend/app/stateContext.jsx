import React, {createContext, useState} from 'react';

export const StateContext = createContext();    

export const StateProvider = ({children}) => {
    const [characterImg, setCharacterImg] = React.useState(null)
    return(
        <StateContext.Provider value={{characterImg, setCharacterImg}}>
            {children}
        </StateContext.Provider>
    )
}