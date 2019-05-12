import { act, renderHook } from "react-hooks-testing-library";
import { recipe1 } from "../../db/recipe.mock";
import { useRecipeEdit } from "./recipeEdit";

describe("recipeEdit", () => {
    describe("recipe", () => {
        it("should pull together all the recipe properties", () => {
            const { result } = renderHook(() => useRecipeEdit(recipe1));
            expect(result.current.recipe).toEqual(recipe1);
        });
    });

    describe("isValid", () => {
        it("is valid when the name has a non-whitespace character", () => {
            const { result } = renderHook(() =>
                useRecipeEdit({ ...recipe1, name: "Test Recipe" })
            );
            expect(result.current.isValid).toBe(true);
        });

        it("is invalid when the name is only whitespace", () => {
            const { result } = renderHook(() =>
                useRecipeEdit({ ...recipe1, name: "    " })
            );
            expect(result.current.isValid).toBe(false);
        });
    });

    it("should set name", () => {
        const { result } = renderHook(() => useRecipeEdit(recipe1));
        act(() => result.current.setName("This is the new name"));
        expect(result.current.name).toBe("This is the new name");
    });

    it("should set url", () => {
        const { result } = renderHook(() => useRecipeEdit(recipe1));
        act(() => result.current.setUrl("https://example.com/new_url"));
        expect(result.current.url).toBe("https://example.com/new_url");
    });

    it("should set description", () => {
        const { result } = renderHook(() => useRecipeEdit(recipe1));
        act(() => result.current.setDescription("This is the new description"));
        expect(result.current.description).toBe("This is the new description");
    });

    it("should set ingredients", () => {
        const { result } = renderHook(() => useRecipeEdit(recipe1));
        act(() => result.current.setIngredients("New ingredients!"));
        expect(result.current.ingredients).toBe("New ingredients!");
    });

    it("should set directions", () => {
        const { result } = renderHook(() => useRecipeEdit(recipe1));
        act(() => result.current.setDirections("New directions!"));
        expect(result.current.directions).toBe("New directions!");
    });

    it("should set notes", () => {
        const { result } = renderHook(() => useRecipeEdit(recipe1));
        act(() => result.current.setNotes("This is the new notes"));
        expect(result.current.notes).toBe("This is the new notes");
    });

    it("should set selectedTab", () => {
        const { result } = renderHook(() => useRecipeEdit(recipe1));
        act(() => result.current.setSelectedTab("source"));
        expect(result.current.selectedTab).toBe("source");
    });
});
