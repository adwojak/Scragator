import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Another from './components/Another';
import Form from './components/Form';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/another" component={Another} />
            <Route path="/addArticle" component={Form} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
