import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Another from './components/Another';
import Form from './components/Form';
import RemoveForm from './components/RemoveForm';
import Login from './components/Login';
import Register from './components/Register';
import LoginRoute from './components/LoginRoute';

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
            <Route path="/removeArticle" component={RemoveForm} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <LoginRoute path="/profile" component={RemoveForm} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
