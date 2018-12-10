import { BaseParser, Node } from "../jsonldParser";
import * as model from "./model";

export class Parser extends BaseParser {
    parseRecipe(node: Node): model.Recipe {
        this.warnings = [];

        const type = "Recipe";

        this.requiredType(type, node);
        this.noValue(type, node);
        const children = this.children(type, node, {
            zeroOrOne: {
                aggregateRating: node.aggregateRating,
                cookTime: node.cookTime,
                dateModified: node.dateModified,
                datePublished: node.datePublished,
                description: node.description,
                headline: node.headline,
                keywords: node.keywords,
                mainEntityOfPage: node.mainEntityOfPage,
                name: node.name,
                prepTime: node.prepTime,
                publisher: node.publisher,
                recipeYield: node.recipeYield,
                totalTime: node.totalTime,
                url: node.url,
            },
            zeroOrMore: {
                author: node.author,
                cookingMethod: node.cookingMethod,
                image: node.image,
                recipeCategory: node.recipeCategory,
                recipeIngredient: node.recipeIngredient,
                recipeInstructions: node.recipeInstructions,
                review: node.review,
            },
        });

        return {
            aggregateRating:
                children.aggregateRating &&
                this.parseAggregateRating(children.aggregateRating),
            authors: children.author.map(x => this.parsePerson(x)),
            cookingMethods: children.cookingMethod.map(x =>
                this.parseString("cookingMethod", x)
            ),
            cookTime:
                children.cookTime &&
                this.parseString("cookTime", children.cookTime),
            dateModified:
                children.dateModified &&
                this.parseString("dateModified", children.dateModified),
            datePublished:
                children.datePublished &&
                this.parseString("datePublished", children.datePublished),
            description:
                children.description &&
                this.parseString("description", children.description),
            headline:
                children.headline &&
                this.parseString("headline", children.headline),
            images: children.image.map(x => this.parseImageObject(x)),
            keywords:
                children.keywords &&
                this.parseString("keywords", children.keywords),
            mainEntityOfPage:
                children.mainEntityOfPage &&
                this.parseBoolean(
                    "mainEntityOfPage",
                    children.mainEntityOfPage,
                    true
                ),
            name: children.name && this.parseString("name", children.name),
            prepTime:
                children.prepTime &&
                this.parseString("prepTime", children.prepTime),
            publisher:
                children.publisher &&
                this.parseOrganization(children.publisher),
            recipeCategories: children.recipeCategory.map(x =>
                this.parseString("recipeCategory", x)
            ),
            recipeIngredients: children.recipeIngredient.map(x =>
                this.parseString("recipeIngredient", x)
            ),
            recipeInstructions: children.recipeInstructions.map(x =>
                this.parseString("recipeInstructions", x)
            ),
            recipeYield:
                children.recipeYield &&
                this.parseString("recipeYield", children.recipeYield),
            reviews: children.review.map(x => this.parseReview(x)),
            totalTime:
                children.totalTime &&
                this.parseString("totalTime", children.totalTime),
            url: children.url && this.parseString("url", children.url),
            warnings: this.warnings,
        };
    }

    parseAggregateRating(node: Node): model.AggregateRating {
        const type = "AggregateRating";

        this.optionalType(type, node);
        this.noValue(type, node);
        const children = this.children(type, node, {
            zeroOrOne: {
                bestRating: node.bestRating,
                ratingCount: node.ratingCount,
                ratingValue: node.ratingValue,
                worstRating: node.worstRating,
                reviewCount: node.reviewCount,
            },
        });

        return {
            bestRating:
                children.bestRating &&
                this.parseStringOrNumber("bestRating", children.bestRating),
            ratingCount:
                children.ratingCount &&
                this.parseNumber("ratingCount", children.ratingCount),
            ratingValue:
                children.ratingValue &&
                this.parseNumber("ratingValue", children.ratingValue),
            worstRating:
                children.worstRating &&
                this.parseStringOrNumber("worstRating", children.worstRating),
            reviewCount:
                children.reviewCount &&
                this.parseNumber("reviewCount", children.reviewCount),
        };
    }

    parseImageObject(node: Node): model.ImageObject {
        const type = "ImageObject";

        this.requiredType(type, node);
        this.noValue(type, node);
        const children = this.children(type, node, {
            exactlyOne: {
                url: node.url,
            },
            zeroOrOne: {
                height: node.height,
                width: node.width,
            },
        });

        return {
            height:
                children.height &&
                this.parseStringOrNumber("height", children.height),
            url: children.url ? this.parseString("url", children.url) : "",
            width:
                children.width &&
                this.parseStringOrNumber("width", children.width),
        };
    }

    parseOrganization(node: Node): model.Organization {
        const type = "Organization";

        this.requiredType(type, node);
        this.noValue(type, node);
        const children = this.children(type, node, {
            zeroOrOne: {
                logo: node.logo,
                name: node.name,
                url: node.url,
            },
        });

        return {
            logo: children.logo && this.parseImageObject(children.logo),
            name: children.name && this.parseString("name", children.name),
            url: children.url && this.parseString("url", children.url),
        };
    }

    parsePerson(node: Node): model.Person {
        const type = "Person";

        if (typeof node["@value"] === "string") {
            const name = this.parseString(type, node);

            return {
                name,
                url: undefined,
            };
        } else {
            this.requiredType(type, node);
            this.noValue(type, node);
            const children = this.children(type, node, {
                zeroOrOne: {
                    name: node.name,
                    url: node.url,
                },
            });

            return {
                name: children.name && this.parseString("name", children.name),
                url: children.url && this.parseString("url", children.url),
            };
        }
    }

    parseRating(node: Node): model.Rating {
        const type = "Rating";

        this.requiredType(type, node);
        this.noValue(type, node);
        const children = this.children(type, node, {
            zeroOrOne: {
                bestRating: node.bestRating,
                ratingValue: node.ratingValue,
                worstRating: node.worstRating,
            },
        });

        return {
            bestRating:
                children.bestRating &&
                this.parseStringOrNumber("bestRating", children.bestRating),
            ratingValue:
                children.ratingValue &&
                this.parseNumber("ratingValue", children.ratingValue),
            worstRating:
                children.worstRating &&
                this.parseStringOrNumber("worstRating", children.worstRating),
        };
    }

    parseReview(node: Node): model.Review {
        const type = "Review";

        this.requiredType(type, node);
        this.noValue(type, node);
        const children = this.children(type, node, {
            zeroOrOne: {
                author: node.author,
                datePublished: node.datePublished,
                reviewBody: node.reviewBody,
                reviewRating: node.reviewRating,
            },
            zeroOrMore: {
                review: node.review,
            },
        });

        return {
            author: children.author && this.parsePerson(children.author),
            datePublished:
                children.datePublished &&
                this.parseString("datePublished", children.datePublished),
            reviews: children.review.map(x => this.parseReview(x)),
            reviewBody:
                children.reviewBody &&
                this.parseString("reviewBody", children.reviewBody),
            reviewRating:
                children.reviewRating &&
                this.parseRating(children.reviewRating),
        };
    }
}
