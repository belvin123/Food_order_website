import React, { useContext, useState } from 'react'
import '../Styles/Navbar.css'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext.jsx'
//import { DarkModeSwitch } from './DarkMode.jsx';

const Navbar = ({setShowLogin}) => {
  const [menu,setMenu]=useState("home"); //ippol use cheyyunna page kanan
  //const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

 /* useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);*/
  const {token,setToken}=useContext(StoreContext);
  return (
    <div className='navbar'>
      <ul className="navbar-menu">           
       <Link to='/'> <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li></Link>
        <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <div className='navbar-sign'>
       <Link to='/cart'> <img src={assets.basket_icon} alt=''/></Link>
        <div className="dot"></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
        :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt=''/>
            <ul className="nav-profile-dropdown">
                  <li>
                    <button className="dropdown-btn">View Profile</button>
                  </li>
                  <hr />
                  <li>
                    <button className="dropdown-btn-logout-btn" onClick={handleLogout}>Log Out</button>
                  </li>
                </ul>
          </div>}
        
    </div>
    </div>
  )
}

export default Navbar
