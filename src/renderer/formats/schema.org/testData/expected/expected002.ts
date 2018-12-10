import { Recipe } from "../../model";

export const expected002: Recipe[] = [
    {
        aggregateRating: {
            bestRating: 5,
            ratingCount: 769,
            ratingValue: 3.3,
            reviewCount: undefined,
            worstRating: 1,
        },
        authors: [],
        cookingMethods: [],
        cookTime: undefined,
        dateModified: undefined,
        datePublished: "2011-03-11",
        description: "It's a description!",
        headline: undefined,
        images: [
            {
                height: "574",
                url:
                    "https://assets.example.com/styles/wmax-1500/d29/shepherds-pie/shepherds-pie-jpg?itok=yS2DU",
                width: "1020",
            },
        ],
        keywords:
            "Bake, Winter, Dinner, Main course, Easy recipes, Housewarming, English and Scottish recipes, Vegetables, Ground beef, Mashed potatoes, Shepherd's pie, Dairy-free, Alcohol-free, Nut-free, Pork-free, Shellfish-free, Egg-free",
        mainEntityOfPage: undefined,
        name: "Shepherd's Pie",
        prepTime: "PT0H20M",
        publisher: {
            logo: {
                height: 60,
                url:
                    "https://www.example.com/sites/all/themes/emma/img/logo.png",
                width: 118,
            },
            name: "John Smith",
            url: "https://www.example.com/",
        },
        recipeCategories: [],
        recipeIngredients: [
            "1 pound ingredient 1",
            "1 medium ingredient 2, chopped",
            "1 ingredient 3, minced",
            "1/4 teaspoon ingredient 4",
            "2 tablespoons ingredient 5",
            "1 tablespoon ingredient 6",
            "1 box (10 ounces) ingredient 7",
            "Ingredient 8",
            "3 cups ingredient 9",
        ],
        recipeInstructions: ["Step 1", "Step 2\nAdd 1/2 cup water.", "Step 3"],
        recipeYield: "4 servings",
        reviews: [
            {
                author: { name: "abc1111", url: undefined },
                datePublished: "2017-08-30",
                reviews: [],
                reviewBody:
                    "I have a recipe For John&#039;s Shephard&#039;s pie.",
                reviewRating: undefined,
            },
            {
                author: { name: "abc222", url: undefined },
                datePublished: "2017-08-06",
                reviews: [],
                reviewBody: "Review 2",
                reviewRating: { bestRating: 5, ratingValue: 4, worstRating: 1 },
            },
            {
                author: { name: "abc333", url: undefined },
                datePublished: "2017-07-23",
                reviews: [
                    {
                        author: { name: "abc444", url: undefined },
                        datePublished: "2017-08-30",
                        reviews: [],
                        reviewBody: "Umm, no..",
                        reviewRating: undefined,
                    },
                ],
                reviewBody: "The &quot;traditional&quot; Shepherds Pie review",
                reviewRating: { bestRating: 5, ratingValue: 4, worstRating: 1 },
            },
            {
                author: { name: "abc444", url: undefined },
                datePublished: "2017-06-26",
                reviews: [],
                reviewBody: "Review 4",
                reviewRating: undefined,
            },
            {
                author: { name: "abc555", url: undefined },
                datePublished: "2017-01-11",
                reviews: [],
                reviewBody: "Review 5",
                reviewRating: { bestRating: 5, ratingValue: 2, worstRating: 1 },
            },
            {
                author: { name: "abc666", url: undefined },
                datePublished: "2016-03-11",
                reviews: [
                    {
                        author: { name: "abc777", url: undefined },
                        datePublished: "2016-12-05",
                        reviews: [],
                        reviewBody: "Review 7",
                        reviewRating: {
                            bestRating: 5,
                            ratingValue: 5,
                            worstRating: 1,
                        },
                    },
                ],
                reviewBody: "Review 6",
                reviewRating: undefined,
            },
            {
                author: { name: "abc777", url: undefined },
                datePublished: "2016-01-13",
                reviews: [
                    {
                        author: { name: "abc888", url: undefined },
                        datePublished: "2017-01-17",
                        reviews: [],
                        reviewBody: "Good with brown / beef gravy",
                        reviewRating: undefined,
                    },
                ],
                reviewBody: "Review 7",
                reviewRating: undefined,
            },
            {
                author: { name: "abc999", url: undefined },
                datePublished: "2016-01-13",
                reviews: [],
                reviewBody: "Review 9",
                reviewRating: undefined,
            },
            {
                author: { name: "xyz111", url: undefined },
                datePublished: "2014-10-26",
                reviews: [],
                reviewBody: "Review 11",
                reviewRating: { bestRating: 5, ratingValue: 5, worstRating: 1 },
            },
            {
                author: { name: "xyz222", url: undefined },
                datePublished: "2014-05-05",
                reviews: [
                    {
                        author: { name: "xyz333", url: undefined },
                        datePublished: "2016-01-03",
                        reviews: [],
                        reviewBody: "Review 13",
                        reviewRating: undefined,
                    },
                    {
                        author: { name: "xyz444", url: undefined },
                        datePublished: "2015-03-14",
                        reviews: [],
                        reviewBody: "Review 14\r\n",
                        reviewRating: undefined,
                    },
                    {
                        author: { name: "xyz555", url: undefined },
                        datePublished: "2015-03-14",
                        reviews: [],
                        reviewBody: "    Review 15    ",
                        reviewRating: undefined,
                    },
                ],
                reviewBody: "Review 12",
                reviewRating: undefined,
            },
        ],
        totalTime: "P0DT0H35M",
        url: "https://www.example.com.com/337/shepherds-pie",
        warnings: [],
    },
];
