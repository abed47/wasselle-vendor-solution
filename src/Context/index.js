import React, {createContext, useState} from 'react';

export const MainContext = createContext({});

const MainContextProvider = (props) => {
    const [user, setUser] = useState({});

    return (
        <MainContext.Provider value={{user:[user, setUser]}}>
            {props.children}
        </MainContext.Provider>
    )

}

export default MainContextProvider;