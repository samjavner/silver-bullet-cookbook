import {
    advanceOneIf,
    Advancer,
    advanceUntil,
    advanceWhile,
    anyOf,
    isAttribute,
    isEmpty,
    parseMetadata,
    Parser,
    Predicate,
    replaceMultipleSpaces,
    startWith,
    trimEmptyLines,
} from "./util";

describe("startWith", () => {
    it("should create a chain for incrementally parsing input", () => {
        const chain = startWith([1, 2, 3]);
        const take1: Advancer<number[], number> = (numbers: number[]) => [
            numbers.slice(1),
            numbers[0],
        ];
        let actual!: number[];
        chain.andThen(take1).andThen(numbers => {
            actual = numbers;
            return take1(numbers);
        });
        expect(actual).toEqual([2, 3]);
    });

    it("should give the parsed output to the provided callback", () => {
        const chain = startWith([1, 2, 3]);
        const take1: Advancer<number[], number> = (numbers: number[]) => [
            numbers.slice(1),
            numbers[0],
        ];
        let actual!: number;
        chain.andThen(take1, num => (actual = num));
        expect(actual).toBe(1);
    });
});

describe("advanceOneIf", () => {
    it("should not try to parse when there are no more lines available", () => {
        const parse: Parser<number> = line => {
            throw new Error();
        };
        const actual = advanceOneIf(parse)([]);
        expect(actual).toEqual([[], undefined]);
    });

    it("should not advance when parsing is not successful", () => {
        const parse: Parser<number> = line => undefined;
        const actual = advanceOneIf(parse)([2, 3, 4]);
        expect(actual).toEqual([[2, 3, 4], undefined]);
    });

    it("should advance and return the parsed value when parsing is successful", () => {
        const parse: Parser<number> = line => line * 100;
        const actual = advanceOneIf(parse)([2, 3, 4]);
        expect(actual).toEqual([[3, 4], 200]);
    });
});

describe("advanceUntil", () => {
    it("should not check the predicate when there are no more lines available", () => {
        const predicate: Predicate<number> = line => {
            throw new Error();
        };
        const actual = advanceUntil(predicate)([]);
        expect(actual).toEqual([[], []]);
    });

    it("should advance until the predicate becomes true", () => {
        const predicate: Predicate<number> = line => line > 5;
        const actual = advanceUntil(predicate)([1, 5, 2, 4, 10, 9, 5]);
        expect(actual).toEqual([[10, 9, 5], [1, 5, 2, 4]]);
    });
});

describe("advanceWhile", () => {
    it("should not check the predicate when there are no more lines available", () => {
        const predicate: Predicate<number> = line => {
            throw new Error();
        };
        const actual = advanceWhile(predicate)([]);
        expect(actual).toEqual([[], []]);
    });

    it("should advance while the predicate is true", () => {
        const predicate: Predicate<number> = line => line < 10;
        const actual = advanceWhile(predicate)([1, 5, 2, 4, 10, 9, 5]);
        expect(actual).toEqual([[10, 9, 5], [1, 5, 2, 4]]);
    });
});

describe("isEmpty", () => {
    it("should be true when an empty string", () => {
        const actual = isEmpty("");
        expect(actual).toBe(true);
    });

    it("should be true when string has only spaces", () => {
        const actual = isEmpty("     ");
        expect(actual).toBe(true);
    });

    it("should be true when string only contains whitespace characters", () => {
        const actual = isEmpty("\t\v\n\r\f ");
        expect(actual).toBe(true);
    });

    it("should be false when text", () => {
        const actual = isEmpty("A");
        expect(actual).toBe(false);
    });

    it("should be false when text surrounded by spaces", () => {
        const actual = isEmpty("       A      ");
        expect(actual).toBe(false);
    });

    it("should be false when text surrounded by whitespace characters", () => {
        const actual = isEmpty("\t\vAn\r\f ");
        expect(actual).toBe(false);
    });
});

describe("parseMetadata", () => {
    const parseTitle = parseMetadata("Title");

    it("should be the trimmed value when there is a value", () => {
        const actual = parseTitle(" Title: 21 Club Rice Pudding ");
        expect(actual).toBe("21 Club Rice Pudding");
    });

    it("should be the value when there is no need for trimming", () => {
        const actual = parseTitle("Title:21 Club Rice Pudding");
        expect(actual).toBe("21 Club Rice Pudding");
    });

    it("should be an empty string when there is no value", () => {
        const actual = parseTitle("  Title:");
        expect(actual).toBe("");
    });

    it("should be an empty string when the value is whitespace", () => {
        const actual = parseTitle("  Title:      ");
        expect(actual).toBe("");
    });

    it("should not be parsed succesfully when an empty string", () => {
        const actual = parseTitle("");
        expect(actual).toBeUndefined();
    });

    it("should not be parsed succesfully when it is the wrong attribute", () => {
        const actual = parseTitle(" Yield: 12 muffins");
        expect(actual).toBeUndefined();
    });

    it("should not be parsed succesfully when just a colon", () => {
        const actual = parseTitle(":");
        expect(actual).toBeUndefined();
    });

    it("should not be parsed succesfully when a colon surrounded by spaces", () => {
        const actual = parseTitle("    :    ");
        expect(actual).toBeUndefined();
    });

    it("should not be parsed succesfully when text without a colon", () => {
        const actual = parseTitle("   Chill before serving.   ");
        expect(actual).toBeUndefined();
    });
});

