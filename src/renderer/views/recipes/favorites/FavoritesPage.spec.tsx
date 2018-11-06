import * as React from "react";
import * as renderer from "react-test-renderer";
import { FavoritesPage } from "./FavoritesPage";

describe("FavoritesPage", () => {
    it("renders the text 'Favorites'", () => {
        const component = renderer.create(<FavoritesPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
