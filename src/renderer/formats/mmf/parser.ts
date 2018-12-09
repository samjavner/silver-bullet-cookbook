import * as fs from "fs";
import * as iconv from "iconv-lite";
import {
    advanceOneIf,
    advanceUntil,
    advanceWhile,
    anyOf,
    isEmpty,
    parseMetadata,
    replaceMultipleSpaces,
    startWith,
    trimEmptyLines,
} from "../util";

// MEAL-MASTER IMPORT FILE SPECIFICATIONS

// The Meal-Master import function is designed to import recipes that
// were exported from the program.  However, the export format is a
// simple text file that can be created by most text editor programs.
// Many people have found that recipes from other sources can be edited
// to look like a MM export file, allowing them to be imported to MM with
// little or no retyping.  The format required is described below.

// FIXED FORMAT (LINES 1 THROUGH 6)

//   Line 1  The first line of a valid recipe is a "recipe header" line.
//           This line must begin with at least 5 hyphens ('-----'), and
//           must contain the words "Meal-Master" somewhere on the line.
//           Any lines found prior to this "recipe header" line will be
//           ignored by Meal-Master.

//           (Note: If this line is missing, Meal-Master will attempt to
//           locate the "Title: " line described below, and continue with
//           the import process.  However, it is recommended that header
//           lines be used when possible)

//   Line 2  The word "Title:" must begin the line in any position before
//           column 7, and be followed by one blank space.  The recipe
//           title must start after the blank space, and may be a maximum
//           of 60 characters in length.

//   Line 3  The word "Categories:" must begin the line, in any position,
//           and be followed by one blank space.  A maximum of 5 category
//           names may be entered, beginning after the blank space.  A
//           comma should immediately follow each category name except
//           the last one; for example "Cakes, Desserts".  Category names
//           should start with a capital letter, with the remaining
//           characters in lower case letters.

//   Line 4  A numeric quantity between 1 and 9999 (number of servings)
//           must appear somewhere on this line.

// VARIABLE FORMAT - LINES 5 AND GREATER

//   Beginning with line 5, Meal-Master will attempt to identify each
//   line as being an ingredient line, direction line, or the "end of
//   recipe" trailer line.

//   If a line is found that starts with 5 hyphens, and contains no
//   characters other than hyphens and spaces, the program considers this
//   the "end of recipe" trailer line.  It will store the current recipe
//   and begin searching for another "recipe header" as described in
//   "Line 1" above.

//   If all the following are true, the line will be interpreted as an
//   ingredient and loaded into Meal-Master:

//      1) Positions 1-7 contain a valid numeric quantity, either
//         expressed as a whole number, decimal fraction, or common
//         fraction, or are blank.

//      2) Positions 9-10 contain one of the valid Meal-Master unit of
//         measure codes, including blanks. (see list in program).

//      3) Positions 12-39 contain text for an ingredient name, or a "-"
//         in position 12 and text in positions 13-39 (the latter is a
//         "continuation" line for the previous ingredient name).

//      NOTE: Beginning with v8.03, Meal-Master will attempt to align
//            the quantity, unit, and name information prior to import.
//            This means that ingredient lines do not have to follow the
//            column alignment above, as Meal-Master will automatically
//            align the quantity, unit, and name fields as long as they
//            contain valid data.

//   If all the following are true, the line will be interpreted as an
//   ingredient heading line:

//      1) Positions 1-5 contain hyphens ("-----").

//      2) The line is at least 40 characters long.

//      3) The center three characters of the line are not blank or
//         hyphens.

//      Note: The easiest way to format a line that will be accepted as a
//         heading is to start with 5 hyphens, then the heading text,
//         then some other special character (like "=" or "@") to at
//         least position 40.

//   If the line does not qualify as an ingredient line, heading line, or
//   end of recipe line, as specified above, data in positions 3-77 (or
//   1-75 if positions 1-2 are non-blank) will be imported as a direction
//   line.

//   Note: One of the most common errors in formatting a recipe for
//   import is an ingredient line that has been improperly formatted.
//   When this is encountered, the line is usually interpreted as a
//   direction line by the program.  To help guard against this, the
//   program will display an error message if it finds a line that
//   appears to be a direction line FOLLOWED by a valid ingredient line.

//   Note: A less common error is starting a direction line in positions
//   12 or 13.  Such a line "looks" like an ingredient line with no
//   quantity or unit of measure, so an error message is given if it is
//   found in the Direction section.  Make sure that direction lines
//   start before column 12 or after column 13.

// Files can contain multiple recipes, so long as each begins with a
// "header line" and ends with a "trailer" line.  Any text in the file
// that is not between the header and trailer lines is ignored.

