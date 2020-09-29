// @flow
import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from './libs/components/Header';
import Footer from './libs/components/Footer';
import Register from "./components/Register";
import Login from "./components/Login";
import ArticlesList from './components/ArticlesList';
import ServicesList from './components/ServicesList';
import DeleteUser from './components/DeleteUser';
import "./App.scss";


const App = () => (
    <div className="Content">
        <Header/>
        <div className="Body">
            <Switch>
                <Route exact path="/services" component={ServicesList} />
                <Route exact path="/articles" component={ArticlesList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/delete" component={DeleteUser} />
            </Switch>
        </div>
        <Footer/>
    </div>
);

export default App;
