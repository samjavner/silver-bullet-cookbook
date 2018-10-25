import { Button } from "@blueprintjs/core";
import * as React from "react";
import "./app.scss";

const App: React.SFC = () => (
    <div>
        <h2>Welcome to React with Typescript!</h2>
        <Button intent="danger" text="button content" />
    </div>
);

export default App;
