import React from "react";
import { useCart } from "../Context/CartContext";

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty.</p>
            ) : (
                cart.map(item => (
                    <div key={item._id} className="cart-item">
                        <img src={item.image} alt={item.name} width="50" />
                        <h3>{item.name}</h3>
                        <p>₹{item.price} x {item.quantity}</p>
                        <button onClick={() => removeFromCart(item)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
