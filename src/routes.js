import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';

function Routes() {
    //localStorage.removeItem("@zoly:user");
    return (
        <>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </>
    );
};

export default Routes;