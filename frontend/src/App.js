import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticlesList from "./components/ArticlesList";
import ServicesList from "./components/ServicesList";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginRoute from "./components/LoginRoute";
import AnonymousRoute from "./components/AnonymousRoute";
import ResetPassword from "./components/ResetPassword";
import Message from "./components/Message";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={ArticlesList} />
          <Route path="/message" component={Message} />
          <Route path="/services" component={ServicesList} />
          <Route path="/search" component={ArticlesList} />
          <AnonymousRoute path="/login" component={Login} />
          <AnonymousRoute path="/register" component={Register} />
          <AnonymousRoute path="/resetPassword" component={ResetPassword} />
          <LoginRoute path="/profile" component={Profile} />
          <LoginRoute path="/savedArticles" component={ArticlesList} />
          <LoginRoute path="/savedServices" component={ServicesList} />
          {/* <Route path="/profile" component={Profile} /> */}
        </Switch>
      </Fragment>
    );
  }
}

export default App;
