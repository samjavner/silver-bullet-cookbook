import * as fs from "fs";
import {
    isFooter,
    isHeader,
    isIngredient,
    isIngredientHeading1,
    isIngredientHeading2,
    parseCategories,
    parseFile,
    parseIngredient,
    parseRecipe,
    parseServingSizePreparationTime,
} from "./parser";

describe("isHeader", () => {
    it("should be true when valid MasterCook header", () => {
        const actual = isHeader("* Exported from MasterCook *");
        expect(actual).toBe(true);
    });

    it("should be true when valid MasterCook II header", () => {
        const actual = isHeader("*  Exported from  MasterCook II  *");
        expect(actual).toBe(true);
    });

    it("should be true when there is added whitespace", () => {
        const actual = isHeader("  *    Exported from MasterCook     *     ");
        expect(actual).toBe(true);
    });

    it("should be false when given an empty string", () => {
        const actual = isHeader("");
        expect(actual).toBe(false);
    });

    it("should be false when the message is not correct", () => {
        const actual = isHeader("* Exported frm MasterCook *");
        expect(actual).toBe(false);
    });

    it("should be false when the asterisks are missing", () => {
        const actual = isHeader("Exported from MasterCook");
        expect(actual).toBe(false);
    });
});

describe("isFooter", () => {
    it("should be true when just enough dashes", () => {
        const actual = isFooter("- - - - - - - - - - - - - - - - - -");
        expect(actual).toBe(true);
    });

    it("should be true when there is surrounding whitespace", () => {
        const actual = isFooter(
            "           - - - - - - - - - - - - - - - - - -           "
        );
        expect(actual).toBe(true);
    });

    it("should be true when there are additional dashes", () => {
        const actual = isFooter(
            "           - - - - - - - - - - - - - - - - - - - - - - - -            "
        );
        expect(actual).toBe(true);
    });

    it("should be false when given an empty string", () => {
        const actual = isFooter("");
        expect(actual).toBe(false);
    });

    it("should be false when given arbitrary text", () => {
        const actual = isFooter("Publisher: Golden West Publishers");
        expect(actual).toBe(false);
    });

    it("should be false when not enough dashes", () => {
        const actual = isFooter("- - - - - - - - - - - - - - - - -");
        expect(actual).toBe(false);
    });
});

describe("parseServingSizePreparationTime", () => {
    it("should return serving size and preparation time", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  : 2     Preparation Time :1:25"
        );
        expect(actual).toEqual(["2", "1:25"]);
    });

    it("should work if there is no serving size", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  :       Preparation Time :1:25"
        );
        expect(actual).toEqual(["", "1:25"]);
    });

    it("should work if there is no preparation time", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  : 2     Preparation Time :"
        );
        expect(actual).toEqual(["2", ""]);
    });

    it("should work if there is no preparation time (and trailing space)", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  : 2     Preparation Time :       "
        );
        expect(actual).toEqual(["2", ""]);
    });

    it("should return serving size when using the entire width", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  :123456 Preparation Time :1:25"
        );
        expect(actual).toEqual(["123456", "1:25"]);
    });

    it("should return serving size and preparation time when there is one less space", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  : 2    Preparation Time :1:25"
        );
        expect(actual).toEqual(["2", "1:25"]);
    });

    it("should work if there is no serving size when there is one less space", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  :      Preparation Time :1:25"
        );
        expect(actual).toEqual(["", "1:25"]);
    });

    it("should work if there is no preparation time when there is one less space", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  : 2    Preparation Time :"
        );
        expect(actual).toEqual(["2", ""]);
    });

    it("should work if there is no preparation time (and trailing space) when there is one less space", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  : 2    Preparation Time :       "
        );
        expect(actual).toEqual(["2", ""]);
    });

    it("should return serving size when using the entire width when there is one less space", () => {
        const actual = parseServingSizePreparationTime(
            "Serving Size  :12345 Preparation Time :1:25"
        );
        expect(actual).toEqual(["12345", "1:25"]);
    });

    it("should return undefined when given an empty string", () => {
        const actual = parseServingSizePreparationTime("");
        expect(actual).toBeUndefined();
    });
});

