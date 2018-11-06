import { Button, ButtonGroup } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import CalendarPage from "./calendar/CalendarPage";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeCalendarPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onCalendarClick: () =>
            dispatch(actions.setActiveCalendarPage("calendar")),
    };
}

type CalendarTabsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const CalendarTabs: React.SFC<CalendarTabsProps> = props => (
    <>
        <div className="pz-navtabs">
            <ButtonGroup minimal={true}>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "calendar",
                    })}
                    icon="calendar"
                    onClick={props.onCalendarClick}
                >
                    Calendar
                </Button>
            </ButtonGroup>
        </div>
        <div style={{ borderTop: "1px solid lightgray" }} />
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarTabs);
