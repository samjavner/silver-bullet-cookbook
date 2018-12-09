import * as fs from "fs";
import * as iconv from "iconv-lite";
import {
    advanceOneIf,
    advanceUntil,
    advanceWhile,
    isEmpty,
    parseMetadata,
    startWith,
} from "../util";

export interface Recipe {
    title: string | undefined;
    recipeBy: string | undefined;
    servingSize: string | undefined;
    preparationTime: string | undefined;
    categories: string[];
    ingredients: Ingredient[];
    directions: string[];
    notes: string[];
}

export interface Ingredient {
    amount: string;
    measure: string;
    text: string;
    preparationMethod: string;
}

export function parseFile(path: fs.PathLike): Recipe[] {
    return parseFileWithSource(path).map(x => x[1]);
}

export function parseFileWithSource(
    path: fs.PathLike
): Array<[string[], Recipe]> {
    const buffer = fs.readFileSync(path);
    const decoded = iconv.decode(buffer, "windows-1252");
    const lines = decoded.split(/\r?\n/);
    const recipes: Array<[string[], Recipe]> = [];

    let current: string[] = [];
    lines.forEach(line => {
        if (isHeader(line)) {
            if (current.join("").trim()) {
                const recipe = parseRecipe(current);
                recipes.push([current, recipe]);
                current = [];
            }
            current.push(line);
        } else {
            current.push(line);
        }
    });
    if (current.join("").trim()) {
        const recipe = parseRecipe(current);
        recipes.push([current, recipe]);
    }

    return recipes;
}

export function parseRecipe(lines: string[]): Recipe {
    let title: string | undefined;
    let recipeBy: string | undefined;
    let servingSize: [string, string] | undefined;
    let allCategories: string[] = [];
    let ingredients: string[] = [];
    let directions: string[] = [];
    let notes: string[] = [];

    const skipEmpty = advanceWhile(isEmpty);

    startWith(lines)
        .andThen(skipEmpty)
        .andThen(advanceOneIf(isHeader))
        .andThen(skipEmpty)
        .andThen(advanceOneIf(line => line.trim()), value => (title = value))
        .andThen(skipEmpty)
        .andThen(
            advanceOneIf(parseMetadata("Recipe By")),
            value => (recipeBy = value)
        )
        .andThen(skipEmpty)
        .andThen(
            advanceOneIf(parseServingSizePreparationTime),
            value => (servingSize = value)
        )
        .andThen(skipEmpty)
        .andThen(
            advanceWhile(line => {
                const categories = parseCategories(line);
                if (!categories) {
                    return false;
                }
                allCategories = allCategories.concat(categories);
                return true;
            })
        )
        .andThen(skipEmpty)
        .andThen(advanceOneIf(isIngredientHeading1))
        .andThen(advanceOneIf(isIngredientHeading2))
        .andThen(advanceWhile(isIngredient), value => (ingredients = value))
        .andThen(advanceUntil(isFooter), value => (directions = value))
        .andThen(advanceOneIf(isFooter))
        .andThen(advanceWhile(line => true), value => (notes = value));

    return {
        title,
        recipeBy,
        servingSize: servingSize ? servingSize[0] : undefined,
        preparationTime: servingSize ? servingSize[1] : undefined,
        categories: allCategories,
        ingredients: ingredients.map(parseIngredient),
        directions: directions
            .map(text => text.trim())
            .filter(text => text !== ""),
        notes: notes.map(text => text.trim()).filter(text => text !== ""),
    };
}

export function isHeader(line: string): boolean {
    line = line.trim();
    return (
        line.length > 2 &&
        line.startsWith("*") &&
        line.endsWith("*") &&
        line
            .slice(1, -1)
            .trim()
            .toLowerCase()
            .startsWith("exported from")
    );
}

export function isFooter(line: string): boolean {
    return line.trim().startsWith("- - - - - - - - - - - - - - - - - -");
}

export function parseServingSizePreparationTime(
    line: string
): [string, string] | undefined {
    let match = /^Serving Size  :(.{6}) Preparation Time :(.*)/.exec(line);
    if (!match) {
        match = /^Serving Size  :(.{5}) Preparation Time :(.*)/.exec(line);
        if (!match) {
            return undefined;
        }
    }

    const [fullMatch, servingSize, preparationTime] = match;
    return [servingSize.trim(), preparationTime.trim()];
}

export function parseCategories(line: string): string[] | undefined {
    if (
        (!line.startsWith("Categories    : ") &&
            !line.startsWith("                ")) ||
        line.trim() === ""
    ) {
        return undefined;
    }

    const remainder = line.slice(16);
    if (remainder.length > 32) {
        return [
            remainder.slice(0, 32).trim(),
            remainder.slice(32).trim(),
        ].filter(x => x !== "");
    } else {
        return [remainder.trim(), ""].filter(x => x !== "");
    }
}

export function isIngredientHeading1(line: string): boolean {
    return (
        line.trim().toLowerCase() ===
        "amount  measure       ingredient -- preparation method"
    );
}

export function isIngredientHeading2(line: string): boolean {
    return (
        line.trim() ===
        "--------  ------------  --------------------------------"
    );
}

export function isIngredient(line: string): boolean {
    if (!line.trim()) {
        return false;
    }
    return /^  [0-9\./ ]{6}  .{12}  /.test(line);
}

export function parseIngredient(line: string): Ingredient {
    const amount = line.slice(2, 8).trim();
    const measure = line.slice(10, 22).trim();
    let text = line.slice(24).trim();
    let preparationMethod = "";

    const index = text.indexOf(" -- ");
    if (index >= 0) {
        preparationMethod = text.slice(index + 4).trimLeft();
        text = text.slice(0, index).trimRight();
    } else if (text.startsWith("-- ")) {
        preparationMethod = text.slice(3).trimLeft();
        text = "";
    }

    return {
        amount,
        measure,
        text,
        preparationMethod,
    };
}
