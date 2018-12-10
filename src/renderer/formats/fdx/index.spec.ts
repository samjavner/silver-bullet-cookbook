import { parseFile } from ".";
import * as comprehensive from "./testData/comprehensive";
import * as minimal from "./testData/minimal";

const base = "src/renderer/formats/fdx/testData";

describe("parseFile", () => {
    it("should parse a minimal fdx file correctly", async () => {
        const actual = await parseFile(`${base}/minimal.fdx`);
        expect(actual).toEqual(minimal.expected);
    });

    it("should parse a comprehensive fdx file correctly", async () => {
        const actual = await parseFile(`${base}/comprehensive.fdx`);
        expect(actual).toEqual(comprehensive.expected);
    });
});
