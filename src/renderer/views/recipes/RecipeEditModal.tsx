import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faCode,
    faCrosshairs,
    faImages,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import * as React from "react";
import CreatableSelect from "react-select/lib/Creatable";
import { RecipeEdit, useRecipeEdit } from "../../core/recipes/recipeEdit";
import { Recipe } from "../../db/recipe";

const RecipeEditModalContainer: React.FunctionComponent<{
    title: string;
    init: Recipe;
    onClose: () => void;
    onSave: (model: Recipe) => void;
}> = ({ init, ...props }) => {
    const recipeEdit = useRecipeEdit(init);
    return <RecipeEditModal recipeEdit={recipeEdit} {...props} />;
};

export default RecipeEditModalContainer;

export const RecipeEditModal: React.FunctionComponent<{
    title: string;
    recipeEdit: RecipeEdit;
    onClose: () => void;
    onSave: (model: Recipe) => void;
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
                    <Tab
                        icon={faInfoCircle}
                        text="Recipe"
                        isActive={recipeEdit.selectedTab === "recipe"}
                        onClick={() => recipeEdit.setSelectedTab("recipe")}
                    />
                    <Tab
                        icon={faImages}
                        text="Media"
                        isActive={recipeEdit.selectedTab === "media"}
                        onClick={() => recipeEdit.setSelectedTab("media")}
                    />
                    <Tab
                        icon={faCode}
                        text="Source"
                        isActive={recipeEdit.selectedTab === "source"}
                        onClick={() => recipeEdit.setSelectedTab("source")}
                    />
                    <Tab
                        icon={faCrosshairs}
                        text="Capture"
                        isActive={recipeEdit.selectedTab === "capture"}
                        onClick={() => recipeEdit.setSelectedTab("capture")}
                    />
                </ul>
            </div>
            <section className="modal-card-body">
                {recipeEdit.selectedTab === "recipe" && (
                    <RecipeTabContent recipeEdit={recipeEdit} />
                )}
                {recipeEdit.selectedTab === "media" && <div>Media</div>}
                {recipeEdit.selectedTab === "source" && <div>Source</div>}
                {recipeEdit.selectedTab === "capture" && <div>Capture</div>}
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
                    disabled={!recipeEdit.isValid}
                    onClick={() => onSave(recipeEdit.recipe)}
                >
                    Save Changes
                </button>
            </footer>
        </div>
    </div>
);

const Tab: React.FunctionComponent<{
    icon: IconProp;
    isActive: boolean;
    onClick: () => void;
    text: string;
}> = props => (
    <li
        className={classNames({ "is-active": props.isActive })}
        onClick={props.onClick}
    >
        <a href="#">
            <span className="icon is-small">
                <FontAwesomeIcon icon={props.icon} />
            </span>
            {props.text}
        </a>
    </li>
);

const RecipeTabContent: React.FunctionComponent<{
    recipeEdit: RecipeEdit;
}> = ({ recipeEdit }) => (
    <>
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
            <div className="column">
                <div className="field">
                    <label className="label">URL</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={recipeEdit.url}
                            onChange={event =>
                                recipeEdit.setUrl(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={recipeEdit.description}
                            onChange={event =>
                                recipeEdit.setDescription(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <div className="field">
                    <label className="label">Tags</label>
                    <div className="control">
                        <TagsEditView recipeEdit={recipeEdit} />
                    </div>
                </div>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <div className="field">
                    <label className="label">Ingredients</label>
                    <div className="control">
                        <textarea
                            rows={Math.max(
                                recipeEdit.ingredients.split("\n").length,
                                3
                            )}
                            className="textarea"
                            value={recipeEdit.ingredients}
                            onChange={event =>
                                recipeEdit.setIngredients(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <div className="field">
                    <label className="label">Directions</label>
                    <div className="control">
                        <textarea
                            rows={Math.max(
                                recipeEdit.directions.split("\n").length,
                                3
                            )}
                            className="textarea"
                            value={recipeEdit.directions}
                            onChange={event =>
                                recipeEdit.setDirections(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <div className="field">
                    <label className="label">Notes</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={recipeEdit.notes}
                            onChange={event =>
                                recipeEdit.setNotes(event.target.value)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
);

const TagsEditView: React.FunctionComponent<{
    recipeEdit: RecipeEdit;
}> = ({ recipeEdit }) => {
    return (
        <div className="columns">
            <div className="column">
                <CreatableSelect
                    isMulti={true}
                    isClearable={false}
                    options={recipeEdit.tags.map(tag => ({
                        label: tag,
                        value: tag,
                    }))}
                    value={recipeEdit.tags.map(tag => ({
                        label: tag,
                        value: tag,
                    }))}
                />
            </div>
        </div>
    );
};
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
