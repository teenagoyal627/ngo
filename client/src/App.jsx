import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import Form from "./Component/PatientForm/MainPage.js/FormPage";
import Login from "./Component/Authentication/Login/Login";
import Signup from "./Component/Authentication/Signup/Signup";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllPatientDetails from "./Component/PatientData/MainPage/PatientDetails";
import FrontPage from "./Component/FrontPage/BeforeLogin/FrontPage";
import PageAfterLogin from "./Component/FrontPage/AfterLogin/PageAfterLogin";
import Stats from "./Component/Stats/Stats";
import IndiaMap from "./Component/Stats/MapData/IndiaMap";

const isAuthenticated=()=>{
  return localStorage.getItem("isAuthenticated")==="true"
}
{console.log(isAuthenticated())}
const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>{ isAuthenticated() ?<Redirect to='/ngoPage'/>:<FrontPage/>}</Route>
          <Route path="/form/:id?" component={Form} />
          <Route path="/login">{isAuthenticated() ? <Redirect to='/ngoPage'/>:<Login/> }</Route>
          <Route path="/signup">{isAuthenticated() ?<Redirect to='/ngoPage'/>:<Signup/>}</Route>
          <Route path="/ngoPage" component={PageAfterLogin} />
          <Route path="/patientdata" component={AllPatientDetails} />
        <Route path="/stats" component={Stats}/>
        <Route path='/indiaMap' component={IndiaMap}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// npm run dev
// start mongodb
//run server by node index.js in terminal



// for render
// for branch: select the branch name
// for root director :always make a root diretory for server means write the separate code for the client side and sever side 
// build commod: if i use npx for create add then write npm install and if i use yarn than write yarn add
// for pre deploy command select server as a root director
// for start command wrtie node index .js 