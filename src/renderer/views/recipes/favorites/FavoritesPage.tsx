import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../../core/model";

export const FavoritesPage: React.SFC = props => <div>Favorites</div>;

const mapStateToProps = (state: GlobalState) => ({});

export default connect(mapStateToProps)(FavoritesPage);
