export interface ChildRequest<
    TZeroOrMore,
    TOneOrMore,
    TZeroOrOne,
    TExactlyOne
> {
    zeroOrMore?: TZeroOrMore;
    oneOrMore?: TOneOrMore;
    zeroOrOne?: TZeroOrOne;
    exactlyOne?: TExactlyOne;
}

export type ChildResponse<
    TZeroOrMore,
    TOneOrMore,
    TZeroOrOne,
    TExactlyOne
> = ZeroOrMoreResponse<TZeroOrMore> &
    OneOrMoreResponse<TOneOrMore> &
    TZeroOrOneReponse<TZeroOrOne> &
    TExactlyOneResponse<TExactlyOne>;

export type ZeroOrMoreResponse<T> = { [P in keyof T]: Node[] };

export type OneOrMoreResponse<T> = { [P in keyof T]: Node[] };

export type TZeroOrOneReponse<T> = { [P in keyof T]: Node | undefined };

export type TExactlyOneResponse<T> = { [P in keyof T]: Node | undefined };

export type Node = HasChildren & HasType & HasValue;

interface HasChildren {
    [key: string]: Node[] | undefined;
}

interface HasType {
    "@type": string | undefined;
}

interface HasValue {
    "@value": string | number | boolean | null | undefined;
}

/**
 * Non-conformant json-ld expand.
 *
 * Presumably this was written to make it easier for parsing in some way...
 */
export function expand(value: any): Node[] {
    const result: any = {};

    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null ||
        value === undefined
    ) {
        return [
            {
                "@type": undefined,
                "@value": value,
            },
        ];
    } else if (Array.isArray(value)) {
        return value.map(x => expand(x)[0]);
    } else {
        if (value["@type"]) {
            result["@type"] = value["@type"];
        }

        if (value["@value"]) {
            result["@value"] = value["@value"];
        }

        Object.keys(value).forEach(key => {
            if (key === "@context") {
                // ignore
            } else if (key === "@type") {
                result["@type"] = value["@type"];
            } else if (key === "@value") {
                result["@value"] = expand(value[key]);
            } else {
                result[key] = expand(value[key]);
            }
        });

        return [result];
    }
}

export class BaseParser {
    warnings: string[] = [];

    requiredType(type: string, node: Node) {
        if (node["@type"] === undefined) {
            this.warnings.push(
                `Required "@type" property missing from <${type}> object`
            );
        } else if (node["@type"] !== type) {
            this.warnings.push(
                `Expected "@type" property to be "${type}" but was "${
                    node["@type"]
                }"`
            );
        }
    }

    optionalType(type: string, node: Node) {
        if (node["@type"] !== undefined && node["@type"] !== type) {
            this.warnings.push(
                `Expected "@type" property to be "${type}" but was "${
                    node["@type"]
                }"`
            );
        }
    }

    requiredValue(type: string, node: Node): string | number | boolean | null {
        if (node["@value"] === undefined) {
            this.warnings.push(`Value expected for <${type}> object`);
            return "";
        } else {
            return node["@value"] as any;
        }
    }

    requiredString(type: string, node: Node): string {
        const value = node["@value"];
        if (value === undefined) {
            this.warnings.push(`Value expected for <${type}>`);
            return "";
        } else if (typeof value === "string") {
            return value;
        } else if (value === null) {
            this.warnings.push(
                `String value expected for <${type}> but was null`
            );
            return "";
        } else {
            this.warnings.push(
                `String value expected for <${type}> but was ${typeof value} "${value}"`
            );
            return value.toString();
        }
    }

    requiredNumber(type: string, node: Node): number {
        const value = node["@value"];
        if (typeof value === "number") {
            return value;
        } else if (value === undefined) {
            this.warnings.push(`Value expected for <${type}>`);
            return 0;
        } else if (value === null) {
            this.warnings.push(
                `Number value expected for <${type}> but was null`
            );
            return 0;
        } else if (typeof value === "string") {
            this.warnings.push(
                `Number value expected for <${type}> but was string "${value}"`
            );
            const n = parseFloat(value);
            return isNaN(n) ? 0 : n;
        } else {
            this.warnings.push(
                `Number value expected for <${type}> but was boolean ${value}`
            );
            return 0;
        }
    }

    requiredStringOrNumber(type: string, node: Node): string | number {
        const value = node["@value"];
        if (value === undefined) {
            this.warnings.push(`Value expected for <${type}>`);
            return "";
        } else if (typeof value === "string" || typeof value === "number") {
            return value;
        } else if (value === null) {
            this.warnings.push(
                `String value expected for <${type}> but was null`
            );
            return "";
        } else {
            this.warnings.push(
                `String value expected for <${type}> but was ${typeof value} ${value}`
            );
            return value.toString();
        }
    }

