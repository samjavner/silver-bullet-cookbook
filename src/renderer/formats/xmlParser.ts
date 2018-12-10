export interface AttributeRequest<
    TRequiredText,
    TOptionalText,
    TRequiredNumber,
    TOptionalNumber
> {
    requiredText?: TRequiredText;
    optionalText?: TOptionalText;
    requiredNumber?: TRequiredNumber;
    optionalNumber?: TOptionalNumber;
}

export type AttributeResponse<
    TRequiredText,
    TOptionalText,
    TRequiredNumber,
    TOptionalNumber
> = RequiredTextResponse<TRequiredText> &
    OptionalTextResponse<TOptionalText> &
    RequiredNumberResponse<TRequiredNumber> &
    OptionalNumberResponse<TOptionalNumber>;

export type RequiredTextResponse<T> = { [P in keyof T]: string };

export type OptionalTextResponse<T> = { [P in keyof T]: string | undefined };

export type RequiredNumberResponse<T> = { [P in keyof T]: number | undefined };

export type OptionalNumberResponse<T> = { [P in keyof T]: number | undefined };

export interface ElementRequest<
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

export type ElementResponse<
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

/**
 * XML node as returned by xml2js.
 */
export type Node = HasChildren & HasText & HasAttributes;

interface HasChildren {
    [key: string]: Node[] | undefined;
}

interface HasText {
    _: string | undefined;
}

interface HasAttributes {
    $:
        | {
              [key: string]: string;
          }
        | undefined;
}

export class BaseParser {
    warnings: string[] = [];

    /**
     * Asserts that this node should not have any text content.
     * Adds a warning message if it does.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     */
    noText(element: string, node: Node): void {
        if (node._ !== undefined) {
            this.warnings.push(
                `Text content not expected in element <${element}>`
            );
        }
    }

    /**
     * Asserts that this node may or may not contain text content.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     *
     * @returns The value of the text content, or undefined if there is no text content.
     */
    optionalText(element: string, node: Node): string | undefined {
        return node._ ? node._.replace(/\r\n/g, "\n") : node._;
    }

    /**
     * Asserts that this node should have text content.
     * Adds a warning message if it does not.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     *
     * @returns The value of the text content, or an empty string if the text content is missing.
     */
    requiredText(element: string, node: Node): string {
        if (node._ === undefined) {
            this.warnings.push(
                `Required text content missing from element <${element}>`
            );
            return "";
        } else {
            return node._ ? node._.replace(/\r\n/g, "\n") : node._;
        }
    }

    /**
     * Asserts that this node should not have any children.
     * Adds a warning message for each child.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     */
    noChildren(element: string, node: Node): void {
        this.children(element, node, {});
    }

    /**
     * Asserts that this node should have the specified children.
     *
     * Adds a warning for each element name that is not present in the specified
     * quantity as well as a warning for any element name that is present but was
     * not specified.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     * @param request Specification of how many children should exist.
     *
     * This is an object containing up to four keys:
     *
     * - zeroOrMore
     * - oneOrMore
     * - zeroOrOne
     * - exactlyOne
     *
     * The value for each key is an object specifying which element names for which this applies.
     *
     * @returns An object containing all of the specified element names as keys.
     *
     * The type of the value for each key depends on the provided specification:
     *
     * - zeroOrMore: Node[]
     * - oneOrMore: Node[]
     * - zeroOrOne: Node | undefined
     * - exactlyOne: Node | undefined
     */
    children<TZeroOrMore, TOneOrMore, TZeroOrOne, TExactlyOne>(
        element: string,
        node: Node,
        request: ElementRequest<
            TZeroOrMore,
            TOneOrMore,
            TZeroOrOne,
            TExactlyOne
        >
    ): ElementResponse<TZeroOrMore, TOneOrMore, TZeroOrOne, TExactlyOne> {
        const zeroOrMore = Object.keys(request.zeroOrMore || {});
        const oneOrMore = Object.keys(request.oneOrMore || {});
        const zeroOrOne = Object.keys(request.zeroOrOne || {});
        const exactlyOne = Object.keys(request.exactlyOne || {});
        const children = Object.keys(node);
        const response: any = {};

        zeroOrMore.forEach(child => {
            response[child] = children.indexOf(child) === -1 ? [] : node[child];
        });

        oneOrMore.forEach(child => {
            if (children.indexOf(child) === -1) {
                this.warnings.push(
                    `Required child <${child}> missing from element <${element}>`
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
                    `Expected element <${element}> to have 0 or 1 <${child}> child element but had ${length} children`
                );
                response[child] = (node as any)[child][0];
            } else {
                response[child] = (node as any)[child][0];
            }
        });

        exactlyOne.forEach(child => {
            if (children.indexOf(child) === -1) {
                this.warnings.push(
                    `Required child <${child}> missing from element <${element}>`
                );
                response[child] = undefined;
            } else if ((node as any)[child].length > 1) {
                const length = (node as any)[child].length;
                this.warnings.push(
                    `Expected element <${element}> to have 1 <${child}> child element but had ${length} children`
                );
                response[child] = (node as any)[child][0];
            } else {
                response[child] = (node as any)[child][0];
            }
        });

        children.forEach(child => {
            if (
                child !== "$" &&
                child !== "_" &&
                zeroOrMore.indexOf(child) === -1 &&
                oneOrMore.indexOf(child) === -1 &&
                zeroOrOne.indexOf(child) === -1 &&
                exactlyOne.indexOf(child) === -1
            ) {
                this.warnings.push(
                    `Child <${child}> not expected in element <${element}>`
                );
            }
        });

        return response;
    }

