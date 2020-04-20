import React from 'react'
import rootReducer from './reducers/index'
import Loginscreen from './views/LoginScreen'
import App from "./App"
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(rootReducer)

export const Routes = () => {
  return (
    <div>
      <Provider store={store}>
        <Switch>
          <Route path="/Login" component={Loginscreen}/>
          <Route path="/" component={App}/>
        </Switch>
      </Provider>
    </div>
  );
};
  // <Route component={EnsureLoggedInContainer}>
    // <Route path="/" component={App}/>
  // </Route>