describe("isAttribute", () => {
    // for Title, Categories, Yield, and Servings,
    // we'll accept variations on capitalization but nothing else

    const isTitle = isAttribute("Title");

    it("should be true when it is an exact match", () => {
        const actual = isTitle("Title");
        expect(actual).toBe(true);
    });

    it("should be true when it is in all caps", () => {
        const actual = isTitle("TITLE");
        expect(actual).toBe(true);
    });

    it("should be true when it is in all lower", () => {
        const actual = isTitle("title");
        expect(actual).toBe(true);
    });

    it("should be false when empty string", () => {
        const actual = isTitle("");
        expect(actual).toBe(false);
    });

    it("should be false when it is pluralized", () => {
        const actual = isTitle("Titles");
        expect(actual).toBe(false);
    });

    it("should be false when it is something else", () => {
        const actual = isTitle("Categories");
        expect(actual).toBe(false);
    });
});

describe("trimEmptyLines", () => {
    it("should be an empty array when given an empty array", () => {
        const actual = trimEmptyLines([]);
        expect(actual).toEqual([]);
    });

    it("should be an empty array when given an array with an empty string", () => {
        const actual = trimEmptyLines([""]);
        expect(actual).toEqual([]);
    });

    it("should be an empty array when given an array with a whitespace string", () => {
        const actual = trimEmptyLines(["   "]);
        expect(actual).toEqual([]);
    });

    it("should be an empty array when given multiple empty lines", () => {
        const actual = trimEmptyLines(["   ", "", "     ", ""]);
        expect(actual).toEqual([]);
    });

    it("should return the array when given an array with one non-empty item", () => {
        const actual = trimEmptyLines(["abc"]);
        expect(actual).toEqual(["abc"]);
    });

    it("should return the array when given an array with two non-empty items", () => {
        const actual = trimEmptyLines(["abc", "xyz"]);
        expect(actual).toEqual(["abc", "xyz"]);
    });

    it("should return the array when given an array with two non-empty items with an empty line in between", () => {
        const actual = trimEmptyLines(["abc", "", "xyz"]);
        expect(actual).toEqual(["abc", "", "xyz"]);
    });

    it("should trim the start", () => {
        const actual = trimEmptyLines(["", "  ", "abc", "def", "", "xyz"]);
        expect(actual).toEqual(["abc", "def", "", "xyz"]);
    });

    it("should trim the end", () => {
        const actual = trimEmptyLines(["abc", "def", "", "xyz", "", "  "]);
        expect(actual).toEqual(["abc", "def", "", "xyz"]);
    });

    it("should trim the start and the end", () => {
        const actual = trimEmptyLines([
            "",
            "  ",
            "abc",
            "def",
            "",
            "xyz",
            "",
            "  ",
        ]);
        expect(actual).toEqual(["abc", "def", "", "xyz"]);
    });
});

describe("replaceMultipleSpaces", () => {
    it("should return an empty string when given an empty string", () => {
        const actual = replaceMultipleSpaces("");
        expect(actual).toBe("");
    });

    it("should return a single space when given a single space", () => {
        const actual = replaceMultipleSpaces(" ");
        expect(actual).toBe(" ");
    });

    it("should return a single space when given two spaces", () => {
        const actual = replaceMultipleSpaces("  ");
        expect(actual).toBe(" ");
    });

    it("should return a single space when given three spaces", () => {
        const actual = replaceMultipleSpaces("   ");
        expect(actual).toBe(" ");
    });

    it("should return a single space when given many spaces", () => {
        const actual = replaceMultipleSpaces("                      ");
        expect(actual).toBe(" ");
    });

    it("should return the string with multiple spaces condensed to single spaces", () => {
        const actual = replaceMultipleSpaces(
            "    This text  has   multiple   spaces in       it.  "
        );
        expect(actual).toBe(" This text has multiple spaces in it. ");
    });
});

describe("anyOf", () => {
    it("should return false when no predicates are provided", () => {
        const actual = anyOf()(10);
        expect(actual).toBe(false);
    });

    it("should return false if all predicates return false", () => {
        const actual = anyOf(x => x === 5, x => x > 15)(10);
        expect(actual).toBe(false);
    });

    it("should return true if any predicate returns true", () => {
        const actual = anyOf(x => x === 5, x => x > 15)(20);
        expect(actual).toBe(true);
    });
});
