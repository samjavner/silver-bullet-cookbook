import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import * as redux from "redux";
import {
    initializeCurrentLocation,
    Location,
    RouterActions,
    routerForHash,
} from "redux-little-router";
import App from "./app";
import { routes } from "./routes";
import "./sqliteTest";

// tslint:disable-next-line:no-var-requires no-submodule-imports
require("normalize.css/normalize.css");
// tslint:disable-next-line:no-var-requires no-submodule-imports
require("@blueprintjs/icons/lib/css/blueprint-icons.css");
// tslint:disable-next-line:no-var-requires no-submodule-imports
require("@blueprintjs/core/lib/css/blueprint.css");

interface State {
    router: Location & { route: string };
    x: number;
}

type Action =
    | {
          type: "noop";
      }
    | RouterActions;

function reducer(state: State | undefined, action: Action): State {
    return {
        router: router.reducer(
            state ? state.router : undefined,
            action
        ) as Location & { route: string },
        x: 5,
    };
}

const router = routerForHash({
    routes,
});

const store: redux.Store<State, Action> = redux.createStore(
    reducer,
    redux.compose(
        router.enhancer,
        redux.applyMiddleware(router.middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
            : (noop: any) => noop
    )
);

const initialLocation = store.getState().router;
if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation));
}

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
    module.hot.accept("./app", () => render(App));
}