    requiredBoolean(type: string, node: Node, defaultValue: boolean): boolean {
        const value = node["@value"];
        if (value === undefined) {
            this.warnings.push(`Value expected for <${type}>`);
            return defaultValue;
        } else if (value === null) {
            this.warnings.push(
                `Boolean value expected for <${type}> but was null`
            );
            return defaultValue;
        } else if (typeof value === "string") {
            this.warnings.push(
                `Boolean value expected for <${type}> but was string "${value}"`
            );
            const upper = value.toUpperCase();
            if (upper === "TRUE" || upper === "T" || upper === "Y") {
                return true;
            } else if (upper === "FALSE" || upper === "F" || upper === "N") {
                return false;
            } else {
                return defaultValue;
            }
        } else if (typeof value === "number") {
            this.warnings.push(
                `Boolean value expected for <${type}> but was number ${value}`
            );
            return defaultValue;
        } else {
            return value;
        }
    }

    parseString(type: string, node: Node): string {
        this.optionalType(type, node);
        const value = this.requiredString(type, node);
        this.noChildren(type, node);

        return value;
    }

    parseNumber(type: string, node: Node): number {
        this.optionalType(type, node);
        const value = this.requiredNumber(type, node);
        this.noChildren(type, node);

        return value;
    }

    parseStringOrNumber(type: string, node: Node): string | number {
        this.optionalType(type, node);
        const value = this.requiredStringOrNumber(type, node);
        this.noChildren(type, node);

        return value;
    }

    parseBoolean(type: string, node: Node, defaultValue: boolean): boolean {
        this.optionalType(type, node);
        const value = this.requiredBoolean(type, node, defaultValue);
        this.noChildren(type, node);

        return value;
    }

    noValue(type: string, node: Node): void {
        if (node["@value"] !== undefined) {
            this.warnings.push(
                `Simple value not expected for <${type}> object`
            );
        }
    }

    noChildren(element: string, node: Node): void {
        this.children(element, node, {});
    }

    children<TZeroOrMore, TOneOrMore, TZeroOrOne, TExactlyOne>(
        type: string,
        node: Node,
        request: ChildRequest<TZeroOrMore, TOneOrMore, TZeroOrOne, TExactlyOne>
    ): ChildResponse<TZeroOrMore, TOneOrMore, TZeroOrOne, TExactlyOne> {
        const zeroOrMore = Object.keys(request.zeroOrMore || {});
        const oneOrMore = Object.keys(request.oneOrMore || {});
        const zeroOrOne = Object.keys(request.zeroOrOne || {});
        const exactlyOne = Object.keys(request.exactlyOne || {});
        const children = Object.keys(node);
        const response: any = {};

        zeroOrMore.forEach(child => {
            response[child] =
                children.indexOf(child) === -1
                    ? []
                    : (response[child] = node[child]);
        });

        oneOrMore.forEach(child => {
            if (children.indexOf(child) === -1) {
                this.warnings.push(
                    `Required child <${child}> missing from <${type}> object`
                );
                response[child] = [];
            } else {
                response[child] = node[child];
            }
        });

        zeroOrOne.forEach(child => {
            if (children.indexOf(child) === -1) {
                response[child] = undefined;
            } else if ((node as any)[child].length > 1) {
                const length = (node as any)[child].length;
                this.warnings.push(
                    `Expected <${type}> object to have 0 or 1 <${child}> children but had ${length}`
                );
                response[child] = (node as any)[child][0];
            } else {
                response[child] = (node as any)[child][0];
            }
        });

        exactlyOne.forEach(child => {
            if (children.indexOf(child) === -1) {
                this.warnings.push(
                    `Required child <${child}> missing from <${type}> object`
                );
                response[child] = undefined;
            } else if ((node as any)[child].length > 1) {
                const length = (node as any)[child].length;
                this.warnings.push(
                    `Expected <${type}> object to have 1 <${child}> child but had ${length}`
                );
                response[child] = (node as any)[child][0];
            } else {
                response[child] = (node as any)[child][0];
            }
        });

        children.forEach(child => {
            if (
                child !== "@type" &&
                child !== "@value" &&
                child !== "@graph" &&
                zeroOrMore.indexOf(child) === -1 &&
                oneOrMore.indexOf(child) === -1 &&
                zeroOrOne.indexOf(child) === -1 &&
                exactlyOne.indexOf(child) === -1
            ) {
                this.warnings.push(
                    `Child <${child}> not expected in <${type}> object`
                );
            }
        });

        return response;
    }
}

export function ifPresent<T, R>(
    maybe: T | undefined,
    fn: (arg: T) => R[]
): R[] {
    if (maybe) {
        return fn(maybe);
    } else {
        return [];
    }
}
