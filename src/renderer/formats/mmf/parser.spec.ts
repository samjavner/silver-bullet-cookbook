import * as fs from "fs";
import {
    arrangeIngredientText,
    isFooter,
    isIngredient,
    isIngredientHeading,
    parseCategories,
    parseDirections,
    parseFile,
    parseHeader,
    parseIngredient,
    parseIngredientHeading,
    parseRecipe,
} from "./parser";

describe("parseHeader", () => {
    it("should be normal when given a valid header", () => {
        const actual = parseHeader(
            "---------- Recipe via Meal-Master (tm) v8.05"
        );
        expect(actual).toBe("normal");
    });

    it("should be normal when given a valid alternate style header", () => {
        const actual = parseHeader(
            "MMMMM----- Recipe via Meal-Master (tm) v8.05"
        );
        expect(actual).toBe("normal");
    });

    it("should be normal when given a Now You're Cooking! style header", () => {
        const actual = parseHeader(
            "----- Now You're Cooking! v4.72 [Meal-Master Export Format]"
        );
        expect(actual).toBe("normal");
    });

    it("should be extracted when given a Recipe Extracted from Meal-Master (tm) Database style header", () => {
        const actual = parseHeader(
            "------------- Recipe Extracted from Meal-Master (tm) Database --------------"
        );
        expect(actual).toBe("extracted");
    });

    it("should be extracted when given a Recipe Extracted from Meal-Master (tm) 6.14 style header", () => {
        const actual = parseHeader(
            "------------- Recipe Extracted from Meal-Master (tm) v6.14 ------------------"
        );
        expect(actual).toBe("extracted");
    });

    it("should be undefined when no text string following", () => {
        const actual = parseHeader("----------");
        expect(actual).toBeUndefined();
    });

    it("should be undefined when no text string following", () => {
        const actual = parseHeader("MMMMM-----");
        expect(actual).toBeUndefined();
    });

    it("should be undefined when the text does not contain 'Meal-Master'", () => {
        const actual = parseHeader("---------- Recipe via Something Else!");
        expect(actual).toBeUndefined();
    });

    it("should be undefined when the text does not contain 'Meal-Master'", () => {
        const actual = parseHeader("MMMMM----- Recipe via Something Else!");
        expect(actual).toBeUndefined();
    });

    it("should be undefined when an empty string", () => {
        const actual = parseHeader("");
        expect(actual).toBeUndefined();
    });

    it("should be undefined when given an alternate style header with lower case M's", () => {
        const actual = parseHeader(
            "mmmmm----- Recipe via Meal-Master (tm) v8.05"
        );
        expect(actual).toBeUndefined();
    });
});

describe("isIngredient", () => {
    // An ingredient line in an mmf recipe consists of a line with:
    // A 7 digit column of numbers (spaces / and . allowed)
    // A 1 space separator
    // A 2 character column for the unit (spaces allowed)
    // A 1 space separator
    // Any number of additional characters

    // Ingredient and ingredient heading detection should strive for correctness --
    // Not so permissive that the ingredients end up including part of the directions,
    // but not so strict that the directions end up including part of the ingredients.

    it("should be true when simple ingredient with valid unit", () => {
        const actual = isIngredient({ strict: true })("      1 qt Milk");
        expect(actual).toBe(true);
    });

    it("should be true when simple ingredient with gl unit", () => {
        const actual = isIngredient({ strict: true })("      1 gl Milk");
        expect(actual).toBe(true);
    });

    it("should be true when quantity is a fraction", () => {
        const actual = isIngredient({ strict: true })(
            "  1 1/2 c  Whipped cream"
        );
        expect(actual).toBe(true);
    });

    it("should be true when quantity is a decimal", () => {
        const actual = isIngredient({ strict: true })("    1.5 qt Milk");
        expect(actual).toBe(true);
    });

    it("should be true when there is no unit", () => {
        const actual = isIngredient({ strict: true })(
            "      1    Vanilla bean"
        );
        expect(actual).toBe(true);
    });

    it("should be true when there is no quantity", () => {
        const actual = isIngredient({ strict: true })("        x  Salt");
        expect(actual).toBe(true);
    });

    it("should be true when there is no unit or quantity", () => {
        const actual = isIngredient({ strict: true })(
            "           Raisins (optional)"
        );
        expect(actual).toBe(true);
    });

    it("should be true when there are two columns", () => {
        const actual = isIngredient({ strict: true })(
            "      1 c  Oil                                 1 t  Baking soda"
        );
        expect(actual).toBe(true);
    });

    it("should be true when given range (as exported by Living Cookbook", () => {
        const actual = isIngredient({ strict: true })(
            "    4-6 oz extra virgin olive oil"
        );
        expect(actual).toBe(true);
    });

    it("should be false when empty string", () => {
        const actual = isIngredient({ strict: false })("");
        expect(actual).toBe(false);
    });

    it("should be false when given a sufficently long whitepsace string", () => {
        const actual = isIngredient({ strict: false })("                   ");
        expect(actual).toBe(false);
    });

    it("should be false when arbitrary recipe text", () => {
        const actual = isIngredient({ strict: false })(
            "In large bowl, blend oil and sugars on low until well mixed. Add"
        );
        expect(actual).toBe(false);
    });

    it("should be false when the column intended for the quantity contains letters", () => {
        const actual = isIngredient({ strict: false })("     ab qt Milk");
        expect(actual).toBe(false);
    });

    it("should be false when an ingredient heading", () => {
        const actual = isIngredient({ strict: false })(
            "--------------------------------COOKIE--------------------------------"
        );
        expect(actual).toBe(false);
    });

    it("should be false when there are two columns but the second column is not valid", () => {
        const actual = isIngredient({ strict: false })(
            "      1 c  Oil                                 a t  Baking soda"
        );
        expect(actual).toBe(false);
    });

    describe("when strict", () => {
        it("should be false when unit is invalid", () => {
            const actual = isIngredient({ strict: true })(
                "     1. In the first step"
            );
            expect(actual).toBe(false);
        });
    });

    describe("when not strict", () => {
        it("should be true when unit is invalid", () => {
            const actual = isIngredient({ strict: false })(
                "     1. In the first step"
            );
            expect(actual).toBe(true);
        });
    });
});

