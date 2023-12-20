import React, { Component } from "react";
import { Router,Route} from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./Routes";
import "./tailwind-generated.css";
import 'animate.css';
import Client from './views/Client/SurveyClient/Client';



const browserHistory = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Routes />
        <Route exact path='/Client' element={<Client />} />
      </Router>
     
    );
  }
}