describe("parseCategories", () => {
    it("should return an empty array when given a categories heading but no categories", () => {
        const actual = parseCategories("Categories    :  ");
        expect(actual).toEqual([]);
    });

    it("should return the category when given a categories heading with one category", () => {
        const actual = parseCategories("Categories    : Bread Machine");
        expect(actual).toEqual(["Bread Machine"]);
    });

    it("should return both categories when given a categories heading with two categories", () => {
        const actual = parseCategories(
            "Categories    : Bread Machine                   Nuts"
        );
        expect(actual).toEqual(["Bread Machine", "Nuts"]);
    });

    it("should return both categories when given no heading with one category", () => {
        const actual = parseCategories("                Bread Machine");
        expect(actual).toEqual(["Bread Machine"]);
    });

    it("should return both categories when given no heading with two categories", () => {
        const actual = parseCategories(
            "                Bread Machine                   Nuts"
        );
        expect(actual).toEqual(["Bread Machine", "Nuts"]);
    });

    it("should return undefined when given an empty string", () => {
        const actual = parseCategories("");
        expect(actual).toBeUndefined();
    });

    it("should return undefined when given one column or less of whitespace", () => {
        const actual = parseCategories("                 ");
        expect(actual).toBeUndefined();
    });

    it("should return undefined when whitespace spans into a second column", () => {
        const actual = parseCategories(
            "                                       "
        );
        expect(actual).toBeUndefined();
    });

    it("should return undefined when given an empty string", () => {
        const actual = parseCategories("");
        expect(actual).toBeUndefined();
    });
});

describe("isIngredientHeading1", () => {
    it("should return true when given the proper heading", () => {
        const actual = isIngredientHeading1(
            "  Amount  Measure       Ingredient -- Preparation Method"
        );
        expect(actual).toBe(true);
    });

    it("should return true when given a heading missing leading whitespace", () => {
        const actual = isIngredientHeading1(
            "Amount  Measure       Ingredient -- Preparation Method"
        );
        expect(actual).toBe(true);
    });

    it("should return true when given a heading with extra trailing whitespace", () => {
        const actual = isIngredientHeading1(
            "  Amount  Measure       Ingredient -- Preparation Method    "
        );
        expect(actual).toBe(true);
    });

    it("should return false when given an empty string", () => {
        const actual = isIngredientHeading1("");
        expect(actual).toBe(false);
    });

    it("should return false when the text is incorrect", () => {
        const actual = isIngredientHeading1(
            "  Xmount  Measure       Ingredient -- Preparation Method"
        );
        expect(actual).toBe(false);
    });
});

describe("isIngredientHeading2", () => {
    it("should return true when given the proper heading", () => {
        const actual = isIngredientHeading2(
            "--------  ------------  --------------------------------"
        );
        expect(actual).toBe(true);
    });

    it("should return true when given a heading missing leading whitespace", () => {
        const actual = isIngredientHeading2(
            "  --------  ------------  --------------------------------"
        );
        expect(actual).toBe(true);
    });

    it("should return true when given a heading with extra trailing whitespace", () => {
        const actual = isIngredientHeading2(
            "--------  ------------  --------------------------------  "
        );
        expect(actual).toBe(true);
    });

    it("should return false when given an empty string", () => {
        const actual = isIngredientHeading2("");
        expect(actual).toBe(false);
    });

    it("should return false when the text is incorrect", () => {
        const actual = isIngredientHeading2(
            "------  ----------  -----------------------------"
        );
        expect(actual).toBe(false);
    });
});