describe("isIngredientHeading", () => {
    // An ingredient heading outputted by Meal-Master should be a "full width" line
    // padded by dashes possibly with a leading "MMMMM"

    it("should be true when typical heading", () => {
        const actual = isIngredientHeading(
            "--------------------------------COOKIE--------------------------------"
        );
        expect(actual).toBe(true);
    });

    it("should be true when typical heading with trailing whitespace", () => {
        const actual = isIngredientHeading(
            "--------------------------------COOKIE--------------------------------     "
        );
        expect(actual).toBe(true);
    });

    it("should be true when heading with leading MMMMM", () => {
        const actual = isIngredientHeading(
            "MMMMM---------------------------COOKIE--------------------------------"
        );
        expect(actual).toBe(true);
    });

    it("should be true when heading with at least 5 leading and trailing dashes", () => {
        const actual = isIngredientHeading("-----COOKIE-----");
        expect(actual).toBe(true);
    });

    it("should be true when heading with leading MMMMM and at least 5 leading and trailing dashes", () => {
        const actual = isIngredientHeading("MMMMM-----COOKIE-----");
        expect(actual).toBe(true);
    });

    it("should be true when the heading text contains a dash", () => {
        const actual = isIngredientHeading(
            "MMMMM----------------------PATTI - VDRJ67A---------------------------"
        );
        expect(actual).toBe(true);
    });

    it("should be false when empty string", () => {
        const actual = isIngredientHeading("");
        expect(actual).toBe(false);
    });

    it("should be false when there are fewer than 5 leading Ms", () => {
        const actual = isIngredientHeading(
            "MMMM---------------------------COOKIE--------------------------------"
        );
        expect(actual).toBe(false);
    });

    it("should be false when there are more than 5 leading Ms", () => {
        const actual = isIngredientHeading(
            "MMMMMM---------------------------COOKIE--------------------------------"
        );
        expect(actual).toBe(false);
    });

    it("should be false when there are fewer than 5 leading dashes", () => {
        const actual = isIngredientHeading(
            "----COOKIE--------------------------------"
        );
        expect(actual).toBe(false);
    });

    it("should be false when there are fewer than 5 trailing dashes", () => {
        const actual = isIngredientHeading(
            "--------------------------------COOKIE----"
        );
        expect(actual).toBe(false);
    });

    it("should be false when there aren't enough leading or trailing dashes", () => {
        const actual = isIngredientHeading("----COOKIE----");
        expect(actual).toBe(false);
    });

    it("should be false when an ingredient", () => {
        const actual = isIngredientHeading("      1 qt Milk");
        expect(actual).toBe(false);
    });

    it("should be false when the recipe footer", () => {
        const actual = isIngredientHeading("-----");
        expect(actual).toBe(false);
    });

    it("should be false when the alternate recipe footer", () => {
        const actual = isIngredientHeading("MMMMM");
        expect(actual).toBe(false);
    });
});

describe("isFooter", () => {
    describe("when normal style header", () => {
        it("should be true when '-----'", () => {
            const actual = isFooter({ headerStyle: "normal" })("-----");
            expect(actual).toBe(true);
        });

        it("should be true when 'MMMMM'", () => {
            const actual = isFooter({ headerStyle: "normal" })("MMMMM");
            expect(actual).toBe(true);
        });

        it("should be false when empty string", () => {
            const actual = isFooter({ headerStyle: "normal" })("");
            expect(actual).toBe(false);
        });

        it("should be false when leading space", () => {
            const actual = isFooter({ headerStyle: "normal" })(" -----");
            expect(actual).toBe(false);
        });

        it("should be false when trailing space", () => {
            const actual = isFooter({ headerStyle: "normal" })("----- ");
            expect(actual).toBe(false);
        });

        it("should be false when extra dash", () => {
            const actual = isFooter({ headerStyle: "normal" })("------");
            expect(actual).toBe(false);
        });

        it("should be false when missing dash", () => {
            const actual = isFooter({ headerStyle: "normal" })("----");
            expect(actual).toBe(false);
        });

        it("should be false when extra M", () => {
            const actual = isFooter({ headerStyle: "normal" })("MMMMMM");
            expect(actual).toBe(false);
        });

        it("should be false when missing m", () => {
            const actual = isFooter({ headerStyle: "normal" })("MMMM");
            expect(actual).toBe(false);
        });

        it("should be false when M is lowercase", () => {
            const actual = isFooter({ headerStyle: "normal" })("mmmmm");
            expect(actual).toBe(false);
        });

        it("should be false when extra text is present", () => {
            const actual = isFooter({ headerStyle: "normal" })("-----Text");
            expect(actual).toBe(false);
        });
    });

    describe("when header was not found", () => {
        it("should be true when '-----'", () => {
            const actual = isFooter({ headerStyle: undefined })("-----");
            expect(actual).toBe(true);
        });
    });

    describe("when extracted style header", () => {
        it("should be false when '-----'", () => {
            const actual = isFooter({ headerStyle: "extracted" })("-----");
            expect(actual).toBe(false);
        });

        it("should be true when valid footer for style", () => {
            const actual = isFooter({ headerStyle: "extracted" })(
                "-----------------------------------------------------------------------------"
            );
            expect(actual).toBe(true);
        });
    });
});

