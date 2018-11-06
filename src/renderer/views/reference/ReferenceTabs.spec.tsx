import * as React from "react";
import * as renderer from "react-test-renderer";
import { ReferenceTabs } from "./ReferenceTabs";

describe("ReferenceTabs", () => {
    const onDictionaryClick = () => ({} as any);
    const onNutritionClick = () => ({} as any);

    it("should render with the 'dictionary' tab active when the 'dictionary' page is active", () => {
        const component = renderer.create(
            <ReferenceTabs
                activePage="dictionary"
                onDictionaryClick={onDictionaryClick}
                onNutritionClick={onNutritionClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'nutrition' tab active when the 'nutrition' page is active", () => {
        const component = renderer.create(
            <ReferenceTabs
                activePage="nutrition"
                onDictionaryClick={onDictionaryClick}
                onNutritionClick={onNutritionClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'dictionary' tab", () => {
        const component = renderer.create(
            <ReferenceTabs
                activePage="dictionary"
                onDictionaryClick={onDictionaryClick}
                onNutritionClick={onNutritionClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onDictionaryClick);
    });

    it("should handle click on 'nutrition' tab", () => {
        const component = renderer.create(
            <ReferenceTabs
                activePage="nutrition"
                onDictionaryClick={onDictionaryClick}
                onNutritionClick={onNutritionClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onNutritionClick);
    });
});
