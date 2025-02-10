import { useEffect, useState } from 'react'
import {ComposableMap,Geographies,Geography} from 'react-simple-maps'
import axios from 'axios';
import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip'
import indiaTopo from './india.topo.json'
const INDIA_TOPO_JSON=indiaTopo
const PROJECTION_CONFIG={
    scale:350,
    center:[78.9629,22.5937]
}

const IndiaMap=()=>{

    const [tooltipContent,setTooltipContent]=useState('')
    const[data,setData]=useState([])

    useEffect(() => {
        const fetchPatientStateData = async () => {
          try {
            // const apiUrl = import.meta.env.VITE_SERVER_URL;
            const apiUrl='http://localhost:5001'

            const response = await axios.get(`${apiUrl}/map`);
             console.log(response.data)
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchPatientStateData();
      }, []);

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const colorScale=scaleLinear()
  .domain([0,Math.max(...data.map((d)=>d.count || 0))])
  .range(["#E2E2E2", "#FF5733"]);

  const getStateCount=(stateName)=>{
    const stateData=data.find((d)=>d._id===stateName)
   return stateData ?stateData.count :0
  }
return (
    <>
    <h1>india map</h1>
    {console.log("indai map")}
<ReactTooltip>{tooltipContent}</ReactTooltip>
    <ComposableMap
    projectionConfig={PROJECTION_CONFIG}
    projection='geoMercator'
    width={600}
    height={220}
    data-tip="">
        <Geographies geography={INDIA_TOPO_JSON}>
            {({geographies})=>{
                geographies.map(geo=>{
                    const stateName=geo.properties.st_nm;
                    const count=getStateCount(stateName)
                    return(
                        <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={colorScale(count)}
                        style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#F53" },
                    pressed: { outline: "none" },
                  }}
                        onMouseEnter={()=>{setTooltipContent(`${stateName} : ${count} patients`)}}
                        onMouseLeave={onMouseLeave}
                        />
                    )
                })
            }}
        </Geographies>
    </ComposableMap>
    </>
)
}
export default IndiaMap

// /* eslint-disable no-unused-vars */
// import React from 'react'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import India from "@react-map/india";

// const IndiaMap = () => {
//     const toast = (sc) => {
//         toast(sc);
//       };

//   return (
//     <div>
//        <India
//          onSelect={toast}
//           size={600}
//           hoverColor="orange"
//            type = 'select-single'
//            />
//         <ToastContainer />
//         <select>
//             <option value="select option">Select Option</option>
//        <option value="SentToHome">Patients Sent to home</option>
//       <option value="CurrentlyPresent">Currently present in NGO</option>
//         </select>
//     </div>
//   )
// }

// export default IndiaMap