describe("parseCategories", () => {
    it("should be an empty list when the category is specified as 'None'", () => {
        const actual = parseCategories({ headerStyle: "normal" })("None");
        expect(actual).toEqual([]);
    });

    it("should be an empty list when the category is specified as 'None' regardless of capitalization", () => {
        const actual = parseCategories({ headerStyle: "normal" })("NONE");
        expect(actual).toEqual([]);
    });

    it("should be a list with one category when there is one category", () => {
        const actual = parseCategories({ headerStyle: "normal" })("Dessert");
        expect(actual).toEqual(["Dessert"]);
    });

    it("should be a list of the categories when given multiple categories", () => {
        const actual = parseCategories({ headerStyle: "normal" })(
            "Dessert,Italian,Easy"
        );
        expect(actual).toEqual(["Dessert", "Italian", "Easy"]);
    });

    it("should be a list of the categories when given multiple categories with spaces between", () => {
        const actual = parseCategories({ headerStyle: "normal" })(
            "Dessert, Italian, Easy"
        );
        expect(actual).toEqual(["Dessert", "Italian", "Easy"]);
    });

    it("should be a list of the categories when given multiple categories with many spaces between", () => {
        const actual = parseCategories({ headerStyle: "normal" })(
            "   Dessert   ,   Italian   ,   Easy   "
        );
        expect(actual).toEqual(["Dessert", "Italian", "Easy"]);
    });

    it("should remove extra spaces from category names", () => {
        const actual = parseCategories({ headerStyle: "normal" })(
            " Italian, Main   dish"
        );
        expect(actual).toEqual(["Italian", "Main dish"]);
    });

    describe("when header not found", () => {
        it("should be a list of the categories when given multiple categories", () => {
            const actual = parseCategories({ headerStyle: undefined })(
                "Dessert,Italian,Easy"
            );
            expect(actual).toEqual(["Dessert", "Italian", "Easy"]);
        });
    });

    describe("when extracted style header", () => {
        it("should be a list with one category when there is one category", () => {
            const actual = parseCategories({ headerStyle: "extracted" })(
                "Dessert"
            );
            expect(actual).toEqual(["Dessert"]);
        });

        it("should split on space when given multiple categories", () => {
            const actual = parseCategories({ headerStyle: "extracted" })(
                "Dessert Italian Easy"
            );
            expect(actual).toEqual(["Dessert", "Italian", "Easy"]);
        });
    });
});

