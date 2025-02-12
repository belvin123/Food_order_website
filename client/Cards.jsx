import React from "react";
import "../Styles/Cards.css";
import { assets } from "../assets/assets";

export const FoodCard = ({ food, itemCount, increaseCount, decreaseCount }) => {
  return (
    <div className="food-det-new" style={{ cursor: "pointer" }}>
      <div className="food-det-img-container">
        <img className="food-det-image" src={food?.image} alt={food?.name || "Food"} />
      </div>

      <div className="food-det-info">
        <div className="food-row">
          <p className="food-name">{food?.name}</p>

          <div className="food-counter">
            {itemCount > 0 ? (
              <div className="food-item-counter">
                <img onClick={() => decreaseCount(food)} src={assets.remove_icon_red} alt="Remove" />
                <p>{itemCount}</p>
                <img onClick={() => increaseCount(food)} src={assets.add_icon_green} alt="Add" />
              </div>
            ) : (
              <img className="add" onClick={() => increaseCount(food)} src={assets.add_icon_white} alt="Add" />
            )}
          </div>
        </div>

        <p className="food-desc">{food?.description}</p>
        <div className="food-price">
          <img src={assets.rupees_image} alt="rupees symbol"/>
          <p>{food?.price}</p>
        </div>
      </div>
    </div>
  );
};