// NOTE:  THIS SPECIFICATION IS ONLY VALID FOR MEAL-MASTER VERSION 7.0
//        AND HIGHER, AND WILL NOT WORK PROPERLY WITH EARLIER VERSIONS.
//        PLEASE OBTAIN VERSION 7.0 OR GREATER FOR PROPER RESULTS!

export interface Recipe {
    // exportStyle: "-" | "M" | undefined;
    // recipeVia: MealMaster | UnknownSoftware;
    title: string | undefined;
    categories: string[];
    yield: string | undefined;
    servings: string | undefined;
    ingredients: Array<Ingredient | IngredientHeading>;
    directions: string[];
    warnings: string[];
}

// interface MealMaster {
//     type: "meal_master";
//     version: string;
// }

// interface UnknownSoftware {
//     type: "unknown_software";
//     text: string;
// }

export interface Ingredient {
    type: "ingredient";
    quantity: string;
    unit: UnitOfMeasure | "";
    text: string;
}

export interface IngredientHeading {
    type: "ingredient_heading";
    text: string;
}

// In early versions of Meal-Master, the quantity and unit of measure fields could not be left blank. In cases where
// no unit of measure was appropriate, the “ea” unit had to be used (for example, “3 eggs” was entered as “3 ea
// eggs”). In cases where no quantity or unit was appropriate, a quantity of “1” and unit of “x” was used (for
// example, “Salt to taste” was entered as “1 x Salt to taste”).

export type UnitOfMeasure =
    | "x"
    | "sm"
    | "md"
    | "lg"
    | "cn"
    | "pk"
    | "pn"
    | "dr"
    | "ds"
    | "ct"
    | "bn"
    | "sl"
    | "ea"
    | "t"
    | "ts"
    | "T"
    | "tb"
    | "fl"
    | "c"
    | "pt"
    | "qt"
    | "ga"
    | "oz"
    | "lb"
    | "ml"
    | "cc"
    | "cl"
    | "dl"
    | "l"
    | "mg"
    | "cg"
    | "dg"
    | "g"
    | "kg";

export function unitDescription(unit: UnitOfMeasure): string {
    switch (unit) {
        case "x":
            return "per serving";
        case "sm":
            return "small";
        case "md":
            return "medium";
        case "lg":
            return "large";
        case "cn":
            return "can";
        case "pk":
            return "package";
        case "pn":
            return "pinch";
        case "dr":
            return "drop";
        case "ds":
            return "dash";
        case "ct":
            return "carton";
        case "bn":
            return "bunch";
        case "sl":
            return "slice";
        case "ea":
            return "each";
        case "t":
        case "ts":
            return "teaspoon";
        case "T":
        case "tb":
            return "tablespoon";
        case "fl":
            return "fluid ounce";
        case "c":
            return "cup";
        case "pt":
            return "pint";
        case "qt":
            return "quart";
        case "ga":
            return "gallon";
        case "oz":
            return "ounce";
        case "lb":
            return "pound";
        case "ml":
            return "milliliter";
        case "cc":
            return "cubic centimeter";
        case "cl":
            return "centiliter"; // alternatively, clove (for garlic)
        case "dl":
            return "deciliter";
        case "l":
            return "liter";
        case "mg":
            return "milligram";
        case "cg":
            return "centigram";
        case "dg":
            return "decigram";
        case "g":
            return "gram";
        case "kg":
            return "kilogram";
    }
}

export function parseFile(path: fs.PathLike): Recipe[] {
    return parseFileWithSource(path).map(x => x[1]);
}

export function parseFileWithSource(
    path: fs.PathLike
): Array<[string[], Recipe]> {
    const buffer = fs.readFileSync(path);
    const decoded = iconv.decode(buffer, "cp437"); // Living Cookbook exports do not appear to use this encoding
    const lines = decoded.split(/\r?\n/);
    const recipes: Array<[string[], Recipe]> = [];

    let current: string[] = [];
    let headerStyle: "normal" | "extracted" | undefined;
    lines.forEach(line => {
        const currentLineHeaderStyle = parseHeader(line);
        if (currentLineHeaderStyle) {
            headerStyle = currentLineHeaderStyle;
            if (current.join("").trim()) {
                current = trimEmptyLines(current);
                const recipe = parseRecipe(current);
                recipes.push([current, recipe]);
                current = [];
                headerStyle = undefined;
            }
            current.push(line);
        } else if (isFooter({ headerStyle })(line)) {
            if (current.join("").trim()) {
                current.push(line);
                current = trimEmptyLines(current);
                const recipe = parseRecipe(current);
                recipes.push([current, recipe]);
                current = [];
                headerStyle = undefined;
            }
        } else {
            current.push(line);
        }
    });
    if (current.join("").trim()) {
        current = trimEmptyLines(current);
        const recipe = parseRecipe(current);
        recipes.push([current, recipe]);
    }

    return recipes;
}

