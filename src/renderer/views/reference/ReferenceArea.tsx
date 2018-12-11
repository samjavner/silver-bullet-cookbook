import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";
import DictionaryPage from "./dictionary/DictionaryPage";
import NutritionPage from "./nutrition/NutritionPage";
import ReferenceTabs from "./ReferenceTabs";

interface ReferenceAreaProps {
    activePage: navigation.ReferencePage;
}

const ReferenceArea: React.SFC<ReferenceAreaProps> = props => (
    <>
        <ReferenceTabs />
        {props.activePage === "dictionary" && <DictionaryPage />}
        {props.activePage === "nutrition" && <NutritionPage />}
    </>
);

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveReferencePage(state),
});

export default connect(mapStateToProps)(ReferenceArea);
