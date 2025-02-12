import React, { useContext, useState } from "react";
import "../Styles/loginPopup.css";
import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import Axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [curState, setCurState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    phoneno: "",
    password: "",
    userType: "Customer", // Default to "Customer"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url + (curState === "Login" ? "/api/user/login" : "/api/user/signup");
console.log("new_url===",newUrl)
    try {
      const response = await Axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {curState !== "Login" && (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Enter your name"
                required
              />
              {/* Dropdown for user type selection */}
              <select name="userType" onChange={onChangeHandler} value={data.userType} className="styled-dropdown" required>
                <option value="Customer">Customer</option>
                <option value="Owner">Owner</option>
              </select>
            </>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter your E-mail"
            required
          />
          {curState === "Sign Up" && (
            <>
              <input
                name="address"
                onChange={onChangeHandler}
                value={data.address}
                type="text"
                placeholder="Enter your address"
                required
              />
              <input
                name="phoneno"
                onChange={onChangeHandler}
                value={data.phoneno}
                type="tel"
                placeholder="Enter your Phone no"
                required
              />
            </>
          )}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{curState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p> By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {curState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
