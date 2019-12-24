import React, { Component, Fragment } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import Another from './components/Another';
import Form from './components/Form';
import RemoveForm from './components/RemoveForm';
import Login from './components/Login';
import Register from './components/Register';
import LoginRoute from './components/LoginRoute';
import AnonymousRoute from './components/AnonymousRoute';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/another" component={Another} />
            <Route path="/addArticle" component={Form} />
            <Route path="/removeArticle" component={RemoveForm} />
            <AnonymousRoute path="/login" component={Login} />
            <AnonymousRoute path="/register" component={Register} />
            <LoginRoute path="/profile" component={RemoveForm} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