describe("arrangeIngredientText", () => {
    it("should return an empty array when given an empty array", () => {
        const actual = arrangeIngredientText([]);
        expect(actual).toEqual([]);
    });

    it("should return an empty array when given an empty line", () => {
        const actual = arrangeIngredientText(["            "]);
        expect(actual).toEqual([]);
    });

    it("should return an empty array when given multiple empty lines", () => {
        const actual = arrangeIngredientText(["     ", "", "              "]);
        expect(actual).toEqual([]);
    });

    it("should return the array as is when give a simple one column array", () => {
        const actual = arrangeIngredientText([
            "      1 qt Milk",
            "      1 pt Heavy cream",
            "    1/2 ts Salt",
            "      1    Vanilla bean",
            "    3/4 c  Long-grained rice",
            "      1 c  Granulated sugar",
            "      1    Egg yolk",
            "  1 1/2 c  Whipped cream",
            "           Raisins (optional)",
        ]);
        expect(actual).toEqual([
            "      1 qt Milk",
            "      1 pt Heavy cream",
            "    1/2 ts Salt",
            "      1    Vanilla bean",
            "    3/4 c  Long-grained rice",
            "      1 c  Granulated sugar",
            "      1    Egg yolk",
            "  1 1/2 c  Whipped cream",
            "           Raisins (optional)",
        ]);
    });

    it("should return the array as is when give a simple one column array with extra empty lines", () => {
        const actual = arrangeIngredientText([
            "  ",
            "      1 qt Milk",
            "      1 pt Heavy cream",
            "    1/2 ts Salt",
            "      1    Vanilla bean",
            "    3/4 c  Long-grained rice",
            "  ",
            "      1 c  Granulated sugar",
            "      1    Egg yolk",
            "  1 1/2 c  Whipped cream",
            "           Raisins (optional)",
            "  ",
        ]);
        expect(actual).toEqual([
            "      1 qt Milk",
            "      1 pt Heavy cream",
            "    1/2 ts Salt",
            "      1    Vanilla bean",
            "    3/4 c  Long-grained rice",
            "      1 c  Granulated sugar",
            "      1    Egg yolk",
            "  1 1/2 c  Whipped cream",
            "           Raisins (optional)",
        ]);
    });

    it("should return the array as is with empty lines removed when given a one column array with headings", () => {
        const actual = arrangeIngredientText([
            "--------------------------------FOR THE PIE--------------------------------",
            "  1 1/2 c  All-Purpose Flour",
            "    1/2 ts Salt",
            "    1/2 c  Shortening",
            "      5 tb ICE Water",
            "      8 c  Apples [peeled & sliced]",
            "    1/4 c  Granulated Sugar",
            "      2 tb All-Purpose Flour",
            "    1/2 ts Nutmeg, Ground",
            "      2 tb Lemon Juice",
            "      1 ts Cinnamon, Ground",
            "",
            "------------------------------FOR THE TOPPING------------------------------",
            "    1/2 c  Granulated Sugar",
            "    1/2 c  All-Purpose Flour",
            "    1/3 c  Butter",
            "      1 lg Paper Bag",
            "           Vanilla Ice Cream",
            "  ",
        ]);
        expect(actual).toEqual([
            "--------------------------------FOR THE PIE--------------------------------",
            "  1 1/2 c  All-Purpose Flour",
            "    1/2 ts Salt",
            "    1/2 c  Shortening",
            "      5 tb ICE Water",
            "      8 c  Apples [peeled & sliced]",
            "    1/4 c  Granulated Sugar",
            "      2 tb All-Purpose Flour",
            "    1/2 ts Nutmeg, Ground",
            "      2 tb Lemon Juice",
            "      1 ts Cinnamon, Ground",
            "------------------------------FOR THE TOPPING------------------------------",
            "    1/2 c  Granulated Sugar",
            "    1/2 c  All-Purpose Flour",
            "    1/3 c  Butter",
            "      1 lg Paper Bag",
            "           Vanilla Ice Cream",
        ]);
    });

    it("should return the first column followed by the second column when given a two column array", () => {
        const actual = arrangeIngredientText([
            "  1 1/2 lb Hamburger                           1 ds Salt",
            "      1 c  Onion; chopped                    1/2 c  Water",
            "      1 c  Green pepper; chopped             1/8 t  Hot pepper sauce",
            "      1 ea Garlic clove                        1 pk Spaghetti sauce mix (1.5oz)",
            "    1/2 t  Oregano                             2 ea Eggs",
            "      1 c  Milk                              1/2 t  Salt",
            "      1 c  Flour                             1/2 c  Parmesan cheese; grated",
            "      1 T  Oil",
            "",
        ]);
        expect(actual).toEqual([
            "  1 1/2 lb Hamburger",
            "      1 c  Onion; chopped",
            "      1 c  Green pepper; chopped",
            "      1 ea Garlic clove",
            "    1/2 t  Oregano",
            "      1 c  Milk",
            "      1 c  Flour",
            "      1 T  Oil",
            "      1 ds Salt",
            "    1/2 c  Water",
            "    1/8 t  Hot pepper sauce",
            "      1 pk Spaghetti sauce mix (1.5oz)",
            "      2 ea Eggs",
            "    1/2 t  Salt",
            "    1/2 c  Parmesan cheese; grated",
        ]);
    });

    it(
        "should return the first column followed by the second column in each section " +
            "when given a two column array with headings",
        () => {
            const actual = arrangeIngredientText([
                "MMMMM--------------------------FILLING-------------------------------",
                "  1 1/2 lb Hamburger                           1 ds Salt",
                "      1 c  Onion; chopped                    1/2 c  Water",
                "      1 c  Green pepper; chopped             1/8 t  Hot pepper sauce",
                "      1 ea Garlic clove                        1 pk Spaghetti sauce mix (1.5oz)",
                "    1/2 t  Oregano",
                "",
                "MMMMM---------------------------BATTER--------------------------------",
                "      1 c  Milk                                2 ea Eggs",
                "      1 c  Flour                             1/2 t  Salt",
                "      1 T  Oil",
                "",
                "MMMMM----------------------------MISC---------------------------------",
                "      7 oz Jack/Mozz. cheese slices          1/2 c  Parmesan cheese; grated",
                "",
            ]);
            expect(actual).toEqual([
                "MMMMM--------------------------FILLING-------------------------------",
                "  1 1/2 lb Hamburger",
                "      1 c  Onion; chopped",
                "      1 c  Green pepper; chopped",
                "      1 ea Garlic clove",
                "    1/2 t  Oregano",
                "      1 ds Salt",
                "    1/2 c  Water",
                "    1/8 t  Hot pepper sauce",
                "      1 pk Spaghetti sauce mix (1.5oz)",
                "MMMMM---------------------------BATTER--------------------------------",
                "      1 c  Milk",
                "      1 c  Flour",
                "      1 T  Oil",
                "      2 ea Eggs",
                "    1/2 t  Salt",
                "MMMMM----------------------------MISC---------------------------------",
                "      7 oz Jack/Mozz. cheese slices",
                "    1/2 c  Parmesan cheese; grated",
            ]);
        }
    );

    it("should combine lines when given a one column array with line continuations", () => {
        const actual = arrangeIngredientText([
            "      2 lb Ground round",
            "      1 lb Bulk Italian sausage",
            '      4 c  "Basic Brown Soup Stock"',
            "           -or canned beef broth",
            "      1 ts Saffron threads",
            "      3 tb -Olive oil",
            "      2 c  Shallots; chopped coarse",
            "      2 tb Garlic; chopped fine",
            "      1 cn (10-oz) green chiles;",
            "           - chopped fine",
            "MMMMM--------------------------HEADING-------------------------------",
            "      1 ts Oregano",
            "      1 ts Whole cumin seeds",
            "    1/2 ts Cayenne pepper",
            "      2 tb Chili powder",
            "      1 ts Salt",
            "           Fresh ground",
            "           -black pepper to",
            "           -taste",
            "      1 cn (6-oz) tomato paste",
            "      1 cn (30-oz) red kidney beans",
            "           -drained",
        ]);
        expect(actual).toEqual([
            "      2 lb Ground round",
            "      1 lb Bulk Italian sausage",
            '      4 c  "Basic Brown Soup Stock" or canned beef broth',
            "      1 ts Saffron threads",
            "      3 tb -Olive oil",
            "      2 c  Shallots; chopped coarse",
            "      2 tb Garlic; chopped fine",
            "      1 cn (10-oz) green chiles; chopped fine",
            "MMMMM--------------------------HEADING-------------------------------",
            "      1 ts Oregano",
            "      1 ts Whole cumin seeds",
            "    1/2 ts Cayenne pepper",
            "      2 tb Chili powder",
            "      1 ts Salt",
            "           Fresh ground black pepper to taste",
            "      1 cn (6-oz) tomato paste",
            "      1 cn (30-oz) red kidney beans drained",
        ]);
    });

    it("should combine lines when given a two column array with line continuations", () => {
        const actual = arrangeIngredientText([
            "      1 lg Artichoke; -=OR=-                        - and thinly sliced",
            "      2 md -Artichokes                         6    Leaves butter lettuce",
            '      1 c  Water; acidulated with                   - sliced into 1/4" strips',
            "           - the juice of                           -=OR=- a handful of",
            "      1    Lemon                                    - Sorrel leaves, sliced",
            "      2    Garlic cloves                       1 tb Chopped parsley",
            "      1 tb Virgin olive oil                    2    Mint leaves; chopped",
            "      1 lg Leek; white part only -=OR=-             Salt",
            "      2 md Leeks, white part only          5 1/2 c  Water",
            "           - washed and sliced                 1 lb Fresh peas; shucked, -=OR=-",
            "      1 sm New potato; quartered               1 c  -Frozen peas",
            "",
            "MMMMM-------------------------GARNISHES------------------------------",
            "           Freshly ground pepper                    Extra-virgin olive oil",
            "           Chopped chervil                          Parmigiano-Reggiano",
            "           -=OR=- Chopped Parsley                   - freshly grated",
        ]);
        expect(actual).toEqual([
            "      1 lg Artichoke; -=OR=-",
            "      2 md -Artichokes",
            "      1 c  Water; acidulated with the juice of",
            "      1    Lemon",
            "      2    Garlic cloves",
            "      1 tb Virgin olive oil",
            "      1 lg Leek; white part only -=OR=-",
            "      2 md Leeks, white part only washed and sliced",
            "      1 sm New potato; quartered and thinly sliced",
            '      6    Leaves butter lettuce sliced into 1/4" strips =OR=- a handful of Sorrel leaves, sliced',
            "      1 tb Chopped parsley",
            "      2    Mint leaves; chopped",
            "           Salt",
            "  5 1/2 c  Water",
            "      1 lb Fresh peas; shucked, -=OR=-",
            "      1 c  -Frozen peas",
            "MMMMM-------------------------GARNISHES------------------------------",
            "           Freshly ground pepper",
            "           Chopped chervil =OR=- Chopped Parsley",
            "           Extra-virgin olive oil",
            "           Parmigiano-Reggiano freshly grated",
        ]);
    });
});

