import { faBox, faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { NavigationLayout, NavigationLayoutProps } from "./navigation";

describe("navigation components", () => {
    describe("NavigationLayout", () => {
        let props: NavigationLayoutProps;

        beforeEach(() => {
            props = {
                navbar: {
                    left: [
                        {
                            isActive: false,
                            icon: faHome,
                            onClick: () => ({}),
                        },
                        {
                            isActive: false,
                            text: "abc",
                            onClick: () => ({}),
                        },
                    ],
                    right: [
                        {
                            isActive: true,
                            text: "xyz",
                            onClick: () => ({}),
                        },
                        {
                            isActive: false,
                            icon: faCog,
                            onClick: () => ({}),
                        },
                    ],
                },
                tabs: [
                    {
                        isActive: false,
                        text: "ABC",
                        icon: faCog,
                        onClick: () => ({}),
                    },
                    {
                        isActive: true,
                        text: "XYZ",
                        icon: faBox,
                        onClick: () => ({}),
                    },
                ],
                page: "Hello!",
            };
        });

        it("should have expected layout", () => {
            const component = renderer.create(
                <NavigationLayout
                    navbar={{ left: [], right: [] }}
                    tabs={[]}
                    page={null}
                />
            );
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it("should have expected navbar, tabs, and page", () => {
            const component = renderer.create(<NavigationLayout {...props} />);
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });

        it("handles clicking on navbar links", () => {
            let clicked = false;
            props.navbar.right[0].onClick = () => {
                clicked = true;
            };
            const component = renderer.create(<NavigationLayout {...props} />);
            const link = component.root.find(
                node =>
                    node.type === "a" &&
                    node.props.className &&
                    node.props.className.indexOf("is-active") !== -1
            );
            link.props.onClick();
            expect(clicked).toBe(true);
        });

        it("handles clicking on tabs", () => {
            let clicked = false;
            props.tabs[1].onClick = () => {
                clicked = true;
            };
            const component = renderer.create(<NavigationLayout {...props} />);
            const link = component.root.find(
                node =>
                    node.type === "li" &&
                    node.props.className &&
                    node.props.className.indexOf("is-active") !== -1
            );
            (link.children[0] as renderer.ReactTestInstance).props.onClick();
            expect(clicked).toBe(true);
        });
    });
});
