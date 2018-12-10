import { Recipe } from "../../model";

export const expected001: Recipe[] = [
    {
        aggregateRating: {
            bestRating: undefined,
            ratingCount: undefined,
            ratingValue: 4.1,
            reviewCount: 8,
            worstRating: undefined,
        },
        authors: [
            {
                name: "Kitchen",
                url: "http://www.example.com/profiles/talent/kitchen",
            },
        ],
        cookingMethods: [],
        cookTime: "P0Y0M0DT0H20M0.000S",
        dateModified: "2014-01-29T09:38:56.267-05:00",
        datePublished: "2015-06-07T10:34:32.152-04:00",
        description: undefined,
        headline: "Soft Pretzels",
        images: [
            {
                height: "406",
                url:
                    "http://food.example.com/content/dam/images/food/fullset/2013/8/27/1/13825454.jpeg",
                width: "305",
            },
        ],
        keywords: undefined,
        mainEntityOfPage: true,
        name: "Soft Pretzels",
        prepTime: "P0Y0M0DT2H40M0.000S",
        publisher: {
            logo: {
                height: "60",
                url:
                    "http://food.example.com/content/dam/images/food/unsized/2016/5/5/0/FN-Amp-Logo-Transparent.png",
                width: "60",
            },
            name: "The Network",
            url: "http://www.example.com",
        },
        recipeCategories: ["Appetizer"],
        recipeIngredients: [
            "3 tablespoons ingredient 1",
            "2 tablespoons ingredient 2",
            "1 1/4-ounce packet ingredient 3 (2 1/4 teaspoons)",
            "6 cups ingredient 4",
            "2 teaspoons ingredient 5",
            "Ingredient 6",
            "2/3 cup ingredient 7",
            "Ingredient 8, for dipping (optional)",
        ],
        recipeInstructions: [
            "Step 1",
            "Step 2",
            "Step 3",
            "Step 4",
            "Step 5",
            "Step 6",
            "Step 7",
            "Step 8",
            "Step 9",
        ],
        recipeYield: "12 large pretzels",
        reviews: [
            {
                author: { name: "Guest", url: undefined },
                datePublished: "2013-11-29",
                reviews: [],
                reviewBody: "Review 1",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 5,
                    worstRating: "1",
                },
            },
            {
                author: { name: "Leah H.", url: undefined },
                datePublished: "2014-02-03",
                reviews: [],
                reviewBody: "Review 2",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 5,
                    worstRating: "1",
                },
            },
            {
                author: { name: "jankahsvk", url: undefined },
                datePublished: "2013-12-09",
                reviews: [],
                reviewBody: "Review 3",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 5,
                    worstRating: "1",
                },
            },
            {
                author: { name: "mcgrele", url: undefined },
                datePublished: "2016-07-08",
                reviews: [],
                reviewBody: "Review 4",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 4,
                    worstRating: "1",
                },
            },
            {
                author: { name: "Kmcgrain", url: undefined },
                datePublished: "2013-11-02",
                reviews: [],
                reviewBody: "Review 5",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 5,
                    worstRating: "1",
                },
            },
            {
                author: { name: "Jessica.L.R.", url: undefined },
                datePublished: "2013-10-23",
                reviews: [],
                reviewBody: "Review 6",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 5,
                    worstRating: "1",
                },
            },
            {
                author: { name: "Rick R.", url: undefined },
                datePublished: "2013-10-13",
                reviews: [],
                reviewBody: "Review 7",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 1,
                    worstRating: "1",
                },
            },
            {
                author: { name: "Mary S.", url: undefined },
                datePublished: "2013-10-12",
                reviews: [],
                reviewBody: "Review 8",
                reviewRating: {
                    bestRating: "5",
                    ratingValue: 3,
                    worstRating: "1",
                },
            },
        ],
        totalTime: "P0Y0M0DT3H0M0.000S",
        url: "http://www.example.com/recipes/kitchen/soft-pretzels-2269150",
        warnings: [],
    },
];
