import { Button, ButtonGroup } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../app/actions";
import { State } from "../../app/state";

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
    <>
        <div className="pz-navtabs">
            <ButtonGroup minimal={true}>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "library",
                    })}
                    icon="book"
                    onClick={props.onLibraryClick}
                >
                    Library
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "recipe_box",
                    })}
                    icon="box"
                    onClick={props.onRecipeBoxClick}
                >
                    Recipe Box
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "favorites",
                    })}
                    icon="heart"
                    onClick={props.onFavoritesClick}
                >
                    Favorites
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "tags",
                    })}
                    icon="tag"
                    onClick={props.onTagsClick}
                >
                    Tags
                </Button>
                <Button
                    className={classNames({
                        "pz-navtabs-button": true,
                        "pz-navtabs-button--active":
                            props.activePage === "search",
                    })}
                    icon="search"
                    onClick={props.onSearchClick}
                >
                    Search
                </Button>
            </ButtonGroup>
        </div>
        <div style={{ borderTop: "1px solid lightgray" }} />
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipesTabs);
