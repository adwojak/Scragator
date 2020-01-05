import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginRoute from "./components/LoginRoute";
import AnonymousRoute from "./components/AnonymousRoute";
import ResetPassword from "./components/ResetPassword";
import Message from "./components/Message";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/another" component={Profile} />
          <Route path="/message" component={Message} />
          <AnonymousRoute path="/login" component={Login} />
          <AnonymousRoute path="/register" component={Register} />
          <AnonymousRoute path="/resetPassword" component={ResetPassword} />
          <LoginRoute path="/profile" component={Profile} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
