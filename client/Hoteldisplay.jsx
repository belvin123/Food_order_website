import React, { useContext } from 'react'
import '../Styles/HotelDisplay.css'
import { StoreContext } from '../Context/StoreContext'
import { hotels } from '../assets/assets'
import HotelDetails from './HotelDetails'
export const Hoteldisplay = ({category}) => {
    const {Hotels}=useContext(StoreContext)
  return (
    <div className='hotel-display' id='hotel-display'>
        <h2>Top Restaurants near you</h2>
        <div className='hotel-display-list'>
            {hotels.map((item,index)=>{
              if(category==="All" || category===item.category){
                return <HotelDetails key={index} hotel_name={item.hotel_name} hotel_desc={item.hotel_desc} hotel_image={item.hotel_image}/>
              }
                
            })}
        </div>
    </div>
  )
}

export default Hoteldisplay
