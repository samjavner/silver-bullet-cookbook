import { remote } from "electron";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import sqlite from "sqlite";
import * as inspectElement from "../debug/inspectElement";
import Layout from "../views/Layout";
import { App } from "./app";

declare const __static: string;

export async function main() {
    const db = await sqlite.open(":memory:");
    await db.migrate({ migrationsPath: `${__static}/migrations` });

    const render = (Component: typeof Layout) => {
        ReactDOM.render(
            <AppContainer>
                <App Component={Component} db={db} />
            </AppContainer>,
            document.getElementById("app")
        );
    };

    render(Layout);
    if (module.hot) {
        module.hot.accept("../views/Layout", () => render(Layout));
    }

    if (remote.getGlobal("process").env.NODE_ENV === "development") {
        inspectElement.addContextMenu();
    }
}
