import * as React from "react";
import * as renderer from "react-test-renderer";
import { CalendarTabs } from "./CalendarTabs";

describe("CalendarTabs", () => {
    const onCalendarClick = () => ({} as any);

    it("should render with the 'calendar' tab active when the 'calendar' page is active", () => {
        const component = renderer.create(
            <CalendarTabs
                activePage="calendar"
                onCalendarClick={onCalendarClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'calendar' tab", () => {
        const component = renderer.create(
            <CalendarTabs
                activePage="calendar"
                onCalendarClick={onCalendarClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onCalendarClick);
    });
});
