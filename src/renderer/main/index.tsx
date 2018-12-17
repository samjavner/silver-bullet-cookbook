import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Navigation } from "../pages/navigation";
import { App } from "./app";

export function main() {
    const render = (Component: typeof Navigation) => {
        ReactDOM.render(
            <AppContainer>
                <App Component={Component} />
            </AppContainer>,
            document.getElementById("app")
        );
    };

    render(Navigation);
    if (module.hot) {
        module.hot.accept("../pages/navigation", () => render(Navigation));
    }
}
