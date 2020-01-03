import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import Another from "./components/Another";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginRoute from "./components/LoginRoute";
import AnonymousRoute from "./components/AnonymousRoute";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/another" component={Another} />
          <AnonymousRoute path="/login" component={Login} />
          <AnonymousRoute path="/register" component={Register} />
          <LoginRoute path="/profile" component={Another} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
