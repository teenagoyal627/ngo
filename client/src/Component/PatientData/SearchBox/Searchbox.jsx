/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import './Searchbox.css'; 
import axios from 'axios';

const Searchbox = ({setPatients}) => {
  const[searchTerm,setSearchTerm]=useState("")
 
  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const apiUrl = import.meta.env.VITE_SERVER_URL;

      const response = await axios.get(`${apiUrl}/search?q=${searchTerm}`);
      console.log(response)
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyPress=(e)=>{
    if(e.key==='Enter'){
      handleSearch(e);
    }
  }

  const handleChange=(e)=>{
    setSearchTerm(e.target.value)
  }
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Enter the value..." 
        className="search-input"
        value={searchTerm}
        onChange={(e)=>handleChange(e)}
        onKeyPress={handleKeyPress}
      />
      <CiSearch className="search-icon" onClick={(e)=>handleSearch(e)} />
    </div>
  );
};

export default Searchbox;
