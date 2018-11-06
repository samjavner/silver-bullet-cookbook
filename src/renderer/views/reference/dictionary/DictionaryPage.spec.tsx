import * as React from "react";
import * as renderer from "react-test-renderer";
import { DictionaryPage } from "./DictionaryPage";

describe("DictionaryPage", () => {
    it("renders the text 'Dictionary'", () => {
        const component = renderer.create(<DictionaryPage />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
