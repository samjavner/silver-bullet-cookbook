import {
    faArchive,
    faBook,
    faHeart,
    faSearch,
    faTags,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Navtab, Navtabs } from "../../components/Navtabs";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";

interface RecipesTabsProps {
    activePage: navigation.RecipesPage;
    onRecipeBoxClick: () => void;
    onLibraryClick: () => void;
    onFavoritesClick: () => void;
    onTagsClick: () => void;
    onSearchClick: () => void;
}

export const RecipesTabs: React.SFC<RecipesTabsProps> = props => (
    <Navtabs>
        <Navtab
            isActive={props.activePage === "recipe_box"}
            icon={faArchive}
            text="Recipe Box"
            onClick={props.onRecipeBoxClick}
        />
        <Navtab
            isActive={props.activePage === "library"}
            icon={faBook}
            text="Library"
            onClick={props.onLibraryClick}
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

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveRecipesPage(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            onRecipeBoxClick: () =>
                navigation.actions.setActiveRecipesPage("recipe_box"),
            onLibraryClick: () =>
                navigation.actions.setActiveRecipesPage("library"),
            onFavoritesClick: () =>
                navigation.actions.setActiveRecipesPage("favorites"),
            onTagsClick: () => navigation.actions.setActiveRecipesPage("tags"),
            onSearchClick: () =>
                navigation.actions.setActiveRecipesPage("search"),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesTabs);
