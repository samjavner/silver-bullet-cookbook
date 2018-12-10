import { parseFile } from ".";
import * as comprehensive from "./testData/comprehensive";
import * as livingcookbook from "./testData/livingcookbook";

const base = "src/renderer/formats/mx2/testData";

describe("parseFile", () => {
    it("should parse a comprehensive mx2 file correctly", async () => {
        const actual = await parseFile(`${base}/comprehensive.mx2`);
        expect(actual).toEqual(comprehensive.expected);
    });

    it("should parse an mx2 file exported from Living Cookbook correctly", async () => {
        const actual = await parseFile(`${base}/livingcookbook.mx2`);
        expect(actual).toEqual(livingcookbook.expected);
    });
});
