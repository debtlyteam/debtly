import React from 'react'
import Loginscreen from './views/LoginScreen'
import {Route, Switch, Redirect} from 'react-router-dom'

export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Loginscreen" component={Loginscreen} />
        <Route exact path="/">
          <Redirect to="/Loginscreen" />
        </Route>
      </Switch>
    </div>
  );
};