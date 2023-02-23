import {useState, createContext} from 'react';

export const AppContext = createContext();


const AppContextProvide = (props) => {

    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{
            user,
            setUser,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvide;