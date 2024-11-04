import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import './BarGraphData.css'
const BarGraphData = () => {
  const [patientData, setPatientData] = useState([]);
  const [chartData, setChartData] = useState({});

  // Fetch patient data from the database
   useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_SERVER_URL; 
                const response = await axios.get(`${apiUrl}/data`); 
                setPatientData(response.data);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        fetchPatientData();
    }, []);

  // Generate chart data based on the fetched patient data
  useEffect(() => {
    if (patientData.length > 0) {
      const centerCounts = patientData.reduce((acc, patient) => {
        const center = patient.AnandamCenter;
        acc[center] = (acc[center] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(centerCounts);
      const data = Object.values(centerCounts);
      setChartData({
        xAxis: labels,
        series: [
          {
            data: data,
          },
        ],
      });
    }
  }, [patientData]);


  return (
    <div className="bargraph-container">
      <h4> Number of Patients Based on Anandam Center</h4>
      <div className="bargraph">
        {chartData.xAxis ? (
            <BarChart
              xAxis={[{ scaleType: "band", data: chartData.xAxis }]}
              series={chartData.series}
              width={500}
              height={400}
            />
          
        ) : (
          <p>Loding the data on Bar graph.....</p>
        )}
      </div>
    </div>
  );
};
export default BarGraphData;
