import React, { useState, useCallback } from "react";
import "../Styles/HotelDetails.css";
import { food_list } from "../assets/assets";
import { FoodCard } from "./Cards";

export const FoodList = () => {
  const [itemCounts, setItemCounts] = useState({});
  const [cart, setCart] = useState([]); // Cart state

  // Function to add or increase an item in the cart
  const increaseCount = useCallback((food) => {
    setItemCounts((prev) => ({
      ...prev,
      [food._id]: (prev[food._id] || 0) + 1,
    }));

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === food._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  }, []);

  // Function to decrease an item count
  const decreaseCount = useCallback((food) => {
    setItemCounts((prev) => ({
      ...prev,
      [food._id]: Math.max((prev[food._id] || 0) - 1, 0),
    }));

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === food._id);
      if (existingItem?.quantity === 1) {
        return prevCart.filter((item) => item._id !== food._id);
      } else {
        return prevCart.map((item) =>
          item._id === food._id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  }, []);

  return (
    <div className="food-list-container">
      {food_list?.map((food) => (
        <FoodCard
          key={food?._id}
          food={food}
          itemCount={itemCounts[food?._id] || 0}
          increaseCount={() => increaseCount(food)}
          decreaseCount={() => decreaseCount(food)}
        />
      ))}
      {cart.length > 0 && (
        <div className="cart-container">
          <h2>Cart</h2>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <p>{item.name} x {item.quantity}</p>
              <p>₹ {item.price * item.quantity}</p>
            </div>
          ))}
          <p><strong>Total: ₹ {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</strong></p>
        </div>
      )}
    </div>
  );
};
