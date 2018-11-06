import { Button, ButtonGroup } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";

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
    <>
        <div className="pz-navtabs">
            <ButtonGroup minimal={true}>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "dictionary",
                    })}
                    icon="book"
                    onClick={props.onDictionaryClick}
                >
                    Dictionary
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "nutrition",
                    })}
                    icon="pulse"
                    onClick={props.onNutritionClick}
                >
                    Nutrition
                </Button>
            </ButtonGroup>
        </div>
        <div style={{ borderTop: "1px solid lightgray" }} />
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferenceTabs);
