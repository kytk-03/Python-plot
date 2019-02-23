import React from 'react'
import {render} from "react-dom"
import {Route, BrowserRouter, Switch} from "react-router-dom"

import Run from './run'
// import History from './history'

const appRouting = (
    <BrowserRouter>
        <Switch>
            {/*<Route path="/history" component={History}/>*/}
            <Route exact path="" component={Run}/>
        </Switch>
    </BrowserRouter>
);


render(appRouting, document.getElementById("app"));