describe("parseIngredient", () => {
    it("should return all empty strings when given an empty string", () => {
        const actual = parseIngredient("");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "",
            unit: "",
            text: "",
        });
    });

    it("should return all empty strings when given whitespace", () => {
        const actual = parseIngredient("                           ");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "",
            unit: "",
            text: "",
        });
    });

    it("should return all the text in text when given an invalid ingredient", () => {
        // invalid because units are only two letters in mmf format
        const actual = parseIngredient("  1 1/2 cups yogurt  ");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "",
            unit: "",
            text: "1 1/2 cups yogurt",
        });
    });

    it("should split the text properly when given a valid ingredient", () => {
        const actual = parseIngredient("3 11/16 qt Milk");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "3 11/16",
            unit: "qt",
            text: "Milk",
        });
    });

    it("should trim the text properly when given a valid ingredient", () => {
        const actual = parseIngredient("      1  c Milk");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "1",
            unit: "c",
            text: "Milk",
        });
    });

    it("should trim the text properly when given a valid ingredient with excess whitespace", () => {
        const actual = parseIngredient("      1  c     Milk      ");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "1",
            unit: "c",
            text: "Milk",
        });
    });

    it("should trim the text properly when given a valid ingredient without quantity or unit", () => {
        const actual = parseIngredient("           Raisins (optional)");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "",
            unit: "",
            text: "Raisins (optional)",
        });
    });

    it("should remove extra spaces from the quantity", () => {
        const actual = parseIngredient(" 1  1/2  c     Milk      ");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "1 1/2",
            unit: "c",
            text: "Milk",
        });
    });

    it("should remove extra spaces from the ingreient text", () => {
        const actual = parseIngredient("      2  c     Greek    yogurt");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "2",
            unit: "c",
            text: "Greek yogurt",
        });
    });

    it("should correct C to c", () => {
        const actual = parseIngredient("      1  C Milk");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "1",
            unit: "c",
            text: "Milk",
        });
    });

    it("should not correct T to t", () => {
        const actual = parseIngredient("      1  T Milk");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "1",
            unit: "T",
            text: "Milk",
        });
    });

    it("should correct gl to ga (living cookbook exports as gl)", () => {
        const actual = parseIngredient("      1 gl Milk");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "1",
            unit: "ga",
            text: "Milk",
        });
    });

    it("should parse when given range (as exported by Living Cookbook", () => {
        const actual = parseIngredient("    4-6 oz extra virgin olive oil");
        expect(actual).toEqual({
            type: "ingredient",
            quantity: "4-6",
            unit: "oz",
            text: "extra virgin olive oil",
        });
    });
});

