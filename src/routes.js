import React from 'react'
import rootReducer from './reducers/index'
import Loginscreen from './views/LoginScreen'
import App from './App'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ProtectedRoute from './components/ProtectedRoute'

const store = createStore(rootReducer)

export const Routes = () => {
  return (
    <div>
      <Provider store={store}>
        <Switch>
          <Route path="/Login" component={Loginscreen}/>
          <ProtectedRoute path="/" component={Loginscreen}/>
        </Switch>
      </Provider>
    </div>
  );
};
