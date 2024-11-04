/* eslint-disable no-unused-vars */
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import India from "@react-map/india";

const IndiaMap = () => {
    const toast = (sc) => {
        toast(sc);
      };
    
  return (
    <div>
       <India
         onSelect={toast} 
          size={600} 
          hoverColor="orange" 
           type = 'select-single'
           />
        <ToastContainer />
        <select>
            <option value="select option">Select Option</option>
       <option value="SentToHome">Patients Sent to home</option>
      <option value="CurrentlyPresent">Currently present in NGO</option>
        </select>
    </div>
  )
}

export default IndiaMap