describe("parseIngredientHeading", () => {
    it("should return an empty string when given an empty string", () => {
        const actual = parseIngredientHeading("");
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "",
        });
    });

    it("should return the provided text with whitespace trimmed when not an actual heading", () => {
        const actual = parseIngredientHeading("   This is just some text.    ");
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "This is just some text.",
        });
    });

    it("should return the heading text when given a valid heading", () => {
        const actual = parseIngredientHeading(
            "--------------------------------COOKIE--------------------------------"
        );
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "COOKIE",
        });
    });

    it("should return the heading text when given a minimum heading", () => {
        const actual = parseIngredientHeading("-----COOKIE-----");
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "COOKIE",
        });
    });

    it("should return the heading text when given a valid MMMMM heading", () => {
        const actual = parseIngredientHeading(
            "MMMMM---------------------------COOKIE--------------------------------"
        );
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "COOKIE",
        });
    });

    it("should return the heading text when given a minimum MMMMM heading", () => {
        const actual = parseIngredientHeading("MMMMM-----COOKIE-----");
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "COOKIE",
        });
    });

    it("should return the heading text when given a heading with extra whitespace", () => {
        const actual = parseIngredientHeading(
            "-------------------------  This is a  heading.        --------------------------------"
        );
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "This is a  heading.",
        });
    });

    it("should return the heading text when given a heading with a dash", () => {
        const actual = parseIngredientHeading(
            "MMMMM----------------------PATTI - VDRJ67A---------------------------"
        );
        expect(actual).toEqual({
            type: "ingredient_heading",
            text: "PATTI - VDRJ67A",
        });
    });
});

