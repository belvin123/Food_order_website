import { createContext, useState } from "react"
import { hotels } from "../assets/assets"
export const StoreContext=createContext(null)
const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:3000"
    const [token,setToken]=useState("")
    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
          if (!prev[itemId]) return prev; // If item doesn't exist, return unchanged cart
    
          const newCart = { ...prev };
          if (newCart[itemId] > 1) {
            newCart[itemId] -= 1; // Reduce quantity
          } else {
            delete newCart[itemId]; // Remove item if quantity reaches 0
          }
          return newCart;
        });
      };
    const contextValue={
            hotels,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            url,
            token,
            setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider