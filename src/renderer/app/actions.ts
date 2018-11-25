import {
    Area,
    CalendarPage,
    HomePage,
    RecipesPage,
    ReferencePage,
    SettingsPage,
    ShoppingPage,
    ToolsPage,
} from "./state";

export type Action =
    | {
          type: "setActiveArea";
          payload: Area;
      }
    | {
          type: "setActiveHomePage";
          payload: HomePage;
      }
    | {
          type: "setActiveRecipesPage";
          payload: RecipesPage;
      }
    | {
          type: "setActiveCalendarPage";
          payload: CalendarPage;
      }
    | {
          type: "setActiveShoppingPage";
          payload: ShoppingPage;
      }
    | {
          type: "setActiveReferencePage";
          payload: ReferencePage;
      }
    | {
          type: "setActiveToolsPage";
          payload: ToolsPage;
      }
    | {
          type: "setActiveSettingsPage";
          payload: SettingsPage;
      }
    | {
          type: "setSelectedRecipeIndex";
          payload: number;
      };

export function setActiveArea(payload: Area): Action {
    return {
        type: "setActiveArea",
        payload,
    };
}

export function setActiveHomePage(payload: HomePage): Action {
    return {
        type: "setActiveHomePage",
        payload,
    };
}

export function setActiveRecipesPage(payload: RecipesPage): Action {
    return {
        type: "setActiveRecipesPage",
        payload,
    };
}

export function setActiveCalendarPage(payload: CalendarPage): Action {
    return {
        type: "setActiveCalendarPage",
        payload,
    };
}

export function setActiveShoppingPage(payload: ShoppingPage): Action {
    return {
        type: "setActiveShoppingPage",
        payload,
    };
}

export function setActiveReferencePage(payload: ReferencePage): Action {
    return {
        type: "setActiveReferencePage",
        payload,
    };
}

export function setActiveToolsPage(payload: ToolsPage): Action {
    return {
        type: "setActiveToolsPage",
        payload,
    };
}

export function setActiveSettingsPage(payload: SettingsPage): Action {
    return {
        type: "setActiveSettingsPage",
        payload,
    };
}

export function setSelectedRecipeIndex(payload: number): Action {
    return {
        type: "setSelectedRecipeIndex",
        payload,
    };
}
