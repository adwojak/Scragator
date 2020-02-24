// @flow
import * as React from "react";
import { useSelector } from "react-redux";
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
import Popup from "./components/Popup";
import NotFound from "./components/NotFound";
import "./App.scss";

const App = (): React.Node => {
  const showPopup = useSelector((state: Object): Object => state.showPopup);
  return (
    <React.Fragment>
      {showPopup && <Popup />}
      <Header />
      <Switch>
        <Route exact path="/" component={ArticlesList} />
        <Route path="/message" component={Message} />
        <Route path="/services" component={ServicesList} />
        <Route path="/search" component={ArticlesList} />
        <Route path="/serviceArticles" component={ArticlesList} />
        <AnonymousRoute path="/login" component={Login} />
        <AnonymousRoute path="/register" component={Register} />
        <AnonymousRoute path="/resetPassword" component={ResetPassword} />
        <LoginRoute path="/profile" component={Profile} />
        <LoginRoute path="/savedArticles" component={ArticlesList} />
        <LoginRoute path="/savedServices" component={ServicesList} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
