import React from "react";
import '../Styles/HotelDetails.css'
import { useNavigate } from "react-router-dom";

const HotelDetails = ({hotel_name,hotel_desc,hotel_image}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/food-list/${encodeURIComponent(hotel_name)}`);
  };
  return (
    <div className="hotel_det" onClick={handleClick} style={{ cursor: "pointer" }}>
        <div className="hotel-det-img-container">
            <img className="hotel-det-image" src={hotel_image} alt=""/>
        </div>
        <div className="hotel-det-info">
            <div className="hotel-det-desc">
                <p>{hotel_name}</p>
                <p className="hotel-desc">{hotel_desc}</p>
            </div>
        </div>
    </div>
  )
}

export default HotelDetails
