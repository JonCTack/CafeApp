import {useState, createContext} from 'react';

export const AppContext = createContext();


const AppContextProvide = (props) => {

    const [user, setUser] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Sandwiches')

    return (
        <AppContext.Provider value={{
            user, setUser,
            activeCategory, setActiveCategory
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvide;