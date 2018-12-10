import { parseRecipe } from "./parser";

const example: any = {
    name: "Recipe 1",
    created: "2018-05-08 07:39:41",
    prep_time: "20 mins",
    cook_time: "25 mins",
    servings: "8 servings",
    categories: ["Casserole", "Potato"],
    difficulty: "Easy",
    rating: 4,
    source: "example.com",
    source_url: "https://www.example.com/source_url",
    ingredients:
        "2 pounds frozen hash brown potatoes\n1 cup onions, diced\n1 can cream of chicken soup\n16 oz sour cream\n1/2 cup melted margarine\n8 ounces grated sharp cheese\nsalt and pepper to taste",
    directions:
        "Thaw potatoes about 30 min., then mix all ingredients in a large bowl. Place in a 9 X 13 baking dish. Bake at 350 for one hour. Serves 8\n\nRecipe by: From recipe files of Martha\n\n",
    notes: "It's a note!\n\nMore notes.",
    nutritional_info: "It's nutrition!\n\nMore nutrition.",
    scale: "1/1",
    image_url: "https://www.example.com/image_url.jpg",
    photo_data: "xyz",
};

describe("paprika parseRecipe", () => {
    describe("name", () => {
        it("should be 'name' when 'name' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.name).toBe("Recipe 1");
        });

        it("should be undefined when 'name' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                name: 5,
            });
            expect(actual.name).toBeUndefined();
        });
    });

    describe("created", () => {
        it("should be 'created' when 'created' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.created).toBe("2018-05-08 07:39:41");
        });

        it("should be undefined when 'created' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                created: 5,
            });
            expect(actual.created).toBeUndefined();
        });
    });

    describe("prepTime", () => {
        it("should be 'prep_time' when 'prep_time' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.prepTime).toBe("20 mins");
        });

        it("should be undefined when 'prep_time' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                prep_time: 5,
            });
            expect(actual.prepTime).toBeUndefined();
        });
    });

    describe("cookTime", () => {
        it("should be 'cook_time' when 'cook_time' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.cookTime).toBe("25 mins");
        });

        it("should be undefined when 'cook_time' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                cook_time: 5,
            });
            expect(actual.cookTime).toBeUndefined();
        });
    });

    describe("servings", () => {
        it("should be 'servings' when 'servings' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.servings).toBe("8 servings");
        });

        it("should be undefined when 'servings' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                servings: 5,
            });
            expect(actual.servings).toBeUndefined();
        });
    });

    describe("categories", () => {
        it("should be 'categories' when 'categories' is an array of strings", () => {
            const actual = parseRecipe(example);
            expect(actual.categories).toEqual(["Casserole", "Potato"]);
        });

        it("should be 'categories' with non-strings filtered out when 'categories' is an array of any", () => {
            const actual = parseRecipe({
                ...example,
                categories: ["Casserole", 5, "Potato"],
            });
            expect(actual.categories).toEqual(["Casserole", "Potato"]);
        });

        it("should be an empty array when 'categories' is not an array", () => {
            const actual = parseRecipe({
                ...example,
                categories: "Casserole, Potato",
            });
            expect(actual.categories).toEqual([]);
        });
    });

    describe("difficulty", () => {
        it("should be 'difficulty' when 'difficulty' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.difficulty).toBe("Easy");
        });

        it("should be undefined when 'difficulty' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                difficulty: 5,
            });
            expect(actual.difficulty).toBeUndefined();
        });
    });

    describe("rating", () => {
        it("should be 'rating' when 'rating' is a number", () => {
            const actual = parseRecipe(example);
            expect(actual.rating).toBe(4);
        });

        it("should be 0 when 'rating' is not a number", () => {
            const actual = parseRecipe({
                ...example,
                rating: "4",
            });
            expect(actual.rating).toBe(0);
        });
    });

    describe("source", () => {
        it("should be 'source' when 'source' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.source).toBe("example.com");
        });

        it("should be undefined when 'source' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                source: 5,
            });
            expect(actual.source).toBeUndefined();
        });
    });

    describe("sourceUrl", () => {
        it("should be 'source_url' when 'source_url' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.sourceUrl).toBe("https://www.example.com/source_url");
        });

        it("should be undefined when 'source_url' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                source_url: 5,
            });
            expect(actual.sourceUrl).toBeUndefined();
        });
    });

    describe("ingredients", () => {
        it("should be 'ingredients' when 'ingredients' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.ingredients).toBe(
                "2 pounds frozen hash brown potatoes\n1 cup onions, diced\n1 can cream of chicken soup\n16 oz sour cream\n1/2 cup melted margarine\n8 ounces grated sharp cheese\nsalt and pepper to taste"
            );
        });

        it("should be undefined when 'ingredients' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                ingredients: ["Ingredient 1", "Ingredient 2"],
            });
            expect(actual.ingredients).toBeUndefined();
        });
    });

    describe("directions", () => {
        it("should be 'directions' when 'directions' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.directions).toBe(
                "Thaw potatoes about 30 min., then mix all ingredients in a large bowl. Place in a 9 X 13 baking dish. Bake at 350 for one hour. Serves 8\n\nRecipe by: From recipe files of Martha\n\n"
            );
        });

        it("should be undefined when 'directions' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                directions: ["Direction 1", "Direction 2"],
            });
            expect(actual.directions).toBeUndefined();
        });
    });

    describe("notes", () => {
        it("should be 'notes' when 'notes' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.notes).toBe("It's a note!\n\nMore notes.");
        });

        it("should be undefined when 'notes' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                notes: ["Note 1", "Note 2"],
            });
            expect(actual.notes).toBeUndefined();
        });
    });

    describe("nutritionalInfo", () => {
        it("should be 'nutritional_info' when 'nutritional_info' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.nutritionalInfo).toBe(
                "It's nutrition!\n\nMore nutrition."
            );
        });

        it("should be undefined when 'nutritional_info' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                nutritional_info: ["Note 1", "Note 2"],
            });
            expect(actual.nutritionalInfo).toBeUndefined();
        });
    });

    describe("scale", () => {
        it("should be 'scale' when 'scale' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.scale).toBe("1/1");
        });

        it("should be undefined when 'scale' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                scale: 5,
            });
            expect(actual.scale).toBeUndefined();
        });
    });

    describe("imageUrl", () => {
        it("should be 'image_url' when 'image_url' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.imageUrl).toBe(
                "https://www.example.com/image_url.jpg"
            );
        });

        it("should be undefined when 'image_url' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                image_url: 5,
            });
            expect(actual.imageUrl).toBeUndefined();
        });
    });

    describe("photoData", () => {
        it("should be 'photo_data' when 'photo_data' is a string", () => {
            const actual = parseRecipe(example);
            expect(actual.photoData).toBe("xyz");
        });

        it("should be undefined when 'photo_data' is not a string", () => {
            const actual = parseRecipe({
                ...example,
                photo_data: 5,
            });
            expect(actual.photoData).toBeUndefined();
        });
    });
});
