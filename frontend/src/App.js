// @flow
import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from './libs/components/Header';
import Footer from './libs/components/Footer';
import Register from "./components/Register";
import Login from "./components/Login";
import ArticlesList from './components/ArticlesList';
import "./App.scss";


const App = (): React.Node => (
    <div className="Content">
        <Header/>
        <div className="Body">
            <Switch>
                <Route exact path="/" component={ArticlesList} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/Login" component={Login} />
            </Switch>
        </div>
        <Footer/>
    </div>
);

export default App;
