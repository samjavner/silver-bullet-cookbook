// Use require in order to load base stylesheet
// before the app and any other stylesheets.

// tslint:disable-next-line:no-var-requires
require("./styles/bulma.scss");
document.body.className = "has-navbar-fixed-top";

// tslint:disable-next-line:no-var-requires
require("./main.tsx");
