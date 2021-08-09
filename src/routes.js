import React from 'react';
import { Switch } from 'react-router-dom';
import Route from "./routes/Route";
import Login from './pages/login';
import Home from './pages/home';

function Routes() {
    //localStorage.removeItem("@zoly:user");
    return (
        <>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Home} isPrivate />
            </Switch>
        </>
    );
};

export default Routes;