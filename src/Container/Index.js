import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form from "../Component/Form";
import TableComponent from "../Component/Table";



const WrapContainer = () => {
   
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Form} />
                    <Route exact path="/table" component={TableComponent} />
                </Switch>
            </Router>
        </>
    )
}
export default WrapContainer;