describe("isIngredient", () => {
    it("should return true when given an ingredient with amount and measure", () => {
        const actual = isIngredient("     2/3           Cup  Apples");
        expect(actual).toBe(true);
    });

    it("should return true when given an ingredient with amount only", () => {
        const actual = isIngredient("       3                Apples");
        expect(actual).toBe(true);
    });

    it("should return true when given an ingredient with measure only", () => {
        const actual = isIngredient("                  Some  Apples");
        expect(actual).toBe(true);
    });

    it("should return true when given an ingredient without amount or measure", () => {
        const actual = isIngredient("                        Apples");
        expect(actual).toBe(true);
    });

    it("should return false when given an empty string", () => {
        const actual = isIngredient("");
        expect(actual).toBe(false);
    });

    it("should return false when given whitespace", () => {
        const actual = isIngredient(
            "                                                "
        );
        expect(actual).toBe(false);
    });

    it("should return false when the amount is misaligned to the left", () => {
        const actual = isIngredient("2/3                Cup  Apples");
        expect(actual).toBe(false);
    });

    it("should return false when the amount is misaligned to the right", () => {
        const actual = isIngredient("      2/3          Cup  Apples");
        expect(actual).toBe(false);
    });

    it("should return false when the measure is misaligned to the left", () => {
        const actual = isIngredient("     2/3 Cup            Apples");
        expect(actual).toBe(false);
    });

    it("should return false when the measure is misaligned to the right", () => {
        const actual = isIngredient("     2/3            Cup Apples");
        expect(actual).toBe(false);
    });

    it("should return false when the ingredient is misaligned to the left", () => {
        const actual = isIngredient("     2/3           Cup Apples");
        expect(actual).toBe(false);
    });
});

describe("parseIngredient", () => {
    it("should be correct when given ingredient without preparation method", () => {
        const actual = parseIngredient("     2/3           Cup  Apples");
        expect(actual).toEqual({
            amount: "2/3",
            measure: "Cup",
            text: "Apples",
            preparationMethod: "",
        });
    });

    it("should be correct when given ingredient without preparation method and measure", () => {
        const actual = parseIngredient("       3                Apples");
        expect(actual).toEqual({
            amount: "3",
            measure: "",
            text: "Apples",
            preparationMethod: "",
        });
    });

    it("should be correct when given ingredient without preparation method and amount", () => {
        const actual = parseIngredient("                  Some  Apples");
        expect(actual).toEqual({
            amount: "",
            measure: "Some",
            text: "Apples",
            preparationMethod: "",
        });
    });

    it("should be correct when given ingredient without preparation method, amount, or measure", () => {
        const actual = parseIngredient("                        Apples");
        expect(actual).toEqual({
            amount: "",
            measure: "",
            text: "Apples",
            preparationMethod: "",
        });
    });

    it("should be correct when given ingredient with preparation method", () => {
        const actual = parseIngredient(
            "     1/4           Cup  Margarine Or Butter -- softened"
        );
        expect(actual).toEqual({
            amount: "1/4",
            measure: "Cup",
            text: "Margarine Or Butter",
            preparationMethod: "softened",
        });
    });

    it("should be correct when given ingredient with incorrectly formatted preparation method", () => {
        const actual = parseIngredient(
            "     1/4           Cup  Margarine Or Butter--softened"
        );
        expect(actual).toEqual({
            amount: "1/4",
            measure: "Cup",
            text: "Margarine Or Butter--softened",
            preparationMethod: "",
        });
    });

    it("should be correct when given only a preparation method", () => {
        const actual = parseIngredient("                        -- softened");
        expect(actual).toEqual({
            amount: "",
            measure: "",
            text: "",
            preparationMethod: "softened",
        });
    });
});

describe("parseRecipe", () => {
    it("should return an empty recipe when given no lines", () => {
        const actual = parseRecipe([]);
        expect(actual).toEqual({
            title: undefined,
            recipeBy: undefined,
            servingSize: undefined,
            preparationTime: undefined,
            categories: [],
            ingredients: [],
            directions: [],
            notes: [],
        });
    });

    it("should return an empty recipe when given just a header", () => {
        const actual = parseRecipe(["* Exported from MasterCook *"]);
        expect(actual).toEqual({
            title: undefined,
            recipeBy: undefined,
            servingSize: undefined,
            preparationTime: undefined,
            categories: [],
            ingredients: [],
            directions: [],
            notes: [],
        });
    });
});

describe("parseFile", () => {
    it("should parse correctly", () => {
        const actual = parseFile("src/renderer/formats/mxp/testData/input.mxp");
        const expected = JSON.parse(
            fs
                .readFileSync("src/renderer/formats/mxp/testData/output.json")
                .toString()
        );

        // JSON doesn't have undefined
        expected.forEach((recipe: any) => {
            ["title", "recipeBy", "servingSize", "preparationTime"].forEach(
                property => {
                    if (recipe[property] === undefined) {
                        recipe[property] = undefined;
                    }
                }
            );
        });

        expect(actual).toEqual(expected);
    });
});