export function parseRecipe(lines: string[]): Recipe {
    let headerStyle: "normal" | "extracted" | undefined;
    let title: string | undefined;
    let categories: string | undefined;
    let recipeYield: string | undefined;
    let servings: string | undefined;
    let ingredients: string[] = [];
    let directions: string[] = [];

    const skipEmpty = advanceWhile(isEmpty);

    startWith(lines)
        .andThen(skipEmpty)
        .andThen(advanceOneIf(parseHeader), value => (headerStyle = value))
        .andThen(skipEmpty)
        .andThen(advanceOneIf(parseMetadata("Title")), value => (title = value))
        .andThen(skipEmpty)
        .andThen(
            advanceOneIf(parseMetadata("Categories")),
            value => (categories = value)
        )
        .andThen(skipEmpty)
        .andThen(
            advanceOneIf(parseMetadata("Yield")),
            value => (recipeYield = value)
        )
        .andThen(skipEmpty)
        .andThen(
            advanceOneIf(parseMetadata("Servings")),
            value => (servings = value)
        )
        .andThen(skipEmpty)
        .andThen(
            advanceWhile(
                anyOf(
                    isIngredient({ strict: true }),
                    isIngredientHeading,
                    isEmpty
                )
            ),
            value => (ingredients = value)
        )
        .andThen(
            advanceUntil(isFooter({ headerStyle })),
            value => (directions = value)
        );

    ingredients = trimEmptyLines(ingredients);
    directions = trimEmptyLines(directions);

    const warnings: string[] = [];
    if (ingredients.length >= 2) {
        const last = ingredients[ingredients.length - 1];
        const penultimate = ingredients[ingredients.length - 2];

        if (!penultimate.trim() && !last.slice(0, 11).trim()) {
            warnings.push("Last ingredient looks like a direction.");
        }
    }

    if (directions[0] && isIngredient({ strict: false })(directions[0])) {
        warnings.push("First direction looks like an ingredient.");
    }

    const recipe = {
        title,
        categories: parseCategories({ headerStyle })(categories || ""),
        yield: recipeYield,
        servings,
        ingredients: parseIngredients(ingredients),
        directions: parseDirections(directions),
        warnings,
    };

    return recipe;
}

export function parseHeader(line: string): "normal" | "extracted" | undefined {
    if (
        (line.startsWith("-----") || line.startsWith("MMMMM-----")) &&
        line.indexOf("Meal-Master") !== -1
    ) {
        if (line.indexOf("Recipe Extracted from Meal-Master") !== -1) {
            return "extracted";
        }
        return "normal";
    } else {
        return undefined;
    }
}

export function isIngredient({
    strict,
}: {
    strict: boolean;
}): (line: string) => boolean {
    return (line: string) => {
        const isPossible =
            line.trim() !== "" && /^[0-9\-\./ ]{7} [A-Za-z ]{2} /.test(line);

        if (!isPossible) {
            return false;
        }

        if (strict) {
            const unit = line
                .slice(8, 10)
                .trim()
                .toLowerCase();
            const isValidUnit =
                !unit || !!unitDescription(unit as any) || unit === "gl";
            if (!isValidUnit) {
                return false;
            }
        }

        if (line.trimRight().length > 41) {
            return isIngredient({ strict })(line.slice(41));
        }

        return true;
    };
}

export function isIngredientHeading(line: string): boolean {
    return /^(M{5})?-{5}-*.+-*-{5}\s*$/.test(line);
}

export function isFooter({
    headerStyle,
}: {
    headerStyle: "normal" | "extracted" | undefined;
}): (line: string) => boolean {
    return (line: string) => {
        if (headerStyle === "extracted") {
            return (
                line ===
                "-----------------------------------------------------------------------------"
            );
        } else {
            return line === "-----" || line === "MMMMM";
        }
    };
}

export function parseCategories({
    headerStyle,
}: {
    headerStyle: "normal" | "extracted" | undefined;
}): (text: string) => string[] {
    return (text: string) => {
        if (headerStyle === "extracted") {
            return text
                .split(" ")
                .map(x => x.trim())
                .filter(x => x !== "" && x.toUpperCase() !== "NONE");
        } else {
            return text
                .split(",")
                .map(x => x.trim())
                .map(x => replaceMultipleSpaces(x))
                .filter(x => x !== "" && x.toUpperCase() !== "NONE");
        }
    };
}

