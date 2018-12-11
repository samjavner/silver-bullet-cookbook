import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";
import CalendarPage from "./calendar/CalendarPage";
import CalendarTabs from "./CalendarTabs";

interface CalendarAreaProps {
    activePage: navigation.CalendarPage;
}

export const CalendarArea: React.SFC<CalendarAreaProps> = props => (
    <>
        <CalendarTabs />
        {props.activePage === "calendar" && <CalendarPage />}
    </>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveCalendarPage(state),
});

export default connect(mapStateToProps)(CalendarArea);