describe("parseDirections", () => {
    it("should return an empty array when given an empty array", () => {
        const actual = parseDirections([]);
        expect(actual).toEqual([]);
    });

    it("should return an empty array when given only empty lines", () => {
        const actual = parseDirections(["    ", "", "                    "]);
        expect(actual).toEqual([]);
    });

    it("should trim whitespace when given a single sentence", () => {
        const actual = parseDirections(["  Brown cut up pieces of meat.  "]);
        expect(actual).toEqual(["Brown cut up pieces of meat."]);
    });

    it("should remove extra spaces from within text", () => {
        const actual = parseDirections([
            "  Brown   cut    up    pieces of  meat.  ",
        ]);
        expect(actual).toEqual(["Brown cut up pieces of meat."]);
    });

    it("should remove empty lines when there are extra empty lines", () => {
        const actual = parseDirections([
            "  ",
            "  ",
            "  Do this.",
            "  ",
            "  ",
            "  Then that.",
            "  ",
            "  ",
        ]);
        expect(actual).toEqual(["Do this.", "Then that."]);
    });

    it("should join lines together when given a paragraph", () => {
        const actual = parseDirections([
            "  Brown cut up pieces of meat.Season with chili powder,salt and black",
            "  pepper.Add chopped vegetables and V - 8 vegetable juice. Add ketchup",
            "  and Worcestershire sauce to taste.",
        ]);
        expect(actual).toEqual([
            "Brown cut up pieces of meat.Season with chili powder,salt and black pepper.Add chopped vegetables" +
                " and V - 8 vegetable juice. Add ketchup and Worcestershire sauce to taste.",
        ]);
    });

    it("should join lines together when given multiple paragraphs separated by empty lines", () => {
        const actual = parseDirections([
            "  The kind of chiles that you use determine the final flavor, you can",
            "  experiment with different kinds or mixing the different kinds of chiles.",
            "  But this is the basic recipe for prepare salsas with dry chiles.",
            "  ",
            "  Wash the chiles in water and discard the seeds and threads of chiles. Let",
            "  stand in water at least 2 or 3 hours or all the night, if you do not have",
            "  time let the chiles in warm water at least 30 min.",
            "  ",
            "  Then ground with the other ingredients.",
        ]);
        expect(actual).toEqual([
            "The kind of chiles that you use determine the final flavor, you can experiment with different kinds or mix" +
                "ing the different kinds of chiles. But this is the basic recipe for prepare salsas with dry chiles.",
            "Wash the chiles in water and discard the seeds and threads of chiles. Let stand in water at least 2 or 3 " +
                "hours or all the night, if you do not have time let the chiles in warm water at least 30 min.",
            "Then ground with the other ingredients.",
        ]);
    });

    it("should join lines together when given multiple paragraphs separated by DC4", () => {
        // Some recipes use DC4/Device Control Four/U+0014 as a paragraph separator.
        const actual = parseDirections([
            "  The kind of chiles that you use determine the final flavor, you can",
            "  experiment with different kinds or mixing the different kinds of chiles.",
            "  But this is the basic recipe for prepare salsas with dry chiles.\u0014",
            "  Wash the chiles in water and discard the seeds and threads of chiles. Let",
            "  stand in water at least 2 or 3 hours or all the night, if you do not have",
            "  time let the chiles in warm water at least 30 min.\u0014",
            "  Then ground with the other ingredients.",
        ]);
        expect(actual).toEqual([
            "The kind of chiles that you use determine the final flavor, you can experiment with different kinds or mix" +
                "ing the different kinds of chiles. But this is the basic recipe for prepare salsas with dry chiles.",
            "Wash the chiles in water and discard the seeds and threads of chiles. Let stand in water at least 2 or 3 " +
                "hours or all the night, if you do not have time let the chiles in warm water at least 30 min.",
            "Then ground with the other ingredients.",
        ]);
    });

    it("should try to 'detect' paragraphs by starting a new line if less than 62 characters (for max of 78)", () => {
        const actual = parseDirections([
            "  Cream margarine in a large bowl; gradually add sugar substitute, beating",
            "  at medium speed of an electric mixer until light and fluffy. Add eggs, and",
            "  beat until thick and lemon colored.",
            "      Combine flour and baking powder; add to creamed mixture, mixing well.",
            "  Fold in bananas and apple.",
            "      Spoon batter into an 8 1/2 x 4 1/2 x 3 inch loaf pan coated with cooking",
            "  spray.",
            "      Bake at 350 degrees F for 1 hour and 5 minutes to 1 hour and 10 minutes",
            "  or until a wooden pick inserted in center comes out clean. Cool in pan 10",
            "  minutes; remove from pan, and cool completely on a wire rack. Makes 1 loaf",
            "  (16 slices).",
            "  12345678901234567890123456789012345678901234567890123456789",
            "  12345678901234567890123456789012345678901234567890123456789     ",
            "  123456789012345678901234567890123456789012345678901234567890",
            "  12345",
            "  ",
            "  67890",
            "  1234567890123456789012345678901234567890123456789012345678901234567890",
            "  ",
            "  xyz",
        ]);
        expect(actual).toEqual([
            "Cream margarine in a large bowl; gradually add sugar substitute, beating at medium speed " +
                "of an electric mixer until light and fluffy. Add eggs, and beat until thick and lemon colored.",
            "Combine flour and baking powder; add to creamed mixture, mixing well. Fold in bananas and apple.",
            "Spoon batter into an 8 1/2 x 4 1/2 x 3 inch loaf pan coated with cooking spray.",
            "Bake at 350 degrees F for 1 hour and 5 minutes to 1 hour and 10 minutes or until a wooden pick inserted " +
                "in center comes out clean. Cool in pan 10 minutes; remove from pan, and cool completely on a wire " +
                "rack. Makes 1 loaf (16 slices).",
            "12345678901234567890123456789012345678901234567890123456789",
            "12345678901234567890123456789012345678901234567890123456789",
            "123456789012345678901234567890123456789012345678901234567890 12345",
            "67890",
            "1234567890123456789012345678901234567890123456789012345678901234567890",
            "xyz",
        ]);
    });

    it("should try to 'detect' paragraphs by checking if a line begins with extra space", () => {
        const actual = parseDirections([
            "  1234567890123456789012345678901234567890123456789012345678901234567890",
            "  abc",
            "  1234567890123456789012345678901234567890123456789012345678901234567890",
            "   def",
            "  1234567890123456789012345678901234567890123456789012345678901234567890",
            "  ",
            "  1234567890123456789012345678901234567890123456789012345678901234567890",
            "    1234567890123456789012345678901234567890123456789012345678901234567890",
            "  ABC",
            "   ",
            "  DEF",
        ]);
        expect(actual).toEqual([
            "1234567890123456789012345678901234567890123456789012345678901234567890 abc",
            "1234567890123456789012345678901234567890123456789012345678901234567890",
            "def",
            "1234567890123456789012345678901234567890123456789012345678901234567890",
            "1234567890123456789012345678901234567890123456789012345678901234567890",
            "1234567890123456789012345678901234567890123456789012345678901234567890 ABC",
            "DEF",
        ]);
    });

    it("should parse paragraphs sensibly given abnormally short line length", () => {
        const actual = parseDirections([
            "  Preheat oven to 350 degrees F.   Cut piece of aluminum",
            "  foil large enough to wrap brisket.  Sprinkle half of",
            "  diced onions over foil in layer about same  size as",
            "  brisket.   Set brisket over  onions.   Sprinkle",
            "  remaining onions  over top.   Seal tightly.   Set in",
            "  large shallow pan.   Roast  3 hours.",
            "  Combine  beer with remaining ingredients in large",
            "  saucepan and bring  to boil over medium-high heat.",
            "      Remove from heat.  Discard foil and spread fruit",
            "  mixture over brisket.   Reduce oven to 300 degrees F.",
            "      Cover pan and continue roasting 1 hour,  adding more",
            "  beer to pan if sauce  appears too dry.   Transfer",
            "  brisket to heated platter.   Surround with fruit and",
            "  sauce.",
        ]);
        expect(actual).toEqual([
            "Preheat oven to 350 degrees F. Cut piece of aluminum foil large enough to wrap brisket. Sprinkle half " +
                "of diced onions over foil in layer about same size as brisket. Set brisket over onions. " +
                "Sprinkle remaining onions over top. Seal tightly. Set in large shallow pan. Roast 3 hours.",
            "Combine beer with remaining ingredients in large saucepan and bring to boil over medium-high heat.",
            "Remove from heat. Discard foil and spread fruit mixture over brisket. Reduce oven to 300 degrees F.",
            "Cover pan and continue roasting 1 hour, adding more beer to pan if sauce appears too dry. Transfer " +
                "brisket to heated platter. Surround with fruit and sauce.",
        ]);
    });

    it("should start a new paragraph for a line of only punctuation", () => {
        const actual = parseDirections([
            "  Even though this line is really long, there should be a new paragraph.",
            "  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
            "  Do this.",
            "  ~---------------------------------------------------------------------",
            "  Do that.",
            "  +++",
            "  Short example.",
        ]);
        expect(actual).toEqual([
            "Even though this line is really long, there should be a new paragraph.",
            "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
            "Do this.",
            "~---------------------------------------------------------------------",
            "Do that.",
            "+++",
            "Short example.",
        ]);
    });

    it("should join together continuing punctuation when sufficiently long", () => {
        const actual = parseDirections([
            "  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
            "  +++",
            "  ======================================================================",
            "  ===",
            "  ~---------------------------------------------------------------------",
            "  --",
            "  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
            "  ---",
            "  ++++++++++++++++++++++++++++++++++++",
            "  +++",
        ]);
        expect(actual).toEqual([
            "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
            "=========================================================================",
            "~-----------------------------------------------------------------------",
            "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
            "---",
            "++++++++++++++++++++++++++++++++++++",
            "+++",
        ]);
    });

    it("should move text over to the left so that there are only two spaces", () => {
        // Because the lines are indented extra, we would consider that to be a new paragraph.
        // But we can just pretend all this text is moved to the left.
        const actual = parseDirections([
            "     Cut chicken into pieces and combine with water in large saucepan.",
            "     Simmer 2 hours then strain off broth.",
            "     In 2 qt saucepan combine celery, tomatoes and sugar and simmer1",
            "     1/2 hours.",
            "     Boil chiles 15 min until tender, remove seeds and cut in 1/4 in",
            "     squares.",
            " ",
        ]);
        expect(actual).toEqual([
            "Cut chicken into pieces and combine with water in large saucepan. Simmer 2 hours then strain off broth.",
            "In 2 qt saucepan combine celery, tomatoes and sugar and simmer1 1/2 hours.",
            "Boil chiles 15 min until tender, remove seeds and cut in 1/4 in squares.",
        ]);
    });

    // It might be nice to handle this case:
    // it("should move text over to the left so that there are only two spaces for numbered paragraphs", () => {
    //     // In this case, there are numbers in the left column.
    //     const actual = parseDirections([
    //         "  1. In a large non-aluminum (preferably glass or glazed cast iron)",
    //         "     bowl make a marinade by combining the burgundy, thyme, bay leaves,",
    //         "     garlic, and black pepper. Place all the beef in the bowl and mix",
    //         "     lightly to coat the meat well. Cover and refrigerate overnight.",
    //         "     (If time is short marinate for 2 hours at room temperature.)",
    //         "  ",
    //         "  2. Place the chicken breasts in a saucepan with enough water to",
    //         "     cover. Add 1 teaspoon salt and simmer over low heat for 1/2 hour.",
    //         "     Remove the chicken reserving the liquid. Chop the chicken breasts",
    //         "     fine and reserve.",
    //         "  ",
    //         "  3. Meal the oil in a large heavy pot. Add the onions and cook until",
    //         "     they are translucent.",
    //         " "
    //     ]);
    //     expect(actual).toEqual([
    //         "1. In a large non-aluminum (preferably glass or glazed cast iron) bowl make a marinade by "
    //             + "combining the burgundy, thyme, bay leaves, garlic, and black pepper. Place all the beef "
    //             + "in the bowl and mix lightly to coat the meat well. Cover and refrigerate overnight. "
    //             + "(If time is short marinate for 2 hours at room temperature.)",
    //         "2. Place the chicken breasts in a saucepan with enough water to cover. Add 1 teaspoon salt and "
    //             + "simmer over low heat for 1/2 hour. Remove the chicken reserving the liquid. Chop the "
    //             + "chicken breasts fine and reserve.",
    //         "3. Meal the oil in a large heavy pot. Add the onions and cook until "
    //             + "they are translucent."
    //     ]);
    // });
});

