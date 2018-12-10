import { BaseParser, ifPresent, Node } from "../xmlParser";
import * as model from "./model";

export class Parser extends BaseParser {
    parse(node: Node): model.Fdx {
        this.warnings = [];

        const element = "fdx";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrOne: {
                Cookbooks: node.Cookbooks,
                CookbookChapters: node.CookbookChapters,
                Recipes: node.Recipes,
                IngredientFolders: node.IngredientFolders,
                Ingredients: node.Ingredients,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                Source: true,
                FileVersion: true,
                date: true,
            },
        });

        return {
            source: attributes.Source,
            fileVersion: attributes.FileVersion,
            date: attributes.date,
            cookbooks: ifPresent(children.Cookbooks, x =>
                this.parseCookbooks(x).sort((a, b) => a.id - b.id)
            ),
            cookbookChapters: ifPresent(children.CookbookChapters, x =>
                this.parseCookbookChapters(x).sort((a, b) => a.id - b.id)
            ),
            recipes: ifPresent(children.Recipes, x =>
                this.parseRecipes(x).sort((a, b) => a.id - b.id)
            ),
            ingredientFolders: ifPresent(children.IngredientFolders, x =>
                this.parseIngredientFolders(x).sort((a, b) => a.id - b.id)
            ),
            ingredients: ifPresent(children.Ingredients, x =>
                this.parseIngredients(x).sort((a, b) => a.id - b.id)
            ),
            warnings: this.warnings,
        };
    }

    parseCookbooks(node: Node): model.Cookbook[] {
        const element = "Cookbooks";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                Cookbook: node.Cookbook,
            },
        });

        this.noAttributes(element, node);

        return children.Cookbook.map(x => this.parseCookbook(x));
    }

    parseCookbook(node: Node): model.Cookbook {
        const element = "Cookbook";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrOne: {
                AutoArchiveRules: node.AutoArchiveRules,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                Name: true,
            },
            optionalText: {
                Comments: true,
            },
            requiredNumber: {
                ID: true,
            },
        });

        return {
            id: attributes.ID || 0,
            name: attributes.Name,
            comments: attributes.Comments,
            autoArchiveRules: ifPresent(children.AutoArchiveRules, x =>
                this.parseAutoArchiveRules(x)
            ),
        };
    }

    parseCookbookChapters(node: Node): model.CookbookChapter[] {
        const element = "CookbookChapters";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                CookbookChapter: node.CookbookChapter,
            },
        });

        this.noAttributes(element, node);

        return children.CookbookChapter.map(x => this.parseCookbookChapter(x));
    }

    parseCookbookChapter(node: Node): model.CookbookChapter {
        const element = "CookbookChapter";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrOne: {
                AutoArchiveRules: node.AutoArchiveRules,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                Name: true,
            },
            optionalText: {
                Comments: true,
            },
            requiredNumber: {
                ID: true,
                CookbookID: true,
                ParentChapterID: true,
            },
        });

        return {
            id: attributes.ID || 0,
            cookbookId: attributes.CookbookID || 0,
            parentChapterId: attributes.ParentChapterID || undefined,
            name: attributes.Name,
            comments: attributes.Comments,
            autoArchiveRules: ifPresent(children.AutoArchiveRules, x =>
                this.parseAutoArchiveRules(x)
            ),
        };
    }

    parseAutoArchiveRules(node: Node): model.AutoArchiveRule[] {
        const element = "AutoArchiveRules";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                AutoArchiveRule: node.AutoArchiveRule,
            },
        });

        this.noAttributes(element, node);

        return children.AutoArchiveRule.map(x => this.parseAutoArchiveRule(x));
    }

    parseAutoArchiveRule(node: Node): model.AutoArchiveRule {
        const element = "AutoArchiveRule";

        const text = this.requiredText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                Attribute: true,
                ExpressionType: true,
            },
        });

        return {
            attribute: attributes.Attribute,
            expressionType: attributes.ExpressionType,
            expression: text,
        };
    }

    parseRecipes(node: Node): model.Recipe[] {
        const element = "Recipes";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                Recipe: node.Recipe,
            },
        });

        this.noAttributes(element, node);

        return children.Recipe.map(x => this.parseRecipe(x));
    }

    parseRecipe(node: Node): model.Recipe {
        const element = "Recipe";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrOne: {
                RecipeIngredients: node.RecipeIngredients,
                RecipeProcedures: node.RecipeProcedures,
                RecipeNutrition: node.RecipeNutrition,
                RecipeTips: node.RecipeTips,
                RecipeReviews: node.RecipeReviews,
                RecipeAuthorNotes: node.RecipeAuthorNotes,
                RecipeMeasures: node.RecipeMeasures,
                RecipeImage: node.RecipeImage,
                SourceImage: node.SourceImage,
                RecipeImages: node.RecipeImages,
                RecipeMedia: node.RecipeMedia,
                RecipeAttachments: node.RecipeAttachments,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                Name: true,
                CreateDate: true,
            },
            optionalText: {
                Yield: true,
                RecipeTypes: true,
                Comments: true,
                Author: true,
                Source: true,
                SourcePageNumber: true,
                WebPage: true,
                Copyright: true,
                UserData1: true,
                UserData2: true,
                UserData3: true,
                UserData4: true,
                UserData5: true,
                UserData11: true,
                UserData12: true,
                UserData13: true,
                UserData14: true,
                UserData15: true,
                ColorFlag: true,
            },
            requiredNumber: {
                ID: true,
                CookbookChapterID: true,
            },
            optionalNumber: {
                CookbookID: true,
                Servings: true,
                PreparationTime: true,
                CookingTime: true,
                InactiveTime: true,
                ReadyInTime: true,
                OvenTemperatureF: true,
                OvenTemperatureC: true,
                DegreeOfDifficulty: true,
                UserData6: true,
                UserData7: true,
                UserData8: true,
                UserData9: true,
                UserData10: true,
            },
        });

        // Split recipeTypes on comma, but preserve the two default recipe types
        // from Living Cookbook that contain commas.
        const recipeTypes = (attributes.RecipeTypes || "")
            .split(
                /,|(Cakes, Pastries, and Desserts)|(Potatoes, Pasta, and Grains)/
            )
            .map(type => type && type.trim())
            .filter(type => type);

        return {
            id: attributes.ID || 0,
            name: attributes.Name,
            cookbookChapterId: attributes.CookbookChapterID || undefined,
            createDate: attributes.CreateDate,
            cookbookId: attributes.CookbookID || undefined,
            servings: attributes.Servings || undefined,
            yield: attributes.Yield,
            recipeTypes,
            preparationTime: attributes.PreparationTime,
            cookingTime: attributes.CookingTime,
            inactiveTime: attributes.InactiveTime,
            readyInTime: attributes.ReadyInTime,
            ovenTemperatureF: attributes.OvenTemperatureF,
            ovenTemperatureC: attributes.OvenTemperatureC,
            degreeOfDifficulty: attributes.DegreeOfDifficulty,
            comments: attributes.Comments,
            author: attributes.Author,
            source: attributes.Source,
            sourcePageNumber: attributes.SourcePageNumber,
            webPage: attributes.WebPage,
            copyright: attributes.Copyright,
            userData1: attributes.UserData1,
            userData2: attributes.UserData2,
            userData3: attributes.UserData3,
            userData4: attributes.UserData4,
            userData5: attributes.UserData5,
            userData6: attributes.UserData6,
            userData7: attributes.UserData7,
            userData8: attributes.UserData8,
            userData9: attributes.UserData9,
            userData10: attributes.UserData10,
            userData11: attributes.UserData11,
            userData12: attributes.UserData12,
            userData13: attributes.UserData13,
            userData14: attributes.UserData14,
            userData15: attributes.UserData15,
            colorFlag: attributes.ColorFlag,
            ingredients: ifPresent(children.RecipeIngredients, x =>
                this.parseRecipeIngredients(x)
            ),
            procedures: ifPresent(children.RecipeProcedures, x =>
                this.parseRecipeProcedures(x)
            ),
            nutrition:
                children.RecipeNutrition &&
                this.parseRecipeNutrition(children.RecipeNutrition),
            tips: ifPresent(children.RecipeTips, x => this.parseRecipeTips(x)),
            reviews: ifPresent(children.RecipeReviews, x =>
                this.parseRecipeReviews(x)
            ),
            authorNotes: ifPresent(children.RecipeAuthorNotes, x =>
                this.parseRecipeAuthorNotes(x)
            ),
            measures: ifPresent(children.RecipeMeasures, x =>
                this.parseRecipeMeasures(x)
            ),
            image:
                children.RecipeImage &&
                this.parseMedia("RecipeImage", children.RecipeImage),
            sourceImage:
                children.SourceImage &&
                this.parseMedia("SourceImage", children.SourceImage),
            images: ifPresent(children.RecipeImages, x =>
                this.parseRecipeImages(x)
            ),
            media: ifPresent(children.RecipeMedia, x =>
                this.parseRecipeMedia(x)
            ),
            attachments: ifPresent(children.RecipeAttachments, x =>
                this.parseRecipeAttachments(x)
            ),
        };
    }

    parseRecipeIngredients(node: Node): model.RecipeIngredient[] {
        const element = "RecipeIngredients";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeIngredient: node.RecipeIngredient,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeIngredient.map(x =>
            this.parseRecipeIngredient(x)
        );
    }

    parseRecipeIngredient(node: Node): model.RecipeIngredient {
        const element = "RecipeIngredient";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                Quantity: true,
                Unit: true,
                Ingredient: true,
                Heading: true,
            },
            optionalText: {
                LinkType: true,
                IngredientName: true,
                RecipeName: true,
                Measure: true,
            },
            optionalNumber: {
                IngredientID: true,
                RecipeID: true,
                MeasureID: true,
                MeasureQuantity: true,
                MeasureGramWeight: true,
            },
        });

        return {
            quantity: attributes.Quantity,
            unit: attributes.Unit,
            ingredient: attributes.Ingredient,
            heading: attributes.Heading === "Y",
            linkType: attributes.LinkType,
            ingredientId: attributes.IngredientID || undefined,
            ingredientName: attributes.IngredientName,
            recipeId: attributes.RecipeID || undefined,
            recipeName: attributes.RecipeName,
            measureId: attributes.MeasureID || undefined,
            measure: attributes.Measure,
            measureQuantity: attributes.MeasureQuantity,
            measureGramWeight: attributes.MeasureGramWeight,
        };
    }

    parseRecipeProcedures(node: Node): model.RecipeProcedure[] {
        const element = "RecipeProcedures";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeProcedure: node.RecipeProcedure,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeProcedure.map(x => this.parseRecipeProcedure(x));
    }

    parseRecipeProcedure(node: Node): model.RecipeProcedure {
        const element = "RecipeProcedure";

        this.noText(element, node);

        const children = this.children(element, node, {
            exactlyOne: {
                ProcedureText: node.ProcedureText,
            },
            zeroOrOne: {
                ProcedureImage: node.ProcedureImage,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                Heading: true,
            },
        });

        return {
            heading: attributes.Heading === "Y",
            text:
                (children.ProcedureText &&
                    this.parseProcedureText(children.ProcedureText)) ||
                "",
            image:
                children.ProcedureImage &&
                this.parseMedia("ProcedureImage", children.ProcedureImage),
        };
    }

    parseProcedureText(node: Node): string {
        const element = "ProcedureText";

        const text = this.optionalText(element, node);

        this.noChildren(element, node);

        this.noAttributes(element, node);

        return text || "";
    }

    parseRecipeNutrition(node: Node): model.RecipeNutrition {
        const element = "RecipeNutrition";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                ServingSize: true,
                CalculatedFromRecipeFlag: true,
            },
            optionalText: {
                NutritionCalculationMode: true,
            },
            optionalNumber: {
                Calories: true,
                Energy: true,
                TotalFat: true,
                SaturatedFat: true,
                TransFattyAcids: true,
                Cholesterol: true,
                Sodium: true,
                TotalCarbohydrate: true,
                Fiber: true,
                Protein: true,
                Calcium: true,
                Folate: true,
                Iron: true,
                Magnesium: true,
                Niacin: true,
                PantothenicAcid: true,
                Phosphorus: true,
                Potassium: true,
                VitaminA: true,
                VitaminB12: true,
                VitaminB6: true,
                VitaminC: true,
                VitaminE: true,
                Zinc: true,
                Thiamin: true,
                MonounsaturatedFat: true,
                PolyunsaturatedFat: true,
                Sugar: true,
                SugarAlcohols: true,
                Copper: true,
                Manganese: true,
                Riboflavin: true,
                Selenium: true,
                VitaminD: true,
                Biotin: true,
                Alcohol: true,
                Caffeine: true,
                Water: true,
                SaturatedFattyAcid4_0: true,
                SaturatedFattyAcid6_0: true,
                SaturatedFattyAcid8_0: true,
                SaturatedFattyAcid10_0: true,
                SaturatedFattyAcid12_0: true,
                SaturatedFattyAcid13_0: true,
                SaturatedFattyAcid14_0: true,
                SaturatedFattyAcid15_0: true,
                SaturatedFattyAcid16_0: true,
                SaturatedFattyAcid17_0: true,
                SaturatedFattyAcid18_0: true,
                SaturatedFattyAcid20_0: true,
                SaturatedFattyAcid22_0: true,
                SaturatedFattyAcid24_0: true,
                MonounsaturatedFattyAcid14_1: true,
                MonounsaturatedFattyAcid15_1: true,
                MonounsaturatedFattyAcid16_1: true,
                MonounsaturatedFattyAcid17_1: true,
                MonounsaturatedFattyAcid18_1: true,
                MonounsaturatedFattyAcid20_1: true,
                MonounsaturatedFattyAcid22_1: true,
                MonounsaturatedFattyAcid24_1: true,
                PolyunsaturatedFattyAcid18_2: true,
                PolyunsaturatedFattyAcid18_3: true,
                PolyunsaturatedFattyAcid18_4: true,
                PolyunsaturatedFattyAcid20_3: true,
                PolyunsaturatedFattyAcid20_4: true,
                PolyunsaturatedFattyAcid21_5: true,
                PolyunsaturatedFattyAcid22_4: true,
                Omega3FattyAcids: true,
                AlphaLinolenicAcid: true,
                EicosapentaenoicAcid: true,
                DocosapentaenoicAcid: true,
                DocosahexaenoicAcid: true,
                Omega6FattyAcids: true,
                LinoleicAcid: true,
                GammaLinolenicAcid: true,
                EicosadienoicAcid: true,
                DihomoGammaLinolenicAcid: true,
                ArachidonicAcid: true,
                TransMonoenoicFattyAcids: true,
                TransPolyenoicFattyAcids: true,
                Phytosterols: true,
                BetaSitosterol: true,
                Stigmasterol: true,
                Campesterol: true,
                Starch: true,
                Sucrose: true,
                Glucose: true,
                Fructose: true,
                Lactose: true,
                Maltose: true,
                Galactose: true,
                Retinol: true,
                BetaCarotene: true,
                AlphaCarotene: true,
                BetaCryptoxanthin: true,
                Lycopene: true,
                BetaTocopherol: true,
                GammaTocopherol: true,
                DeltaTocopherol: true,
                VitaminK: true,
                Chromium: true,
                Fluoride: true,
                Iodine: true,
                Molybdenum: true,
                Chloride: true,
                Choline: true,
                Tryptophan: true,
                Threonine: true,
                Isoleucine: true,
                Leucine: true,
                Lysine: true,
                Methionine: true,
                Cystine: true,
                Phenylalanine: true,
                Tyrosine: true,
                Valine: true,
                Arginine: true,
                Histidine: true,
                Alanine: true,
                AsparticAcid: true,
                GlutamicAcid: true,
                Glycine: true,
                Proline: true,
                Serine: true,
                Hydroxyproline: true,
                Theobromine: true,
                Ash: true,
                Refuse: true,
                Mass: true,
                Volume: true,
                FatFactor: true,
                ProteinFactor: true,
                CarbohydrateFactor: true,
                AlcoholFactor: true,
                CaloriesFromFat: true,
            },
        });

        return {
            servingSize: attributes.ServingSize,
            calculatedFromRecipeFlag:
                attributes.CalculatedFromRecipeFlag === "Y",
            nutritionCalculationMode: attributes.NutritionCalculationMode,
            calories: attributes.Calories,
            energy: attributes.Energy,
            totalFat: attributes.TotalFat,
            saturatedFat: attributes.SaturatedFat,
            transFattyAcids: attributes.TransFattyAcids,
            cholesterol: attributes.Cholesterol,
            sodium: attributes.Sodium,
            totalCarbohydrate: attributes.TotalCarbohydrate,
            fiber: attributes.Fiber,
            protein: attributes.Protein,
            calcium: attributes.Calcium,
            folate: attributes.Folate,
            iron: attributes.Iron,
            magnesium: attributes.Magnesium,
            niacin: attributes.Niacin,
            pantothenicAcid: attributes.PantothenicAcid,
            phosphorus: attributes.Phosphorus,
            potassium: attributes.Potassium,
            vitaminA: attributes.VitaminA,
            vitaminB12: attributes.VitaminB12,
            vitaminB6: attributes.VitaminB6,
            vitaminC: attributes.VitaminC,
            vitaminE: attributes.VitaminE,
            zinc: attributes.Zinc,
            thiamin: attributes.Thiamin,
            monounsaturatedFat: attributes.MonounsaturatedFat,
            polyunsaturatedFat: attributes.PolyunsaturatedFat,
            sugar: attributes.Sugar,
            sugarAlcohols: attributes.SugarAlcohols,
            copper: attributes.Copper,
            manganese: attributes.Manganese,
            riboflavin: attributes.Riboflavin,
            selenium: attributes.Selenium,
            vitaminD: attributes.VitaminD,
            biotin: attributes.Biotin,
            alcohol: attributes.Alcohol,
            caffeine: attributes.Caffeine,
            water: attributes.Water,
            saturatedFattyAcid4_0: attributes.SaturatedFattyAcid4_0,
            saturatedFattyAcid6_0: attributes.SaturatedFattyAcid6_0,
            saturatedFattyAcid8_0: attributes.SaturatedFattyAcid8_0,
            saturatedFattyAcid10_0: attributes.SaturatedFattyAcid10_0,
            saturatedFattyAcid12_0: attributes.SaturatedFattyAcid12_0,
            saturatedFattyAcid13_0: attributes.SaturatedFattyAcid13_0,
            saturatedFattyAcid14_0: attributes.SaturatedFattyAcid14_0,
            saturatedFattyAcid15_0: attributes.SaturatedFattyAcid15_0,
            saturatedFattyAcid16_0: attributes.SaturatedFattyAcid16_0,
            saturatedFattyAcid17_0: attributes.SaturatedFattyAcid17_0,
            saturatedFattyAcid18_0: attributes.SaturatedFattyAcid18_0,
            saturatedFattyAcid20_0: attributes.SaturatedFattyAcid20_0,
            saturatedFattyAcid22_0: attributes.SaturatedFattyAcid22_0,
            saturatedFattyAcid24_0: attributes.SaturatedFattyAcid24_0,
            monounsaturatedFattyAcid14_1:
                attributes.MonounsaturatedFattyAcid14_1,
            monounsaturatedFattyAcid15_1:
                attributes.MonounsaturatedFattyAcid15_1,
            monounsaturatedFattyAcid16_1:
                attributes.MonounsaturatedFattyAcid16_1,
            monounsaturatedFattyAcid17_1:
                attributes.MonounsaturatedFattyAcid17_1,
            monounsaturatedFattyAcid18_1:
                attributes.MonounsaturatedFattyAcid18_1,
            monounsaturatedFattyAcid20_1:
                attributes.MonounsaturatedFattyAcid20_1,
            monounsaturatedFattyAcid22_1:
                attributes.MonounsaturatedFattyAcid22_1,
            monounsaturatedFattyAcid24_1:
                attributes.MonounsaturatedFattyAcid24_1,
            polyunsaturatedFattyAcid18_2:
                attributes.PolyunsaturatedFattyAcid18_2,
            polyunsaturatedFattyAcid18_3:
                attributes.PolyunsaturatedFattyAcid18_3,
            polyunsaturatedFattyAcid18_4:
                attributes.PolyunsaturatedFattyAcid18_4,
            polyunsaturatedFattyAcid20_3:
                attributes.PolyunsaturatedFattyAcid20_3,
            polyunsaturatedFattyAcid20_4:
                attributes.PolyunsaturatedFattyAcid20_4,
            polyunsaturatedFattyAcid21_5:
                attributes.PolyunsaturatedFattyAcid21_5,
            polyunsaturatedFattyAcid22_4:
                attributes.PolyunsaturatedFattyAcid22_4,
            omega3FattyAcids: attributes.Omega3FattyAcids,
            alphaLinolenicAcid: attributes.AlphaLinolenicAcid,
            eicosapentaenoicAcid: attributes.EicosapentaenoicAcid,
            docosapentaenoicAcid: attributes.DocosapentaenoicAcid,
            docosahexaenoicAcid: attributes.DocosahexaenoicAcid,
            omega6FattyAcids: attributes.Omega6FattyAcids,
            linoleicAcid: attributes.LinoleicAcid,
            gammaLinolenicAcid: attributes.GammaLinolenicAcid,
            eicosadienoicAcid: attributes.EicosadienoicAcid,
            dihomoGammaLinolenicAcid: attributes.DihomoGammaLinolenicAcid,
            arachidonicAcid: attributes.ArachidonicAcid,
            transMonoenoicFattyAcids: attributes.TransMonoenoicFattyAcids,
            transPolyenoicFattyAcids: attributes.TransPolyenoicFattyAcids,
            phytosterols: attributes.Phytosterols,
            betaSitosterol: attributes.BetaSitosterol,
            stigmasterol: attributes.Stigmasterol,
            campesterol: attributes.Campesterol,
            starch: attributes.Starch,
            sucrose: attributes.Sucrose,
            glucose: attributes.Glucose,
            fructose: attributes.Fructose,
            lactose: attributes.Lactose,
            maltose: attributes.Maltose,
            galactose: attributes.Galactose,
            retinol: attributes.Retinol,
            betaCarotene: attributes.BetaCarotene,
            alphaCarotene: attributes.AlphaCarotene,
            betaCryptoxanthin: attributes.BetaCryptoxanthin,
            lycopene: attributes.Lycopene,
            betaTocopherol: attributes.BetaTocopherol,
            gammaTocopherol: attributes.GammaTocopherol,
            deltaTocopherol: attributes.DeltaTocopherol,
            vitaminK: attributes.VitaminK,
            chromium: attributes.Chromium,
            fluoride: attributes.Fluoride,
            iodine: attributes.Iodine,
            molybdenum: attributes.Molybdenum,
            chloride: attributes.Chloride,
            choline: attributes.Choline,
            tryptophan: attributes.Tryptophan,
            threonine: attributes.Threonine,
            isoleucine: attributes.Isoleucine,
            leucine: attributes.Leucine,
            lysine: attributes.Lysine,
            methionine: attributes.Methionine,
            cystine: attributes.Cystine,
            phenylalanine: attributes.Phenylalanine,
            tyrosine: attributes.Tyrosine,
            valine: attributes.Valine,
            arginine: attributes.Arginine,
            histidine: attributes.Histidine,
            alanine: attributes.Alanine,
            asparticAcid: attributes.AsparticAcid,
            glutamicAcid: attributes.GlutamicAcid,
            glycine: attributes.Glycine,
            proline: attributes.Proline,
            serine: attributes.Serine,
            hydroxyproline: attributes.Hydroxyproline,
            theobromine: attributes.Theobromine,
            ash: attributes.Ash,
            refuse: attributes.Refuse,
            mass: attributes.Mass,
            volume: attributes.Volume,
            fatFactor: attributes.FatFactor,
            proteinFactor: attributes.ProteinFactor,
            carbohydrateFactor: attributes.CarbohydrateFactor,
            alcoholFactor: attributes.AlcoholFactor,
            caloriesFromFat: attributes.CaloriesFromFat,
        };
    }

    parseRecipeTips(node: Node): model.RecipeTip[] {
        const element = "RecipeTips";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeTip: node.RecipeTip,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeTip.map(x => this.parseRecipeTip(x));
    }

    parseRecipeTip(node: Node): model.RecipeTip {
        const element = "RecipeTip";

        const text = this.requiredText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            optionalText: {
                Heading: true,
            },
        });

        return {
            text,
            heading: attributes.Heading === "True",
        };
    }

    parseRecipeReviews(node: Node): model.RecipeReview[] {
        const element = "RecipeReviews";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeReview: node.RecipeReview,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeReview.map(x => this.parseRecipeReview(x));
    }

    parseRecipeReview(node: Node): model.RecipeReview {
        const element = "RecipeReview";

        const text = this.requiredText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                Reviewer: node.Reviewer,
                ReviewDate: node.ReviewDate,
            },
            requiredNumber: {
                Rating: node.Rating,
            },
        });

        return {
            text,
            rating: attributes.Rating || 0,
            reviewer: attributes.Reviewer,
            reviewDate: attributes.ReviewDate,
        };
    }

    parseRecipeAuthorNotes(node: Node): model.RecipeAuthorNote[] {
        const element = "RecipeAuthorNotes";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeAuthorNote: node.RecipeAuthorNote,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeAuthorNote.map(x =>
            this.parseRecipeAuthorNote(x)
        );
    }

    parseRecipeAuthorNote(node: Node): model.RecipeAuthorNote {
        const element = "RecipeAuthorNote";

        const text = this.requiredText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            optionalText: {
                Heading: true,
            },
        });

        return {
            text,
            heading: attributes.Heading === "True",
        };
    }

    parseRecipeMeasures(node: Node): model.RecipeMeasure[] {
        const element = "RecipeMeasures";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeMeasure: node.RecipeMeasure,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeMeasure.map(x => this.parseRecipeMeasure(x));
    }

    parseRecipeMeasure(node: Node): model.RecipeMeasure {
        const element = "RecipeMeasure";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                Description: true,
                MeasureType: true,
            },
            requiredNumber: {
                MeasureID: true,
                GramWeight: true,
            },
        });

        return {
            measureId: attributes.MeasureID || 0,
            description: attributes.Description,
            gramWeight: attributes.GramWeight || 0,
            measureType: attributes.MeasureType,
        };
    }

    parseRecipeImages(node: Node): model.Media[] {
        const element = "RecipeImages";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeImage: node.RecipeImage,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeImage.map(x => this.parseMedia("RecipeImage", x));
    }

    parseRecipeMedia(node: Node): model.Media[] {
        const element = "RecipeMedia";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeMediaFile: node.RecipeMediaFile,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeMediaFile.map(x =>
            this.parseMedia("RecipeMediaFile", x)
        );
    }

    parseRecipeAttachments(node: Node): model.Media[] {
        const element = "RecipeAttachments";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RecipeAttachment: node.RecipeAttachment,
            },
        });

        this.noAttributes(element, node);

        return children.RecipeAttachment.map(x =>
            this.parseMedia("RecipeAttachment", x)
        );
    }

    parseIngredientImages(node: Node): model.Media[] {
        const element = "IngredientImages";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                IngredientImage: node.IngredientImage,
            },
        });

        this.noAttributes(element, node);

        return children.IngredientImage.map(x =>
            this.parseMedia("IngredientImage", x)
        );
    }

    parseIngredientAttachments(node: Node): model.Media[] {
        const element = "IngredientAttachments";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                IngredientAttachment: node.IngredientAttachment,
            },
        });

        this.noAttributes(element, node);

        return children.IngredientAttachment.map(x =>
            this.parseMedia("IngredientAttachment", x)
        );
    }

    parseMedia(element: string, node: Node): model.Media {
        const content = this.requiredText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                "xmlns:dt": true,
                "dt:dt": true,
            },
            optionalText: {
                FileType: true,
                FileName: true,
                Description: true,
            },
        });

        return {
            xmlns_dt: attributes["xmlns:dt"],
            dt_dt: attributes["dt:dt"],
            fileType: attributes.FileType,
            fileName: attributes.FileName,
            description: attributes.Description,
            content: content.replace(/\r?\n|\r/g, ""),
        };
    }

    parseIngredientFolders(node: Node): model.IngredientFolder[] {
        const element = "IngredientFolders";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                IngredientFolder: node.IngredientFolder,
            },
        });

        this.noAttributes(element, node);

        return children.IngredientFolder.map(x =>
            this.parseIngredientFolder(x)
        );
    }

    parseIngredientFolder(node: Node): model.IngredientFolder {
        const element = "IngredientFolder";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrOne: {
                AutoArchiveRules: node.AutoArchiveRules,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                Name: true,
            },
            optionalText: {
                Comments: true,
            },
            requiredNumber: {
                ID: true,
                ParentFolderID: true,
            },
        });

        return {
            id: attributes.ID || 0,
            name: attributes.Name,
            parentFolderId: attributes.ParentFolderID || undefined,
            comments: attributes.Comments,
            autoArchiveRules: ifPresent(children.AutoArchiveRules, x =>
                this.parseAutoArchiveRules(x)
            ),
        };
    }

    parseIngredients(node: Node): model.Ingredient[] {
        const element = "Ingredients";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                Ingredient: node.Ingredient,
            },
        });

        this.noAttributes(element, node);

        return children.Ingredient.map(x => this.parseIngredient(x));
    }

    parseIngredient(node: Node): model.Ingredient {
        const element = "Ingredient";

        this.noText(element, node);

        const children = this.children(element, node, {
            exactlyOne: {
                IngredientMeasures: node.IngredientMeasures,
            },
            zeroOrOne: {
                IngredientNutrition: node.IngredientNutrition,
                IngredientNotes: node.IngredientNotes,
                IngredientImage: node.IngredientImage,
                IngredientImages: node.IngredientImages,
                IngredientAttachments: node.IngredientAttachments,
                SourceImage: node.SourceImage,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                Name: true,
                CommonName: true,
            },
            optionalText: {
                Source: true,
                WebPage: true,
                Copyright: true,
                Comments: true,
                CreateDate: true,
                ColorFlag: true,
                UserData1: true,
                UserData2: true,
                UserData3: true,
                UserData4: true,
                UserData5: true,
                UserData11: true,
                UserData12: true,
                UserData13: true,
                UserData14: true,
                UserData15: true,
                GroceryAisle: true,
            },
            requiredNumber: {
                ID: true,
                IngredientFolderID: true,
            },
            optionalNumber: {
                UserData6: true,
                UserData7: true,
                UserData8: true,
                UserData9: true,
                UserData10: true,
            },
        });

        return {
            id: attributes.ID || 0,
            ingredientFolderId: attributes.IngredientFolderID || 0,
            name: attributes.Name,
            commonName: attributes.CommonName,
            source: attributes.Source,
            webPage: attributes.WebPage,
            copyright: attributes.Copyright,
            comments: attributes.Comments,
            createDate: attributes.CreateDate,
            colorFlag: attributes.ColorFlag,
            userData1: attributes.UserData1,
            userData2: attributes.UserData2,
            userData3: attributes.UserData3,
            userData4: attributes.UserData4,
            userData5: attributes.UserData5,
            userData6: attributes.UserData6,
            userData7: attributes.UserData7,
            userData8: attributes.UserData8,
            userData9: attributes.UserData9,
            userData10: attributes.UserData10,
            userData11: attributes.UserData11,
            userData12: attributes.UserData12,
            userData13: attributes.UserData13,
            userData14: attributes.UserData14,
            userData15: attributes.UserData15,
            measures: ifPresent(children.IngredientMeasures, x =>
                this.parseIngredientMeasures(x)
            ),
            nutrition:
                children.IngredientNutrition &&
                this.parseIngredientNutrition(children.IngredientNutrition),
            notes: ifPresent(children.IngredientNotes, x =>
                this.parseIngredientNotes(x)
            ),
            image:
                children.IngredientImage &&
                this.parseMedia("IngredientImage", children.IngredientImage),
            images: ifPresent(children.IngredientImages, x =>
                this.parseIngredientImages(x)
            ),
            attachments: ifPresent(children.IngredientAttachments, x =>
                this.parseIngredientAttachments(x)
            ),
            sourceImage:
                children.SourceImage &&
                this.parseMedia("SourceImage", children.SourceImage),
            groceryAisle: attributes.GroceryAisle,
        };
    }

    parseIngredientMeasures(node: Node): model.IngredientMeasure[] {
        const element = "IngredientMeasures";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                IngredientMeasure: node.IngredientMeasure,
            },
        });

        this.noAttributes(element, node);

        return children.IngredientMeasure.map(x =>
            this.parseIngredientMeasure(x)
        );
    }

    parseIngredientMeasure(node: Node): model.IngredientMeasure {
        const element = "IngredientMeasure";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                Description: true,
                MeasureType: true,
            },
            requiredNumber: {
                MeasureID: true,
                GramWeight: true,
            },
            optionalNumber: {
                MeasureCost: true,
            },
        });

        return {
            measureId: attributes.MeasureID || 0,
            description: attributes.Description,
            gramWeight: attributes.GramWeight || 0,
            measureType: attributes.MeasureType,
            measureCost: attributes.MeasureCost,
        };
    }

    parseIngredientNutrition(node: Node): model.IngredientNutrition {
        const element = "IngredientNutrition";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                NutritionSource: true,
            },
            optionalText: {
                NutritionCalculationMode: true,
            },
            requiredNumber: {
                ServingSize: true,
                ServingSizeMeasureID: true,
            },
            optionalNumber: {
                DefaultMeasureID: true,
                Calories: true,
                Energy: true,
                TotalFat: true,
                SaturatedFat: true,
                TransFattyAcids: true,
                Cholesterol: true,
                Sodium: true,
                TotalCarbohydrate: true,
                Fiber: true,
                Protein: true,
                Calcium: true,
                Folate: true,
                Iron: true,
                Magnesium: true,
                Niacin: true,
                PantothenicAcid: true,
                Phosphorus: true,
                Potassium: true,
                VitaminA: true,
                VitaminB12: true,
                VitaminB6: true,
                VitaminC: true,
                VitaminE: true,
                Zinc: true,
                Thiamin: true,
                MonounsaturatedFat: true,
                PolyunsaturatedFat: true,
                Sugar: true,
                SugarAlcohols: true,
                Copper: true,
                Manganese: true,
                Riboflavin: true,
                Selenium: true,
                VitaminD: true,
                Biotin: true,
                Alcohol: true,
                Caffeine: true,
                Water: true,
                SaturatedFattyAcid4_0: true,
                SaturatedFattyAcid6_0: true,
                SaturatedFattyAcid8_0: true,
                SaturatedFattyAcid10_0: true,
                SaturatedFattyAcid12_0: true,
                SaturatedFattyAcid13_0: true,
                SaturatedFattyAcid14_0: true,
                SaturatedFattyAcid15_0: true,
                SaturatedFattyAcid16_0: true,
                SaturatedFattyAcid17_0: true,
                SaturatedFattyAcid18_0: true,
                SaturatedFattyAcid20_0: true,
                SaturatedFattyAcid22_0: true,
                SaturatedFattyAcid24_0: true,
                MonounsaturatedFattyAcid14_1: true,
                MonounsaturatedFattyAcid15_1: true,
                MonounsaturatedFattyAcid16_1: true,
                MonounsaturatedFattyAcid17_1: true,
                MonounsaturatedFattyAcid18_1: true,
                MonounsaturatedFattyAcid20_1: true,
                MonounsaturatedFattyAcid22_1: true,
                MonounsaturatedFattyAcid24_1: true,
                PolyunsaturatedFattyAcid18_2: true,
                PolyunsaturatedFattyAcid18_3: true,
                PolyunsaturatedFattyAcid18_4: true,
                PolyunsaturatedFattyAcid20_3: true,
                PolyunsaturatedFattyAcid20_4: true,
                PolyunsaturatedFattyAcid21_5: true,
                PolyunsaturatedFattyAcid22_4: true,
                Omega3FattyAcids: true,
                AlphaLinolenicAcid: true,
                EicosapentaenoicAcid: true,
                DocosapentaenoicAcid: true,
                DocosahexaenoicAcid: true,
                Omega6FattyAcids: true,
                LinoleicAcid: true,
                GammaLinolenicAcid: true,
                EicosadienoicAcid: true,
                DihomoGammaLinolenicAcid: true,
                ArachidonicAcid: true,
                TransMonoenoicFattyAcids: true,
                TransPolyenoicFattyAcids: true,
                Phytosterols: true,
                BetaSitosterol: true,
                Stigmasterol: true,
                Campesterol: true,
                Starch: true,
                Sucrose: true,
                Glucose: true,
                Fructose: true,
                Lactose: true,
                Maltose: true,
                Galactose: true,
                Retinol: true,
                BetaCarotene: true,
                AlphaCarotene: true,
                BetaCryptoxanthin: true,
                Lycopene: true,
                BetaTocopherol: true,
                GammaTocopherol: true,
                DeltaTocopherol: true,
                VitaminK: true,
                Chromium: true,
                Fluoride: true,
                Iodine: true,
                Molybdenum: true,
                Chloride: true,
                Choline: true,
                Tryptophan: true,
                Threonine: true,
                Isoleucine: true,
                Leucine: true,
                Lysine: true,
                Methionine: true,
                Cystine: true,
                Phenylalanine: true,
                Tyrosine: true,
                Valine: true,
                Arginine: true,
                Histidine: true,
                Alanine: true,
                AsparticAcid: true,
                GlutamicAcid: true,
                Glycine: true,
                Proline: true,
                Serine: true,
                Hydroxyproline: true,
                Theobromine: true,
                Ash: true,
                Refuse: true,
                Mass: true,
                Volume: true,
                FatFactor: true,
                ProteinFactor: true,
                CarbohydrateFactor: true,
                AlcoholFactor: true,
                CaloriesFromFat: true,
            },
        });

        return {
            servingSize: attributes.ServingSize || 0,
            servingSizeMeasureId: attributes.ServingSizeMeasureID || 0,
            nutritionSource: attributes.NutritionSource,
            defaultMeasureId: attributes.DefaultMeasureID || undefined,
            nutritionCalculationMode: attributes.NutritionCalculationMode,
            calories: attributes.Calories,
            energy: attributes.Energy,
            totalFat: attributes.TotalFat,
            saturatedFat: attributes.SaturatedFat,
            transFattyAcids: attributes.TransFattyAcids,
            cholesterol: attributes.Cholesterol,
            sodium: attributes.Sodium,
            totalCarbohydrate: attributes.TotalCarbohydrate,
            fiber: attributes.Fiber,
            protein: attributes.Protein,
            calcium: attributes.Calcium,
            folate: attributes.Folate,
            iron: attributes.Iron,
            magnesium: attributes.Magnesium,
            niacin: attributes.Niacin,
            pantothenicAcid: attributes.PantothenicAcid,
            phosphorus: attributes.Phosphorus,
            potassium: attributes.Potassium,
            vitaminA: attributes.VitaminA,
            vitaminB12: attributes.VitaminB12,
            vitaminB6: attributes.VitaminB6,
            vitaminC: attributes.VitaminC,
            vitaminE: attributes.VitaminE,
            zinc: attributes.Zinc,
            thiamin: attributes.Thiamin,
            monounsaturatedFat: attributes.MonounsaturatedFat,
            polyunsaturatedFat: attributes.PolyunsaturatedFat,
            sugar: attributes.Sugar,
            sugarAlcohols: attributes.SugarAlcohols,
            copper: attributes.Copper,
            manganese: attributes.Manganese,
            riboflavin: attributes.Riboflavin,
            selenium: attributes.Selenium,
            vitaminD: attributes.VitaminD,
            biotin: attributes.Biotin,
            alcohol: attributes.Alcohol,
            caffeine: attributes.Caffeine,
            water: attributes.Water,
            saturatedFattyAcid4_0: attributes.SaturatedFattyAcid4_0,
            saturatedFattyAcid6_0: attributes.SaturatedFattyAcid6_0,
            saturatedFattyAcid8_0: attributes.SaturatedFattyAcid8_0,
            saturatedFattyAcid10_0: attributes.SaturatedFattyAcid10_0,
            saturatedFattyAcid12_0: attributes.SaturatedFattyAcid12_0,
            saturatedFattyAcid13_0: attributes.SaturatedFattyAcid13_0,
            saturatedFattyAcid14_0: attributes.SaturatedFattyAcid14_0,
            saturatedFattyAcid15_0: attributes.SaturatedFattyAcid15_0,
            saturatedFattyAcid16_0: attributes.SaturatedFattyAcid16_0,
            saturatedFattyAcid17_0: attributes.SaturatedFattyAcid17_0,
            saturatedFattyAcid18_0: attributes.SaturatedFattyAcid18_0,
            saturatedFattyAcid20_0: attributes.SaturatedFattyAcid20_0,
            saturatedFattyAcid22_0: attributes.SaturatedFattyAcid22_0,
            saturatedFattyAcid24_0: attributes.SaturatedFattyAcid24_0,
            monounsaturatedFattyAcid14_1:
                attributes.MonounsaturatedFattyAcid14_1,
            monounsaturatedFattyAcid15_1:
                attributes.MonounsaturatedFattyAcid15_1,
            monounsaturatedFattyAcid16_1:
                attributes.MonounsaturatedFattyAcid16_1,
            monounsaturatedFattyAcid17_1:
                attributes.MonounsaturatedFattyAcid17_1,
            monounsaturatedFattyAcid18_1:
                attributes.MonounsaturatedFattyAcid18_1,
            monounsaturatedFattyAcid20_1:
                attributes.MonounsaturatedFattyAcid20_1,
            monounsaturatedFattyAcid22_1:
                attributes.MonounsaturatedFattyAcid22_1,
            monounsaturatedFattyAcid24_1:
                attributes.MonounsaturatedFattyAcid24_1,
            polyunsaturatedFattyAcid18_2:
                attributes.PolyunsaturatedFattyAcid18_2,
            polyunsaturatedFattyAcid18_3:
                attributes.PolyunsaturatedFattyAcid18_3,
            polyunsaturatedFattyAcid18_4:
                attributes.PolyunsaturatedFattyAcid18_4,
            polyunsaturatedFattyAcid20_3:
                attributes.PolyunsaturatedFattyAcid20_3,
            polyunsaturatedFattyAcid20_4:
                attributes.PolyunsaturatedFattyAcid20_4,
            polyunsaturatedFattyAcid21_5:
                attributes.PolyunsaturatedFattyAcid21_5,
            polyunsaturatedFattyAcid22_4:
                attributes.PolyunsaturatedFattyAcid22_4,
            omega3FattyAcids: attributes.Omega3FattyAcids,
            alphaLinolenicAcid: attributes.AlphaLinolenicAcid,
            eicosapentaenoicAcid: attributes.EicosapentaenoicAcid,
            docosapentaenoicAcid: attributes.DocosapentaenoicAcid,
            docosahexaenoicAcid: attributes.DocosahexaenoicAcid,
            omega6FattyAcids: attributes.Omega6FattyAcids,
            linoleicAcid: attributes.LinoleicAcid,
            gammaLinolenicAcid: attributes.GammaLinolenicAcid,
            eicosadienoicAcid: attributes.EicosadienoicAcid,
            dihomoGammaLinolenicAcid: attributes.DihomoGammaLinolenicAcid,
            arachidonicAcid: attributes.ArachidonicAcid,
            transMonoenoicFattyAcids: attributes.TransMonoenoicFattyAcids,
            transPolyenoicFattyAcids: attributes.TransPolyenoicFattyAcids,
            phytosterols: attributes.Phytosterols,
            betaSitosterol: attributes.BetaSitosterol,
            stigmasterol: attributes.Stigmasterol,
            campesterol: attributes.Campesterol,
            starch: attributes.Starch,
            sucrose: attributes.Sucrose,
            glucose: attributes.Glucose,
            fructose: attributes.Fructose,
            lactose: attributes.Lactose,
            maltose: attributes.Maltose,
            galactose: attributes.Galactose,
            retinol: attributes.Retinol,
            betaCarotene: attributes.BetaCarotene,
            alphaCarotene: attributes.AlphaCarotene,
            betaCryptoxanthin: attributes.BetaCryptoxanthin,
            lycopene: attributes.Lycopene,
            betaTocopherol: attributes.BetaTocopherol,
            gammaTocopherol: attributes.GammaTocopherol,
            deltaTocopherol: attributes.DeltaTocopherol,
            vitaminK: attributes.VitaminK,
            chromium: attributes.Chromium,
            fluoride: attributes.Fluoride,
            iodine: attributes.Iodine,
            molybdenum: attributes.Molybdenum,
            chloride: attributes.Chloride,
            choline: attributes.Choline,
            tryptophan: attributes.Tryptophan,
            threonine: attributes.Threonine,
            isoleucine: attributes.Isoleucine,
            leucine: attributes.Leucine,
            lysine: attributes.Lysine,
            methionine: attributes.Methionine,
            cystine: attributes.Cystine,
            phenylalanine: attributes.Phenylalanine,
            tyrosine: attributes.Tyrosine,
            valine: attributes.Valine,
            arginine: attributes.Arginine,
            histidine: attributes.Histidine,
            alanine: attributes.Alanine,
            asparticAcid: attributes.AsparticAcid,
            glutamicAcid: attributes.GlutamicAcid,
            glycine: attributes.Glycine,
            proline: attributes.Proline,
            serine: attributes.Serine,
            hydroxyproline: attributes.Hydroxyproline,
            theobromine: attributes.Theobromine,
            ash: attributes.Ash,
            refuse: attributes.Refuse,
            mass: attributes.Mass,
            volume: attributes.Volume,
            fatFactor: attributes.FatFactor,
            proteinFactor: attributes.ProteinFactor,
            carbohydrateFactor: attributes.CarbohydrateFactor,
            alcoholFactor: attributes.AlcoholFactor,
            caloriesFromFat: attributes.CaloriesFromFat,
        };
    }

    parseIngredientNotes(node: Node): model.IngredientNote[] {
        const element = "IngredientNotes";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                IngredientNote: node.IngredientNote,
            },
        });

        this.noAttributes(element, node);

        return children.IngredientNote.map(x => this.parseIngredientNote(x));
    }

    parseIngredientNote(node: Node): model.IngredientNote {
        const element = "IngredientNote";

        const text = this.requiredText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            optionalText: {
                Heading: true,
            },
        });

        return {
            text,
            heading: attributes.Heading === "True",
        };
    }
}
