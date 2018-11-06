import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import DictionaryPage from "./dictionary/DictionaryPage";
import NutritionPage from "./nutrition/NutritionPage";
import ReferenceTabs from "./ReferenceTabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeReferencePage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type ReferenceAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const ReferenceArea: React.SFC<ReferenceAreaProps> = props => (
    <>
        <ReferenceTabs />
        {props.activePage === "dictionary" && <DictionaryPage />}
        {props.activePage === "nutrition" && <NutritionPage />}
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferenceArea);