    /**
     * Asserts that this node should not have any attributes.
     * Adds a warning message for each attribute.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     */
    noAttributes(element: string, node: Node): void {
        this.attributes(element, node, {});
    }

    /**
     * Asserts that this node should have the specified attributes.
     *
     * Adds a warning for each required attribute that is missing as well as a
     * warning for any attribute that is present but was not specified.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     * @param request Specification of the attributes that should exist.
     *
     * This is an object containing up to four keys:
     *
     * - requiredText
     * - optionalText
     * - requiredNumber
     * - optionalNumber
     *
     * The value for each key is an object specifying which attribute names for which this applies.
     *
     * @returns An object containing all of the specified attribute names as keys.
     *
     * The type of the value for each key depends on the provided specification:
     *
     * - requiredText: string (if the attribute is missing, this will be an empty string)
     * - optionalText: string | undefined (if the attribute is missing, this will be undefined)
     * - requiredNumber: number | undefined (if the attribute is missing or is not a number, this will be undefined)
     * - optionalNumber: number | undefined (if the attribute is missing or is not a number, this will be undefined)
     */
    attributes<TRequiredText, TOptionalText, TRequiredNumber, TOptionalNumber>(
        element: string,
        node: Node,
        request: AttributeRequest<
            TRequiredText,
            TOptionalText,
            TRequiredNumber,
            TOptionalNumber
        >
    ): AttributeResponse<
        TRequiredText,
        TOptionalText,
        TRequiredNumber,
        TOptionalNumber
    > {
        const requiredText = Object.keys(request.requiredText || {});
        const optionalText = Object.keys(request.optionalText || {});
        const requiredNumber = Object.keys(request.requiredNumber || {});
        const optionalNumber = Object.keys(request.optionalNumber || {});
        const attributes = node.$ ? Object.keys(node.$) : [];
        const response: any = {};

        requiredText.forEach(attribute => {
            if (attributes.indexOf(attribute) === -1) {
                this.warnings.push(
                    `Required attribute "${attribute}" missing from element <${element}>`
                );
                response[attribute] = "";
            } else {
                const value = (node as any).$[attribute].trim();
                response[attribute] = value
                    ? value.replace(/\r\n/g, "\n")
                    : value;
            }
        });

        requiredNumber.forEach(attribute => {
            if (attributes.indexOf(attribute) === -1) {
                this.warnings.push(
                    `Required attribute "${attribute}" missing from element <${element}>`
                );
                response[attribute] = undefined;
            } else {
                const value = parseFloat((node as any).$[attribute]);
                if (isNaN(value)) {
                    this.warnings.push(
                        `Expected attribute "${attribute}" in element <${element}> to be a number`
                    );
                    response[attribute] = undefined;
                } else {
                    response[attribute] = value;
                }
            }
        });

        attributes.forEach(attribute => {
            if (
                requiredText.indexOf(attribute) >= 0 ||
                requiredNumber.indexOf(attribute) >= 0
            ) {
                // handled
            } else if (optionalText.indexOf(attribute) >= 0) {
                const value = (node as any).$[attribute].trim();
                response[attribute] = value
                    ? value.replace(/\r\n/g, "\n")
                    : value;
            } else if (optionalNumber.indexOf(attribute) >= 0) {
                const unparsed = (node as any).$[attribute];
                const value = parseFloat(unparsed);
                if (isNaN(value)) {
                    if (unparsed !== "") {
                        this.warnings.push(
                            `Expected attribute "${attribute}" in element <${element}> to be a number`
                        );
                    }
                    response[attribute] = undefined;
                } else {
                    response[attribute] = value;
                }
            } else {
                this.warnings.push(
                    `Extra attribute "${attribute}" present in element <${element}>`
                );
            }
        });

        return response;
    }

    /**
     * Asserts that this node should have text content, but should not have any
     * children or attributes. Adds warning messages if any of this is not the case.
     *
     * @param element Name of the element (for use in warning messages).
     * @param node Node to check.
     *
     * @returns The value of the text content, or an empty string if the text content is missing.
     */
    parseText(element: string, node: Node): string {
        const text = this.requiredText(element, node);

        this.noChildren(element, node);

        this.noAttributes(element, node);

        return text;
    }
}

/**
 * Parses a node that may or may not be present.
 *
 * @param maybe Node that may or may not be present.
 * @param fn Function that parses a node and returns an array.
 *
 * @returns The parsed array, or an empty array if the node is not present.
 */
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
