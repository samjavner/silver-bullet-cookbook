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
    <>
        <RecipesTabs />
        {props.activePage === "library" && <LibraryPage />}
        {props.activePage === "recipe_box" && <RecipeBoxPage />}
        {props.activePage === "favorites" && <FavoritesPage />}
        {props.activePage === "tags" && <TagsPage />}
        {props.activePage === "search" && <SearchPage />}
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesArea);
