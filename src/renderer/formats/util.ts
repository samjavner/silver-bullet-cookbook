export type Parser<I, O = I> = (line: I) => O | undefined;

export type Predicate<I> = (line: I) => boolean;

export type Advancer<I, O> = (input: I) => [I, O];

export interface AndThenable<I> {
    /**
     * Advances the input, with an option to handle the parsed output.
     */
    andThen<O>(
        advance: Advancer<I, O>,
        handleOutput?: (output: O) => void
    ): AndThenable<I>;
}

/**
 * Creates a chain for incrementally parsing input, starting with the given input.
 */
export function startWith<I>(start: I): AndThenable<I> {
    function andThen<O>(
        input: I
    ): (
        advance: Advancer<I, O>,
        handleOutput?: (output: O) => void
    ) => AndThenable<I> {
        return (advance, handleOutput) => {
            const [remaining, output] = advance(input);
            handleOutput && handleOutput(output);
            return {
                andThen: andThen(remaining),
            };
        };
    }

    return {
        andThen: andThen(start),
    };
}

/**
 * Returns a function that advances one line if the line can
 * be succesfully parsed using the provided parser.
 */
export function advanceOneIf<I, O>(
    parse: Parser<I, O>
): Advancer<I[], O | undefined> {
    return lines => {
        if (lines.length === 0) {
            return [lines, undefined];
        }

        const result = parse(lines[0]);
        if (result === undefined) {
            return [lines, undefined];
        }
        return [lines.slice(1), result];
    };
}

/**
 * Returns a function that advances lines until the provided predicate becomes true.
 */
export function advanceUntil<I>(predicate: Predicate<I>): Advancer<I[], I[]> {
    return advanceWhile(line => !predicate(line));
}

/**
 * Returns a function that advances lines while the provided predicate is true.
 */
export function advanceWhile<I>(predicate: Predicate<I>): Advancer<I[], I[]> {
    return lines => {
        const value = [];
        while (lines.length > 0 && predicate(lines[0])) {
            value.push(lines[0]);
            lines = lines.slice(1);
        }
        return [lines, value];
    };
}

/**
 * Returns true when the line is empty or contains only whitespace.
 */
export const isEmpty: Predicate<string> = line => line.trim() === "";

/**
 * Returns a metadata parser for the specified attribute. A line that
 * would be successfully parsed follows the format of "Attribute: Value".
 */
export function parseMetadata(
    expectedAttribute: string
): Parser<string, string> {
    const isExpectedAttribute = isAttribute(expectedAttribute);

    return line => {
        const index = line.indexOf(":");

        if (index === -1) {
            return undefined;
        }

        const attribute = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim();

        if (isExpectedAttribute(attribute)) {
            return value;
        }

        return undefined;
    };
}

/**
 * Returns a predicate that returns true when the provided attribute is
 * the expected attribute. The comparison is case insensitive.
 */
export function isAttribute(expectedAttribute: string): Predicate<string> {
    return attribute =>
        attribute.toUpperCase() === expectedAttribute.toUpperCase();
}

/**
 * Removes empty lines and lines containing only whitespace
 * from the beginning and end of the provided array.
 */
export function trimEmptyLines(lines: string[]): string[] {
    let i: number;
    for (i = 0; i < lines.length; i++) {
        if (!isEmpty(lines[i])) {
            break;
        }
    }
    let j: number;
    for (j = lines.length - 1; j >= i; j--) {
        if (!isEmpty(lines[j])) {
            break;
        }
    }
    return lines.slice(i, j + 1);
}

/**
 * Replaces multiple consecutive spaces with a single space.
 */
export function replaceMultipleSpaces(s: string): string {
    return s.replace(/  +/g, " ");
}

/**
 * Returns a predicate that returns true when any of the provided predicates return true.
 */
export function anyOf<I>(...predicates: Array<Predicate<I>>) {
    return (input: I) =>
        predicates.reduce(
            (previous, current) => previous || current(input),
            false
        );
}
