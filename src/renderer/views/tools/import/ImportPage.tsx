import { remote } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../../app/actions";
import { State } from "../../../app/state";
import * as mmf from "../../../formats/mmf/parser";
import * as mxp from "../../../formats/mxp/parser";

function mapStateToProps(state: State) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type ImportPageProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const ImportPage: React.SFC<ImportPageProps> = props => (
    <div>
        <button
            className="button"
            onClick={() => {
                const paths = remote.dialog.showOpenDialog(
                    remote.getCurrentWindow(),
                    {
                        filters: [
                            {
                                name: "Recipe files",
                                extensions: [
                                    // "fdx",
                                    // "json",
                                    "mmf",
                                    // "mx2",
                                    "mxp",
                                    // "paprikarecipes",
                                ],
                            },
                        ],
                    }
                );

                if (!paths || paths.length === 0) {
                    return;
                }

                const path = paths[0];

                if (path.toLowerCase().endsWith(".mmf")) {
                    const recipes = mmf.parseFileWithSource(path);
                    // tslint:disable-next-line:no-console
                    console.log(recipes);
                } else if (path.toLowerCase().endsWith(".mxp")) {
                    const recipes = mxp.parseFileWithSource(path);
                    // tslint:disable-next-line:no-console
                    console.log(recipes);
                } else if (path.toLowerCase().endsWith(".mx2")) {
                    // TODO
                } else if (path.toLowerCase().endsWith(".fdx")) {
                    // TODO
                } else if (path.toLowerCase().endsWith(".paprikarecipes")) {
                    // TODO
                } else if (path.toLowerCase().endsWith(".json")) {
                    // TODO
                }
            }}
        >
            Import
        </button>
    </div>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImportPage);
