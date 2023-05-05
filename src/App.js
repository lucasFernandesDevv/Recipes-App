import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>
    </Switch>
  );
}

export default App;
