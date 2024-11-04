import axios from "axios";
import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import {
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import "./LineCharGraph.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineGraphData = () => {
  const [patients, setPatients] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState("daily");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_SERVER_URL;
        const response = await axios.get(`${apiUrl}/data`);
        setPatients(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // array is used for ordered collections of elements...and using square bracket
  // object is used for unordered collections of elements...and using curly bracket and the store the key:value pair..

  const generateChartData = () => {
    const currentDate = new Date();
    console.log(currentDate);
    const currentMonth = currentDate.getMonth(); //start from 0 index...
    let filteredData = {};
    // filtered the patients data based on the registration date...
    if (filter === "daily") {
      filteredData = patients.reduce((acc, patient) => {
        const regDate = new Date(patient.RegistrationDate);

        if (
          regDate.getMonth() === currentMonth &&
          regDate.getFullYear() === currentDate.getFullYear()
        ) {
          const dayOfWeek = `${daysOfWeek[regDate.getDay()]}
          (${regDate.getDate()}/${regDate.getMonth() + 1})`;
          acc[dayOfWeek] = acc[dayOfWeek] ? acc[dayOfWeek] + 1 : 1;
        }
        return acc;
      }, {}); //filteredData object is closed here
    } //block of daily is closed here...
    else if (filter === "weekly") {
      filteredData = patients.reduce((acc, patient) => {
        const regDate = new Date(patient.RegistrationDate);
        if (
          regDate.getMonth() === currentMonth &&
          regDate.getFullYear() === currentDate.getFullYear()
        ) {
          const weekNumber = Math.ceil(
            (regDate.getDate() +
              new Date(regDate.getFullYear(), regDate.getMonth(), 1).getDay()) /
              7
          );
          console.log(weekNumber)
          acc[`Week ${weekNumber}`] = acc[`Week ${weekNumber}`]
            ? acc[`Week ${weekNumber}`] + 1
            : 1;
        }
        return acc;
      }, {});
    } else if (filter === "monthly") {
      filteredData = patients.reduce((acc, patient) => {
        const regDate = new Date(patient.RegistrationDate);
        const monthName = monthsOfYear[regDate.getMonth()];
        acc[monthName] = acc[monthName] ? acc[monthName] + 1 : 1;
        return acc;
      }, {});
    }

    const chartArray = Object.keys(filteredData).map((key) => ({
      name: key,
      totalCount: filteredData[key],
    }));
    setChartData(chartArray);
  };

  useEffect(() => {
    generateChartData();
  }, [filter, patients]);
  return (
    <div className="linegraph-container">
      <h4>Patient sent to home and Currently present in ngo...</h4>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={chartData} margin={{ right: 300 }}>
          <CartesianGrid />
          <XAxis dataKey="name" interval={"preserveStartEnd"} />
          <YAxis />
          <Legend />
          <Tooltip />
          <Line dataKey="totalCount" stroke="black" actuveDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <div>
        <label>Select Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="daily">Day</option>
          <option value="weekly">Week</option>
          <option value="monthly">Month</option>
        </select>
      </div>
    </div>
  );
};
export default LineGraphData;

// import React, { useState, useEffect } from "react";
// import {
//   LineChart,
//   ResponsiveContainer,
//   Legend,
//   Tooltip,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import axios from "axios";
// import './LineCharGraph.css'
// // Helper to get day names and week numbers
// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const LineGraphData = () => {
//   const [patients, setPatients] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [filter, setFilter] = useState("daily");

//   // Fetch patient data from the database
//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_SERVER_URL;
//         const response = await axios.get(`${apiUrl}/data`); // Adjust the API endpoint
//         setPatients(response.data); // Assuming response.data contains patient records
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   // Function to generate chart data based on the selected filter
//   const generateChartData = () => {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth(); // Get the current month (0-11)

//     let filteredData = {};

//     if (filter === "daily") {
//       // Group by day of the current month
//       filteredData = patients.reduce((acc, patient) => {
//         const regDate = new Date(patient.RegistrationDate);

//         // Only include patients from the current month
//         if (regDate.getMonth() === currentMonth && regDate.getFullYear() === currentDate.getFullYear()) {
//           const dayOfWeek = `${daysOfWeek[regDate.getDay()]} (${regDate.getDate()})`; // Get day name and date (e.g., "Monday (12)")
//           acc[dayOfWeek] = acc[dayOfWeek] ? acc[dayOfWeek] + 1 : 1;
//         }
//         return acc;
//       }, {});
//     } else if (filter === "weekly") {
//       // Group by week number of the current month
//       filteredData = patients.reduce((acc, patient) => {
//         const regDate = new Date(patient.RegistrationDate);

//         // Only include patients from the current month
// if (regDate.getMonth() === currentMonth && regDate.getFullYear() === currentDate.getFullYear()) {
//   const weekNumber = Math.ceil((regDate.getDate() + new Date(regDate.getFullYear(), regDate.getMonth(), 1).getDay()) / 7);
//   acc[`Week ${weekNumber}`] = acc[`Week ${weekNumber}`] ? acc[`Week ${weekNumber}`] + 1 : 1;
// }
// return acc;
//       }, {});
//     } else if (filter === "monthly") {
//       // Group by month
//       filteredData = patients.reduce((acc, patient) => {
//         const regDate = new Date(patient.RegistrationDate);
//         const monthName = monthsOfYear[regDate.getMonth()]; // Get month name (January, etc.)
//         acc[monthName] = acc[monthName] ? acc[monthName] + 1 : 1;
//         return acc;
//       }, {});
//     }

//     // Convert the object into an array of {name, totalCount} for chart display
//     const chartArray = Object.keys(filteredData).map((key) => ({
//       name: key,
//       totalCount: filteredData[key],
//     }));

//     setChartData(chartArray);
//   };

//   // Regenerate chart data whenever filter or patient data changes
//   useEffect(() => {
//     generateChartData();
//   }, [filter, patients]);

//   return (
//     <div className="linegraph-container">
//       <h4 className="text-heading">Patient Registration Line Chart</h4>
//       <ResponsiveContainer width="100%" aspect={3}>
//         <LineChart data={chartData} margin={{ right: 300 }}>
//           <CartesianGrid />
//           <XAxis dataKey="name" interval={"preserveStartEnd"} />
//           <YAxis />
//           <Legend />
//           <Tooltip />
//           <Line dataKey="totalCount" stroke="black" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//       <div>
//         <label>Select Filter: </label>
//         <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//           <option value="daily">Day</option>
//           <option value="weekly">Week</option>
//           <option value="monthly">Month</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default LineGraphData;
