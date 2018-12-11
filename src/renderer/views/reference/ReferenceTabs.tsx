import { faBook, faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Navtab, Navtabs } from "../../components/Navtabs";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";

interface ReferenceTabsProps {
    activePage: navigation.ReferencePage;
    onDictionaryClick: () => void;
    onNutritionClick: () => void;
}

export const ReferenceTabs: React.SFC<ReferenceTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "dictionary"}
            icon={faBook}
            text="Dictionary"
            onClick={props.onDictionaryClick}
        />
        <Navtab
            isActive={props.activePage === "nutrition"}
            icon={faHeartbeat}
            text="Nutrition"
            onClick={props.onNutritionClick}
        />
    </Navtabs>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveReferencePage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onDictionaryClick: () =>
                navigation.actions.setActiveReferencePage("dictionary"),
            onNutritionClick: () =>
                navigation.actions.setActiveReferencePage("nutrition"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferenceTabs);
