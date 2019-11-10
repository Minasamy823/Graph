import React from 'react';
import './App.css';
import Login from './Components/Login/login'
import Register from './Components/register/register'
import Dashboard from './Components/dashboard/dashboard'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
        <Switch>
        <Route path="/Login"  component={Login}/>
        <Route path="/Register"  component={Register}/>
        <Route path="/charts"  component={Dashboard}/>
        // for any wrong path
        <Route path="*" component={Login}/>


         </Switch>
    </div>
  );
}

export default App;
