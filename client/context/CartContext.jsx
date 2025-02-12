import { createContext, useContext, useState } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (foodItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item._id === foodItem._id);
            if (existingItem) {
                return prevCart.map(item =>
                    item._id === foodItem._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...foodItem, quantity: 1 }];
        });
    };
    const removeFromCart = (foodItem) => {
        setCart(prevCart => prevCart.filter(item => item._id !== foodItem._id));
    };
    const clearCart = () => {
        setCart([]);
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => {
    return useContext(CartContext);
};
