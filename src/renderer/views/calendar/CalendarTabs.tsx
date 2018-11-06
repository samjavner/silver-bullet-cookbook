import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import { Navtab, Navtabs } from "../../components/Navtabs";

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
    <Navtabs>
        <Navtab
            isActive={props.activePage === "calendar"}
            icon="calendar"
            text="Calendar"
            onClick={props.onCalendarClick}
        />
    </Navtabs>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarTabs);
