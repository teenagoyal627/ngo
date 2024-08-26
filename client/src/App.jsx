// import { useEffect } from 'react'

// function App() {
//   useEffect(()=>{

//     const fetchData=async()=>{
//       const res=await fetch('https://ngo-syl9.onrender.com')
// const data=await res.json()
// console.log(data)
//     }
//    fetchData()
//   },[])
// return(
//   <>

//   </>
// )

// }

// export default App




import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form from './Component/PatientForm/MainPage.js/FormPage';
import Login from './Component/Authentication/Login/Login';
import Signup from "./Component/Authentication/Signup/Signup";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from "./Component/FrontPage/FrontPage";
import AllPatientDetails from "./Component/PatientData/MainPage/PatientDetails";
import PageAfterLogin from "./Component/FrontPage/PageAfterLogin";

const App = () => {
  return (
    <Router>
      <div>
        
        <Switch>
        <Route path='/'exact><FrontPage/></Route>
          <Route  path="/form/:id?" component={Form} />
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={Signup}/>
          <Route path="/ngoPage" component={PageAfterLogin}/>
          <Route path="/patientdata" component={AllPatientDetails}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


// yarn start
// start mongodb
//run server by node Server.js in terminal