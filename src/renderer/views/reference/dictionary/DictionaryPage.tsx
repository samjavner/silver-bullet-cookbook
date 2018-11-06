import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../../app/actions";
import { State } from "../../../app/state";

function mapStateToProps(state: State) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type DictionaryPageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const DictionaryPage: React.SFC<DictionaryPageProps> = props => (
    <div>Dictionary</div>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DictionaryPage);
