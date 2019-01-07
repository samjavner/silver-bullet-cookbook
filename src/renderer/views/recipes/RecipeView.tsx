import {
    faCalendarPlus,
    faCartPlus,
    faCheck,
    faEdit,
    faEllipsisV,
    faHeart,
    faPrint,
    faStar,
    faThumbtack,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import * as React from "react";
import { Recipe } from "../../db/recipe";

export const RecipeView: React.FunctionComponent<{
    recipe: Recipe;
    onEdit: () => void;
}> = ({ recipe, onEdit }) => (
    <>
        <HeaderView recipe={recipe} onEdit={onEdit} />
        <TagsView recipe={recipe} />
        <ContentView recipe={recipe} />
    </>
);

const HeaderView: React.FunctionComponent<{
    recipe: Recipe;
    onEdit: () => void;
}> = ({ recipe, onEdit }) => (
    <div className="columns">
        <div className="column">
            <h1 className="title is-4">{recipe.name}</h1>
            <h2 className="subtitle is-6" style={{ marginBottom: 0 }}>
                <FontAwesomeIcon
                    fixedWidth={true}
                    icon={faStar}
                    className="has-text-primary"
                />
                <FontAwesomeIcon
                    fixedWidth={true}
                    icon={faStar}
                    className="has-text-primary"
                />
                <FontAwesomeIcon
                    fixedWidth={true}
                    icon={faStar}
                    className="has-text-primary"
                />
                <FontAwesomeIcon fixedWidth={true} icon={faStar} />
                <FontAwesomeIcon fixedWidth={true} icon={faStar} />
            </h2>
        </div>
        <div className="column is-narrow">
            <div className="field is-grouped">
                <div className="control">
                    <div className="field has-addons">
                        <div className="control">
                            <a className="button" href="#">
                                <span className="icon is-small">
                                    <FontAwesomeIcon icon={faCalendarPlus} />
                                </span>
                            </a>
                        </div>
                        <div className="control">
                            <a className="button" href="#">
                                <span className="icon is-small">
                                    <FontAwesomeIcon icon={faCartPlus} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="control">
                    <div className="field has-addons">
                        <div className="control">
                            <a className="button" href="#">
                                <span className="icon is-small has-text-info">
                                    <FontAwesomeIcon icon={faThumbtack} />
                                </span>
                            </a>
                        </div>
                        <div className="control">
                            <a className="button" href="#">
                                <span className="icon is-small has-text-success">
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                            </a>
                        </div>
                        <div className="control">
                            <a className="button" href="#">
                                <span className="icon is-small has-text-danger">
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="dropdown is-right is-hoverable">
                    <div className="dropdown-trigger">
                        <button className="button">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu">
                        <div className="dropdown-content">
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={onEdit}
                            >
                                <span className="icon is-small">
                                    <FontAwesomeIcon
                                        fixedWidth={true}
                                        icon={faEdit}
                                    />
                                </span>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "0.5rem",
                                    }}
                                />
                                Edit
                            </a>
                            <a className="dropdown-item" href="#">
                                <span className="icon is-small">
                                    <FontAwesomeIcon
                                        fixedWidth={true}
                                        icon={faTrashAlt}
                                    />
                                </span>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "0.5rem",
                                    }}
                                />
                                Delete
                            </a>
                            <hr className="dropdown-divider" />
                            <a className="dropdown-item" href="#">
                                <span className="icon is-small">
                                    <FontAwesomeIcon
                                        fixedWidth={true}
                                        icon={faPrint}
                                    />
                                </span>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "0.5rem",
                                    }}
                                />
                                Print
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const TagsView: React.FunctionComponent<{
    recipe: Recipe;
}> = ({ recipe }) => (
    <div className="columns">
        <div className="column">
            <div className="field is-grouped is-grouped-multiline">
                {recipe.categories.map((category, index) => (
                    <div className="control">
                        <div className="tags">
                            <div className="tag is-dark" key={index}>
                                {category}
                            </div>
                        </div>
                    </div>
                ))}
                {recipe.servings && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Servings:</span>
                            <span className="tag is-light">
                                {recipe.servings}
                            </span>
                        </div>
                    </div>
                )}
                {recipe.yield && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Yield:</span>
                            <span className="tag is-light">{recipe.yield}</span>
                        </div>
                    </div>
                )}
                {recipe.source && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Source:</span>
                            <span className="tag is-light">
                                {recipe.source}
                            </span>
                        </div>
                    </div>
                )}
                {recipe.author && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Author:</span>
                            <span className="tag is-light">
                                {recipe.author}
                            </span>
                        </div>
                    </div>
                )}
                {recipe.webPage && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Web Page:</span>
                            <span className="tag is-light">
                                {recipe.webPage}
                            </span>
                        </div>
                    </div>
                )}
                {recipe.sourcePageNumber && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Page Number:</span>
                            <span className="tag is-light">
                                {recipe.sourcePageNumber}
                            </span>
                        </div>
                    </div>
                )}
                {recipe.copyright && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Copyright:</span>
                            <span className="tag is-light">
                                {recipe.copyright}
                            </span>
                        </div>
                    </div>
                )}
                {recipe.publisher && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Publisher:</span>
                            <span className="tag is-light">
                                {recipe.publisher}
                            </span>
                        </div>
                    </div>
                )}
                {recipe.publishDate && (
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-dark">Publish Date:</span>
                            <span className="tag is-light">
                                {recipe.publishDate}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const ContentView: React.FunctionComponent<{ recipe: Recipe }> = ({
    recipe,
}) => (
    <article className="message is-info" style={{ marginTop: "1.5rem" }}>
        <div className="message-body has-text-grey-dark">
            <div className="columns is-multiline">
                <div className="column is-two-fifths">
                    <ul>
                        {recipe.ingredients
                            .split("\n")
                            .map((ingredient, index) => (
                                <li
                                    key={index}
                                    className={classNames({
                                        "has-text-weight-bold": ingredient.startsWith(
                                            "# "
                                        ),
                                    })}
                                >
                                    {ingredient.startsWith("# ")
                                        ? ingredient.slice(2)
                                        : ingredient}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="column is-three-fifths">
                    <ul>
                        {recipe.directions
                            .split("\n")
                            .map((direction, index) => (
                                <li
                                    key={index}
                                    className={classNames({
                                        "has-text-weight-bold": direction.startsWith(
                                            "# "
                                        ),
                                    })}
                                    style={{ marginBottom: "1rem" }}
                                >
                                    {direction.startsWith("# ")
                                        ? direction.slice(2)
                                        : direction}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    </article>
);

export default RecipeView;
