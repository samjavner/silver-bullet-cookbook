import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import * as redux from "redux";
import App from "../views/App";
import { reducer } from "./reducer";

export function main() {
    const store: redux.Store<any, any> = redux.createStore(
        reducer,
        redux.compose(
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
                : (noop: any) => noop
        )
    );

    const render = (Component: typeof App) => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <Component />
                </Provider>
            </AppContainer>,
            document.getElementById("app")
        );
    };

    render(App);
    if (module.hot) {
        module.hot.accept("../views/App", () => render(App));
    }
}
