import {
    faCode,
    faComments,
    faCrosshairs,
    faImages,
    faInfoCircle,
    faThList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import * as React from "react";
import {
    isValid,
    Model,
    RecipeEdit,
    useRecipeEdit,
} from "../../core/recipes/recipeEdit";
import { useLocalStore } from "../../store/react";

const RecipeEditModalContainer: React.FunctionComponent<{
    title: string;
    init: Model;
    onClose: () => void;
    onSave: (model: Model) => void;
}> = ({ init, ...props }) => {
    const recipeEdit = useRecipeEdit(useLocalStore(), init);
    return <RecipeEditModal recipeEdit={recipeEdit} {...props} />;
};

export default RecipeEditModalContainer;

export const RecipeEditModal: React.FunctionComponent<{
    title: string;
    recipeEdit: RecipeEdit;
    onClose: () => void;
    onSave: (model: Model) => void;
}> = ({ title, recipeEdit, onClose, onSave }) => (
    <div
        className={classNames({
            modal: true,
            "is-active": true,
        })}
    >
        <div className="modal-background" />
        <div
            className="modal-card"
            style={{
                height: "calc(100% - 6rem)",
                width: "calc(100% - 6rem)",
            }}
        >
            <header className="modal-card-head" style={{ padding: "1rem" }}>
                <p className="modal-card-title is-size-5">{title}</p>
                <button
                    className="delete"
                    aria-label="close"
                    onClick={onClose}
                />
            </header>
            <div
                className="tabs is-centered has-background-white"
                style={{
                    height: "2.5rem",
                    minHeight: "2.5rem",
                    marginBottom: 0,
                }}
            >
                <ul>
                    <li className="is-active">
                        <a href="#">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faThList} />
                            </span>
                            Recipe
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faInfoCircle} />
                            </span>
                            Details
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faComments} />
                            </span>
                            Notes
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faImages} />
                            </span>
                            Media
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faCode} />
                            </span>
                            Source
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faCrosshairs} />
                            </span>
                            Capture
                        </a>
                    </li>
                </ul>
            </div>
            <section className="modal-card-body">
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={recipeEdit.name}
                                    onChange={event =>
                                        recipeEdit.setName(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-two-fifths">
                        <div className="field">
                            <label className="label">Ingredients</label>
                            <div className="control">
                                <textarea
                                    rows={Math.max(
                                        recipeEdit.ingredients.split("\n")
                                            .length,
                                        3
                                    )}
                                    className="textarea"
                                    value={recipeEdit.ingredients}
                                    onChange={event =>
                                        recipeEdit.setIngredients(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-three-fifths">
                        <div className="field">
                            <label className="label">Directions</label>
                            <div className="control">
                                <textarea
                                    rows={Math.max(
                                        recipeEdit.directions.split("\n")
                                            .length,
                                        3
                                    )}
                                    className="textarea"
                                    value={recipeEdit.directions}
                                    onChange={event =>
                                        recipeEdit.setDirections(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer
                className="modal-card-foot"
                style={{
                    padding: "0.75rem",
                    justifyContent: "flex-end",
                }}
            >
                <button className="button" onClick={onClose}>
                    Cancel
                </button>
                <button
                    className="button is-info"
                    disabled={!isValid(recipeEdit)}
                    onClick={() => onSave(recipeEdit)}
                >
                    Save Changes
                </button>
            </footer>
        </div>
    </div>
);

// TODO:
// Star rating, difficulty rating, aggregate rating of other raters (best/worst/value)
// Try Soon/Prepared/Favorite, colored flag
// Creation date, modification date
// Cookbooks & chapters
// Multiple sections?
// Grid for ingredient (and perhaps other) editing (ag-grid or react-data-grid)
// Tags (aka categories), cuisine, keywords
// Servings, yield
// Times: preparation, cooking, inactive (resting), total (ready in), custom
// Oven temperature: F/C
// Source: source, author, page number, web site, webpage (URL), copyright, publish date, publisher, image, custom
// Serving suggestions, suggested wine
// Description (comments, headline), notes, tips
// Ratings, reviews
// Measures
// Nutrition
// Current scale (e.g. 2x)
// Source code: code, warnings, filename, software, file format version, export date
// Images: recipe, ingredients, directions
// Videos
// Attachments
// Custom fields (text, numeric, link)
