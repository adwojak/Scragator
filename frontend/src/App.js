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
import Popup from "./libs/components/Popup";
import "./App.scss";

const App = () => {
  const popupContent = useSelector((state: Object): Object => state.popupContent);
  return (
    <React.Fragment>
      {popupContent && <Popup popupContent={popupContent} />}
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
        <LoginRoute path="/serviceArticles" component={ArticlesList} />
      </Switch>
    </React.Fragment>
  );
}

// class App extends Component {
//   render() {
//     return (
//       <Fragment>
//         <Popup />
//         <Header />
//         <Switch>
//           <Route exact path="/" component={ArticlesList} />
//           <Route path="/message" component={Message} />
//           <Route path="/services" component={ServicesList} />
//           <Route path="/search" component={ArticlesList} />
//           <AnonymousRoute path="/login" component={Login} />
//           <AnonymousRoute path="/register" component={Register} />
//           <AnonymousRoute path="/resetPassword" component={ResetPassword} />
//           <LoginRoute path="/profile" component={Profile} />
//           <LoginRoute path="/savedArticles" component={ArticlesList} />
//           <LoginRoute path="/savedServices" component={ServicesList} />
//           <LoginRoute path="/serviceArticles" component={ArticlesList} />
//         </Switch>
//       </Fragment>
//     );
//   }
// }

export default App;
