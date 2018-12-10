import { BaseParser, ifPresent, Node } from "../xmlParser";
import * as model from "./model";

export class Parser extends BaseParser {
    parse(node: Node): model.Mx2 {
        this.warnings = [];

        const element = "mx2";

        this.noText(element, node);

        const children = this.children(element, node, {
            exactlyOne: {
                Summ: node.Summ,
            },
            zeroOrMore: {
                RcpE: node.RcpE,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                source: true,
                date: true,
            },
        });

        const names = ifPresent(children.Summ, x => this.parseSumm(x));
        const allRecipes = children.RcpE.map(x => this.parseRcpE(x));

        // Filter out the embedded recipes and include embedded recipes in the parent.
        // The names list should contain one name for each non-embedded recipe, hopefully in the same order.

        let recipes: model.Recipe[] = allRecipes;
        if (names.length > 0) {
            recipes = [];
            let i = 0;
            let j = 0;
            while (i < names.length && j < allRecipes.length) {
                if (names[i] === allRecipes[j].name) {
                    recipes.push(allRecipes[j]);
                    i += 1;
                } else if (i > 0) {
                    recipes[i - 1].embeddedRecipes.push(allRecipes[j]);
                }
                j += 1;
            }
        }

        if (recipes.length !== names.length) {
            this.warnings.push(
                `Expected ${recipes.length} recipes to go along with ${
                    names.length
                } recipe names`
            );
        }

        return {
            source: attributes.source,
            date: attributes.date,
            names,
            recipes,
            warnings: this.warnings,
        };
    }

    parseSumm(node: Node): string[] {
        const element = "Summ";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                Nam: node.Nam,
            },
        });

        this.noAttributes(element, node);

        return children.Nam.map(x => this.parseText("Nam", x));
    }

    parseRcpE(node: Node): model.Recipe {
        const element = "RcpE";

        this.noText(element, node);

        const children = this.children(element, node, {
            exactlyOne: {
                Serv: node.Serv,
                PrpT: node.PrpT,
                Nutr: node.Nutr,
            },
            zeroOrOne: {
                TTim: node.TTim,
                Srce: node.Srce,
                Desc: node.Desc,
                Natn: node.Natn,
                CpyR: node.CpyR,
                SrvI: node.SrvI,
                Note: node.Note,
                Wine: node.Wine,
                AltS: node.AltS,
                AltT: node.AltT,
                Yield: node.Yield,
                CatS: node.CatS,
                DirS: node.DirS,
                RatS: node.RatS,
            },
            zeroOrMore: {
                IngR: node.IngR,
            },
        });

        const attributes = this.attributes(element, node, {
            requiredText: {
                author: true,
                name: true,
            },
            optionalText: {
                img: true,
            },
        });

        const servings = parseFloat(
            (children.Serv && this.parseServ(children.Serv)) || ""
        );

        return {
            name: attributes.name,
            author: attributes.author,
            image: attributes.img || undefined,
            servings: isNaN(servings) || servings === 0 ? undefined : servings,
            preparationTime:
                (children.PrpT && this.parseTime("PrpT", children.PrpT)) ||
                undefined,
            totalTime:
                (children.TTim && this.parseTime("TTim", children.TTim)) ||
                undefined,
            nutrition:
                (children.Nutr && this.parseText("Nutr", children.Nutr)) || "",
            source: children.Srce && this.parseText("Srce", children.Srce),
            description: children.Desc && this.parseText("Desc", children.Desc),
            cuisine: children.Natn && this.parseText("Natn", children.Natn),
            copyright: children.CpyR && this.parseText("CpyR", children.CpyR),
            servingIdeas:
                children.SrvI && this.parseText("SrvI", children.SrvI),
            note: children.Note && this.parseText("Note", children.Note),
            suggestedWine:
                children.Wine && this.parseText("Wine", children.Wine),
            alternateSource: children.AltS && this.parseAltS(children.AltS),
            alternateTime: children.AltT && this.parseAltT(children.AltT),
            yield: children.Yield && this.parseYield(children.Yield),
            categories: ifPresent(children.CatS, x => this.parseCatS(x)),
            ingredients: children.IngR.map(x => this.parseIngR(x)),
            directions: ifPresent(children.DirS, x => this.parseDirS(x)),
            ratings: ifPresent(children.RatS, x => this.parseRatS(x)),
            embeddedRecipes: [],
        };
    }

    parseServ(node: Node): string {
        const element = "Serv";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                qty: true,
            },
        });

        return attributes.qty;
    }

    parseTime(element: string, node: Node): string | undefined {
        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                elapsed: true,
            },
        });

        return attributes.elapsed === "0:00" ? undefined : attributes.elapsed;
    }

    parseCatS(node: Node): string[] {
        const element = "CatS";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                CatT: node.CatT,
            },
        });

        this.noAttributes(element, node);

        return children.CatT.map(x => this.parseText("CatT", x));
    }

    parseIngR(node: Node): model.Ingredient {
        const element = "IngR";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrOne: {
                IPrp: node.IPrp,
                INtI: node.INtI,
            },
        });

        const attributes = this.attributes(element, node, {
            optionalText: {
                name: true,
                unit: true,
                qty: true,
                code: true,
            },
        });

        const nutritionalLink = parseFloat(
            (children.INtI && this.parseText("INtI", children.INtI)) || ""
        );

        return {
            ingredient: attributes.name,
            unit: attributes.unit,
            quantity: attributes.qty,
            code: attributes.code || "I",
            preparation: children.IPrp && this.parseText("IPrp", children.IPrp),
            nutritionalLink: isNaN(nutritionalLink)
                ? undefined
                : nutritionalLink,
        };
    }

    parseDirS(node: Node): model.Direction[] {
        const element = "DirS";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                DirT: node.DirT,
            },
        });

        this.noAttributes(element, node);

        return children.DirT.map(x => this.parseDirT(x));
    }

    parseDirT(node: Node): model.Direction {
        const element = "DirT";

        const text = this.optionalText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            optionalText: {
                img: true,
            },
        });

        return {
            text,
            image: attributes.img || undefined,
        };
    }

    parseAltS(node: Node): model.AlternateSource {
        const element = "AltS";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                label: true,
                source: true,
            },
        });

        return {
            label: attributes.label,
            source: attributes.source,
        };
    }

    parseAltT(node: Node): model.AlternateTime {
        const element = "AltT";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                label: true,
                elapsed: true,
            },
        });

        return {
            label: attributes.label,
            elapsed:
                attributes.elapsed === "0:00" ? undefined : attributes.elapsed,
        };
    }

    parseYield(node: Node): model.Yield {
        const element = "Yield";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                unit: true,
            },
            requiredNumber: {
                qty: true,
            },
        });

        return {
            quantity: attributes.qty || 0,
            unit: attributes.unit,
        };
    }

    parseRatS(node: Node): model.Rating[] {
        const element = "RatS";

        this.noText(element, node);

        const children = this.children(element, node, {
            zeroOrMore: {
                RatE: node.RatE,
            },
        });

        this.noAttributes(element, node);

        return children.RatE.map(x => this.parseRatE(x));
    }

    parseRatE(node: Node): model.Rating {
        const element = "RatE";

        this.noText(element, node);

        this.noChildren(element, node);

        const attributes = this.attributes(element, node, {
            requiredText: {
                name: true,
            },
            requiredNumber: {
                value: true,
            },
        });

        return {
            name: attributes.name,
            value: attributes.value || 0,
        };
    }
}
