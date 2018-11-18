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

type RecipeBoxPageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const RecipeBoxPage: React.SFC<RecipeBoxPageProps> = props => (
    <div
        style={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 4fr",
        }}
    >
        <div style={{ gridColumn: 1, overflowY: "auto" }}>
            {[...Array(100).keys()].map(x => (
                <div key={x}>Recipe {x}</div>
            ))}
        </div>
        <div style={{ gridColumn: 2, overflowY: "auto" }}>
            {[...Array(10).keys()].map(x => (
                <div className="section" key={x}>
                    Paragraph {x}
                </div>
            ))}
        </div>
    </div>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipeBoxPage);
