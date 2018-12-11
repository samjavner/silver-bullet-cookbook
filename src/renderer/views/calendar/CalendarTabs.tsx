import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Navtab, Navtabs } from "../../components/Navtabs";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";

interface CalendarTabsProps {
    activePage: navigation.CalendarPage;
    onCalendarClick: () => void;
}

export const CalendarTabs: React.SFC<CalendarTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "calendar"}
            icon={faCalendar}
            text="Calendar"
            onClick={props.onCalendarClick}
        />
    </Navtabs>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveCalendarPage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onCalendarClick: () =>
                navigation.actions.setActiveCalendarPage("calendar"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarTabs);
