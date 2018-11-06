import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import { Navtab, Navtabs } from "../../components/Navtabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeReferencePage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onDictionaryClick: () =>
            dispatch(actions.setActiveReferencePage("dictionary")),
        onNutritionClick: () =>
            dispatch(actions.setActiveReferencePage("nutrition")),
    };
}

type ReferenceTabsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const ReferenceTabs: React.SFC<ReferenceTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "dictionary"}
            icon="book"
            text="Dictionary"
            onClick={props.onDictionaryClick}
        />
        <Navtab
            isActive={props.activePage === "nutrition"}
            icon="pulse"
            text="Nutrition"
            onClick={props.onNutritionClick}
        />
    </Navtabs>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferenceTabs);
