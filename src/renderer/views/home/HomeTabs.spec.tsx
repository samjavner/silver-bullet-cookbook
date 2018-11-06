import * as React from "react";
import * as renderer from "react-test-renderer";
import { HomeTabs } from "./HomeTabs";

describe("HomeTabs", () => {
    const onHomeClick = () => ({} as any);

    it("should render with the 'home' tab active when the 'home' page is active", () => {
        const component = renderer.create(
            <HomeTabs activePage="home" onHomeClick={onHomeClick} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'home' tab", () => {
        const component = renderer.create(
            <HomeTabs activePage="home" onHomeClick={onHomeClick} />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("pz-navtabs-button--active") !== -1
        );
        expect(button.props.onClick).toBe(onHomeClick);
    });
});
