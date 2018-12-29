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
    close: () => void;
    save: (model: Model) => void;
}> = ({ init, ...props }) => {
    const recipeEdit = useRecipeEdit(useLocalStore(), init);
    return <RecipeEditModal recipeEdit={recipeEdit} {...props} />;
};

export default RecipeEditModalContainer;

export const RecipeEditModal: React.FunctionComponent<{
    title: string;
    recipeEdit: RecipeEdit;
    close: () => void;
    save: (model: Model) => void;
}> = ({ title, recipeEdit, close, save }) => (
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
                height: "calc(100% - 8rem)",
                width: "calc(100% - 8rem)",
            }}
        >
            <header className="modal-card-head">
                <p className="modal-card-title">{title}</p>
                <button className="delete" aria-label="close" onClick={close} />
            </header>
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
            <footer className="modal-card-foot">
                <button
                    className="button is-success"
                    disabled={!isValid(recipeEdit)}
                    onClick={() => save(recipeEdit)}
                >
                    Save Changes
                </button>
                <button className="button" onClick={close}>
                    Cancel
                </button>
            </footer>
        </div>
    </div>
);
