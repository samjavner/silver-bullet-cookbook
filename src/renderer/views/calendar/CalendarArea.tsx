import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import CalendarPage from "./calendar/CalendarPage";
import CalendarTabs from "./CalendarTabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeCalendarPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type CalendarAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const CalendarArea: React.SFC<CalendarAreaProps> = props => (
    <>
        <CalendarTabs />
        {props.activePage === "calendar" && <CalendarPage />}
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarArea);