export function arrangeIngredientText(lines: string[]): string[] {
    let arrangedLines: string[] = [];
    let currentSection: string[] = [];

    lines.forEach(line => {
        if (isIngredientHeading(line)) {
            const sectionArrangedLines = arrangeIngredientText(currentSection);
            arrangedLines = arrangedLines.concat(sectionArrangedLines);
            arrangedLines.push(line);
            currentSection = [];
        } else if (isIngredient({ strict: false })(line)) {
            currentSection.push(line);
        }
    });

    const column1: string[] = [];
    const column2: string[] = [];
    currentSection.forEach(line => {
        if (line.trimRight().length > 41) {
            column1.push(line.slice(0, 41).trimRight());
            column2.push(line.slice(41));
        } else {
            column1.push(line);
        }
    });

    let previous = "";
    column1.concat(column2).forEach(line => {
        if (line.trimLeft().startsWith("-")) {
            previous =
                previous.trimRight() +
                " " +
                line
                    .trimLeft()
                    .slice(1)
                    .trim();
        } else {
            if (previous) {
                arrangedLines.push(previous);
            }
            previous = line;
        }
    });
    if (previous) {
        arrangedLines.push(previous);
    }

    return arrangedLines;
}

function parseIngredients(
    lines: string[]
): Array<Ingredient | IngredientHeading> {
    const arrangedLines = arrangeIngredientText(lines);
    return arrangedLines.map(line => {
        if (isIngredientHeading(line)) {
            return parseIngredientHeading(line);
        }
        return parseIngredient(line);
    });
}

export function parseIngredient(text: string): Ingredient {
    if (isIngredient({ strict: false })(text.slice(0, 41))) {
        let unit = text.slice(8, 10).trim();
        const unitExists = !!unitDescription(unit as any);
        if (!unitExists) {
            unit = unit.toLowerCase();
            if (unit === "gl") {
                unit = "ga";
            }
        }

        return {
            type: "ingredient",
            quantity: replaceMultipleSpaces(text.slice(0, 7).trim()),
            unit: unit as UnitOfMeasure | "",
            text: replaceMultipleSpaces(text.slice(11).trim()),
        };
    }

    return {
        type: "ingredient",
        quantity: "",
        unit: "",
        text: replaceMultipleSpaces(text.trim()),
    };
}

export function parseIngredientHeading(text: string): IngredientHeading {
    text = text.trim();
    if (text.startsWith("MMMMM")) {
        text = text.slice(5);
    }
    text = text.replace(/^-+|-+$/g, "");
    text = text.trim();

    return {
        type: "ingredient_heading",
        text,
    };
}

export function parseDirections(lines: string[]): string[] {
    lines = adjustSpacingOnLeft(lines);

    const maxLineLength = lines
        .map(line => line.length)
        .reduce((l1, l2) => Math.max(l1, l2), 0);

    const newParagraphCutoff = Math.floor(Math.max(maxLineLength, 60) * 0.8);

    const directions: string[] = [];

    let current = "";
    lines.concat([""]).forEach(line => {
        if (isEmpty(line)) {
            if (current) {
                directions.push(current);
            }
            current = "";
            return;
        } else if (isAllDividerPunctuation(current)) {
            if (
                isAllDividerPunctuation(line) &&
                current.slice(-1) === line.trim().slice(0, 1)
            ) {
                directions.push(current + line.trim());
                current = "";
                return;
            } else {
                directions.push(current);
                current = line.trim();
            }
        } else if (isAllDividerPunctuation(line)) {
            if (current) {
                directions.push(current);
            }
            current = line.trim();
        } else if (
            line.length >= 2 &&
            line.slice(2) !== line.slice(2).trimLeft()
        ) {
            // This case indicates indentation for new paragraph
            if (current) {
                directions.push(current);
            }
            current = line.trim();
        } else {
            if (current) {
                current += " ";
            }
            current += line.trim();
        }

        if (current.endsWith("\u0014")) {
            current = current.slice(0, -1);
            directions.push(current);
            current = "";
        } else if (line.trimRight().length < newParagraphCutoff) {
            directions.push(current);
            current = "";
        }
    });

    return directions.map(direction => replaceMultipleSpaces(direction));
}

function adjustSpacingOnLeft(lines: string[]): string[] {
    const spacesOnLeft = lines
        .map(line => (line.trim() ? line.length - line.trimLeft().length : 100))
        .reduce((l1, l2) => Math.min(l1, l2), 100);

    if (spacesOnLeft > 2) {
        const spacesToRemove = spacesOnLeft - 2;
        lines = lines.map(
            line =>
                line.length >= spacesOnLeft ? line.slice(spacesToRemove) : line
        );
    }

    return lines;
}

function isAllDividerPunctuation(line: string): boolean {
    line = line.trim();

    if (!line) {
        return false;
    }

    return line
        .split("")
        .reduce((soFar, c) => soFar && isDividerPunctuation(c), true);
}

function isDividerPunctuation(c: string): boolean {
    return c === "~" || c === "-" || c === "+" || c === "=" || c === "*";
}
