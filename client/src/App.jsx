import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form from "./Component/PatientForm/MainPage.js/FormPage";
import Login from "./Component/Authentication/Login/Login";
import Signup from "./Component/Authentication/Signup/Signup";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllPatientDetails from "./Component/PatientData/MainPage/PatientDetails";
// import ShowPatientData from "./Component/PatientForm/DialogBox/ShowPatientData";
import FrontPage from "./Component/FrontPage/BeforeLogin/FrontPage";
import PageAfterLogin from "./Component/FrontPage/AfterLogin/PageAfterLogin";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
          <FrontPage/>
          </Route>
          {/* <Route path="/patient/:id" component={ShowPatientData}/> */}
          <Route path="/form/:id?" component={Form} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/ngoPage" component={PageAfterLogin} />
          <Route path="/patientdata" component={AllPatientDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// yarn start
// start mongodb
//run server by node Server.js in terminal



// for render
// for branch: select the branch name
// for root director :always make a root diretory for server means write the separate code for the client side and sever side 
// build commod: if i use npx for create add then write npm install and if i use yarn than write yarn add
// for pre deploy command select server as a root director
// for start command wrtie node index .js 