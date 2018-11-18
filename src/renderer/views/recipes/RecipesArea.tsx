import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import FavoritesPage from "./favorites/FavoritesPage";
import LibraryPage from "./library/LibraryPage";
import RecipeBoxPage from "./recipeBox/RecipeBoxPage";
import RecipesTabs from "./RecipesTabs";
import SearchPage from "./search/SearchPage";
import TagsPage from "./tags/TagsPage";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeRecipesPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {};
}

type RecipesAreaProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const RecipesArea: React.SFC<RecipesAreaProps> = props => (
    <div
        style={{
            height: "100%",
            display: "grid",
            gridTemplateRows: "auto 1fr",
        }}
    >
        <div style={{ gridRow: 1 }}>
            <RecipesTabs />
        </div>
        <div style={{ gridRow: 2, overflow: "hidden" }}>
            {props.activePage === "library" && <LibraryPage />}
            {props.activePage === "recipe_box" && <RecipeBoxPage />}
            {props.activePage === "favorites" && <FavoritesPage />}
            {props.activePage === "tags" && <TagsPage />}
            {props.activePage === "search" && <SearchPage />}
        </div>
    </div>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesArea);
