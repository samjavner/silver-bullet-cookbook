import {
    faArchive,
    faBook,
    faHeart,
    faSearch,
    faTags,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";
import { Navtab, Navtabs } from "../../components/Navtabs";

function mapStateToProps(state: State) {
    return {
        activePage: state.activeRecipesPage,
    };
}

function mapDispatchToProps(dispatch: Dispatch<actions.Action>) {
    return {
        onLibraryClick: () => dispatch(actions.setActiveRecipesPage("library")),
        onRecipeBoxClick: () =>
            dispatch(actions.setActiveRecipesPage("recipe_box")),
        onFavoritesClick: () =>
            dispatch(actions.setActiveRecipesPage("favorites")),
        onTagsClick: () => dispatch(actions.setActiveRecipesPage("tags")),
        onSearchClick: () => dispatch(actions.setActiveRecipesPage("search")),
    };
}

type RecipesTabsProps = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export const RecipesTabs: React.SFC<RecipesTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "library"}
            icon={faBook}
            text="Library"
            onClick={props.onLibraryClick}
        />
        <Navtab
            isActive={props.activePage === "recipe_box"}
            icon={faArchive}
            text="Recipe Box"
            onClick={props.onRecipeBoxClick}
        />
        <Navtab
            isActive={props.activePage === "favorites"}
            icon={faHeart}
            text="Favorites"
            onClick={props.onFavoritesClick}
        />
        <Navtab
            isActive={props.activePage === "tags"}
            icon={faTags}
            text="Tags"
            onClick={props.onTagsClick}
        />
        <Navtab
            isActive={props.activePage === "search"}
            icon={faSearch}
            text="Search"
            onClick={props.onSearchClick}
        />
    </Navtabs>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesTabs);
