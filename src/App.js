import React  from 'react'
//import Dashboard from './page/dashboard/dashboard'
import {
  Switch,
  Route,
} from "react-router-dom";


import Login from  './containers/login/login'
import Dashboard from  './containers/dashboard/dashboard'



export default class App  extends React.Component  {

  render() {
    return (
      <Switch>
        <Route exact path="/login"  component={Login}></Route>
        <Route  path="/imax"  component={Dashboard}></Route>
      </Switch>
    )
  }
}



 


