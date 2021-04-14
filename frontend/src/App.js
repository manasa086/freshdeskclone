import './App.css';
import Login from "./Login";
import {Switch,Route} from "react-router-dom";
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ServiceRequestHome from './ServiceRequestHome';
import Service from './Service';


function App() {
  return (
    <div className="App">
    <Switch>
      <Route path="/signup">
        <SignUp></SignUp>
      </Route>
      <Route path="/servicerequesthome">
        <ServiceRequestHome></ServiceRequestHome>
      </Route>
      <Route path="/service">
        <Service></Service>
      </Route>
      <Route path="/forgotPassword">
        <ForgotPassword></ForgotPassword>
      </Route>
      <Route path="/">
        <Login></Login>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
