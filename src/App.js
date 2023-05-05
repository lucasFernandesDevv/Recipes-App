import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Meals from './pages/Meals/Meals';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/meals">
        <Meals />
      </Route>
    </Switch>
  );
}

export default App;
