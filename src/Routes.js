import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Candidates from './components/CandidateList';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/candidats" exact component={Candidates} />
      </Switch>
    </Router>
  );
};

export default Routes;
