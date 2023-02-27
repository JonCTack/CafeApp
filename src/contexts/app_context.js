import {useState, createContext} from 'react';

export const AppContext = createContext();


const AppContextProvide = (props) => {

    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Sandwiches');
    const [cart, setCart] = useState({})
    

    return (
        <AppContext.Provider value={{
            user, setUser,
            items, setItems,
            activeCategory, setActiveCategory,
            cart, setCart,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvide;