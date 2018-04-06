import * as React from "react";
import Layout from "./layout/_Layout";
import { render } from "react-dom";
import { AppContainer } from 'react-hot-loader';

render(
    <AppContainer>
        <Layout />
    </AppContainer>,
    document.getElementById("app")
);