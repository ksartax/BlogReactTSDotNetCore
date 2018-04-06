import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import Layout from "./Layout";

ReactDOM.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>,
    document.getElementById("example")
);