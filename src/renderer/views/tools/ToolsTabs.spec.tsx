import * as React from "react";
import * as renderer from "react-test-renderer";
import { ToolsTabs } from "./ToolsTabs";

describe("ToolsTabs", () => {
    const onCalculatorClick = () => ({} as any);
    const onTimerClick = () => ({} as any);
    const onImportClick = () => ({} as any);
    const onExportClick = () => ({} as any);
    const onStatisticsClick = () => ({} as any);

    it("should render with the 'calculator' tab active when the 'calculator' page is active", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="calculator"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'timer' tab active when the 'timer' page is active", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="timer"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'import' tab active when the 'import' page is active", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="import"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'export' tab active when the 'export' page is active", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="export"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render with the 'statistics' tab active when the 'statistics' page is active", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="statistics"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should handle click on 'calculator' tab", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="calculator"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onCalculatorClick);
    });

    it("should handle click on 'timer' tab", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="timer"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onTimerClick);
    });

    it("should handle click on 'import' tab", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="import"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onImportClick);
    });

    it("should handle click on 'export' tab", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="export"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onExportClick);
    });

    it("should handle click on 'statistics' tab", () => {
        const component = renderer.create(
            <ToolsTabs
                activePage="statistics"
                onCalculatorClick={onCalculatorClick}
                onTimerClick={onTimerClick}
                onImportClick={onImportClick}
                onExportClick={onExportClick}
                onStatisticsClick={onStatisticsClick}
            />
        );
        const button = component.root.find(
            node =>
                node.props.className &&
                node.props.className.indexOf("is-active") !== -1
        ).children[0] as renderer.ReactTestInstance;
        expect(button.props.onClick).toBe(onStatisticsClick);
    });
});