describe("parseRecipe", () => {
    it("should return an empty recipe when given no lines", () => {
        const actual = parseRecipe([]);
        expect(actual).toEqual({
            title: undefined,
            categories: [],
            yield: undefined,
            servings: undefined,
            ingredients: [],
            directions: [],
            warnings: [],
        });
    });

    it("should return an empty recipe when given just a header", () => {
        const actual = parseRecipe([
            "---------- Recipe via Meal-Master (tm) v8.05",
        ]);
        expect(actual).toEqual({
            title: undefined,
            categories: [],
            yield: undefined,
            servings: undefined,
            ingredients: [],
            directions: [],
            warnings: [],
        });
    });

    it("should return an empty recipe when given just a header and footer", () => {
        const actual = parseRecipe([
            "---------- Recipe via Meal-Master (tm) v8.05",
            "-----",
        ]);
        expect(actual).toEqual({
            title: undefined,
            categories: [],
            yield: undefined,
            servings: undefined,
            ingredients: [],
            directions: [],
            warnings: [],
        });
    });
});

describe("parseFile", () => {
    it("should parse correctly", () => {
        const actual = parseFile("src/renderer/formats/mmf/testData/input.mmf");
        const expected = JSON.parse(
            fs
                .readFileSync("src/renderer/formats/mmf/testData/output.json")
                .toString()
        );

        // JSON doesn't have undefined
        expected.forEach((recipe: any) => {
            ["title", "yield", "servings"].forEach(property => {
                if (recipe[property] === undefined) {
                    recipe[property] = undefined;
                }
            });
        });

        expect(actual).toEqual(expected);
    });
});
