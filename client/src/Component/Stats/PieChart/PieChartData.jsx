/* eslint-disable no-unused-vars */

import React,{useEffect,useState} from 'react'
import {PieChart,Pie,Tooltip,Cell} from "recharts"
import axios from "axios"
import './PieChartData.css'

const PieChartData=()=>{

  const [activeIndex,setActiveIndex]=useState(-1)
  const[data,setData]=useState([
    {name:"Patients Sent to Home",count:0},
    {name:"Patients Currently in NGO",count:0}
  ])

  const COLORS=["#ff8800", "#00C49F"]

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const apiUrl=import.meta.env.VITE_SERVER_URL;
        const response=await axios.get(`${apiUrl}/data`)
        const patients=response.data
         // for check the name of the patients whose sent to home...
        // const sentToHome=patients.filter(patient=>patient.IsSentToHome);
        // sentToHome.forEach(patient=>{
        //   console.log(`${patient.Name}`)
        //  })
        const sentToHomePatients=patients.filter((patient)=>patient.IsSentToHome).length;
        const currentlyInNGO=patients.filter((patient)=>!patient.IsSentToHome).length
        setData([{name:"Patients Sent to Home",count:sentToHomePatients},
            {name:"Patients Currently in NGO",count:currentlyInNGO}

        ])
      }catch(error){
        console.log("Error fetching the data",error)
      }
    }
    fetchData();
  },[])

  const onPieEnter=(_, index)=>{
    setActiveIndex(index)
  }

return(
  <div className='chart-container' >
    <h4>Chart for show the sent to home and currently patients in ngo.</h4>
<div className="piechart">
<PieChart width={400} height={400}>
    <Pie activeIndex={activeIndex} data={data} dataKey="count" outerRadius={200} fill="green" onMouseEnter={onPieEnter} style={{cursor:"pointer", outline:"none"}}>
      {data.map((entry,index)=>(
        <Cell key={`cell-${index}`} fill={COLORS[index%COLORS.length]}/>
      ))}
    </Pie>
    <Tooltip/>
  </PieChart>
  </div>
  </div>
  
)
}
export default PieChartData