import { useEffect, useState, useContext } from 'react';
import './App.css';
import AuthP from './pages/auth';
import NewOrderP from './pages/new_order';
import OrderHistoryP from './pages/order_history';
import Navbar from './components/navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserFromSession } from './utilities/user-functions';
import { AppContext } from './contexts/app_context';
import axios from 'axios';



function App() {

  let { user, setUser, setItems, setCart } = useContext(AppContext)
  const [callMade, setCallMade] = useState(false)


  useEffect( ()=> {
    const getSession = async () => {
      let userResponse = await getUserFromSession()
      setUser(userResponse)
    } 
      getSession()
      //this prevents the log in page being shown to a logged in user
    setTimeout(() => {
      setCallMade(true)
    }, 100)
      
    const getItems = async () => {
      let itemsResponse = await axios('/get_items')
      setItems(itemsResponse.data)
    }
    getItems()

  },[])

  useEffect(()=>{
    const getCart = async () => {
    if(user){
      let response = await axios({
        method: 'GET',
        url: "/get_cart"
      })
      console.log(response);
      setCart(response.data)
    }
  }
  getCart()
  },[user])
  
  const returnPage = () => {
    if (callMade) {
      return( <>
      { user ? 
        <div className="appPage">
          <Navbar/>
          <Routes>
            <Route path="/orders" element={<OrderHistoryP/>}/>
            <Route path="/orders/new" element={<NewOrderP/>}/>
            <Route path="/*" element={<Navigate to="/orders/new" />}/>
          </Routes>
        </div>
        :
        <AuthP/>  
      }
    </>)
    } else {
      return (<div>loading...</div>)
    }
  }

  return (
   <div className="App">
      { returnPage() }
   </div>
  );
}

export default App;
