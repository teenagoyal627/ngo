/* eslint-disable no-unused-vars */

import React from 'react';
import OtherPageNavbar from '../Navbar/OtherPageNavbar';
import India from "@react-map/india";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LineGraphData from './LineGraphData/LineGraphData';
import IndiaMap from './IndiaMap';
import PieChartData from './PieChart/PieChartData';
import BarGraphData from './BarGraph/BarGraphData';
import './stats.css'


const Stats = () => {
   
 

    return (
      <div>
        <OtherPageNavbar/>
        <div className='chart-row'>
        <PieChartData/>
        <BarGraphData />
        </div>
        <div className='chart-row'>
        <LineGraphData/>
        <IndiaMap/>
       
        </div>
       
        </div>
    );
}

export default Stats;
