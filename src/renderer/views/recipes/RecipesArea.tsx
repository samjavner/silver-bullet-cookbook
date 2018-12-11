import * as React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../core/model";
import * as navigation from "../../core/navigation";
import FavoritesPage from "./favorites/FavoritesPage";
import LibraryPage from "./library/LibraryPage";
import RecipeBoxPage from "./recipeBox/RecipeBoxPage";
import RecipesTabs from "./RecipesTabs";
import SearchPage from "./search/SearchPage";
import TagsPage from "./tags/TagsPage";

interface RecipesAreaProps {
    activePage: navigation.RecipesPage;
}

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

const mapStateToProps = (state: GlobalState) => ({
    activePage: navigation.selectors.getActiveRecipesPage(state),
});

export default connect(mapStateToProps)(RecipesArea);
