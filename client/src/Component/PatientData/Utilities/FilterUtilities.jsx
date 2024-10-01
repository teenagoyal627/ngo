import axios from "axios";

export const handleDateChange = (e, setFilters, filters) => {
  setFilters({
    ...filters,
    [e.target.name]: e.target.value,
  });
};
export const handleGenderChange = (e, setFilters, filters) => {
  setFilters({
    ...filters,
    gender: {
      ...filters.gender,
      [e.target.name]: e.target.checked,
    },
  });
};



export const handleClose = (setFilters) => {
  setFilters({
    startDate: "",
    endDate: "",
    gender: {
      Male: false,
      Female: false,
    },
  });
};

export const filterHandler = async (
  e,
  filters,
  setPatients,
  setModalContent,
  setShowModal,
  setShowFilterModal,
  setFilters,
  userId
) => {
  e.preventDefault();
  console.log("filter button is clicked")
  const gender = JSON.stringify(filters.gender);
  const isSentToHome=filters.isSentToHome;
  try {
    const apiUrl = import.meta.env.VITE_SERVER_URL;

    const response = await axios.post(`${apiUrl}/filter`, {
      startDate: filters.startDate,
      endDate: filters.endDate,
      gender,
      isSentToHome,
      userId
    });
    const filteredData = response.data;
   
    if (filteredData.length > 0) {
      setShowFilterModal(false);
      setPatients(response.data);
      handleClose(setFilters)
    } else {
      setModalContent({
        title: "Not Found",
        body: "No patients found.",
      });
      setShowModal(true);
      setShowFilterModal(false);
    }
  } catch {
    setModalContent({
      title: "Error",
      body: "There was an error filtering the data.",
    });
    setShowModal(true);
    setShowFilterModal(false);
  }
};

export const handleIsSentToHomeChange=(e,setFilters)=>{
  const {value}=e.target;
  setFilters((prevFilters)=>({
    ...prevFilters,
    isSentToHome:value
  }))
}