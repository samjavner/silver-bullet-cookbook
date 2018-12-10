import { parseFile } from ".";
import { expected001 } from "./testData/expected/expected001";
import { expected002 } from "./testData/expected/expected002";

const base = "src/renderer/formats/schema.org/testData/input";

describe("schema.org parseFile", () => {
    it("should parse input001", () => {
        const actual = parseFile(`${base}/input001.json`);
        expect(actual).toEqual(expected001);
    });

    it("should parse input002", async () => {
        const actual = parseFile(`${base}/input002.json`);
        expect(actual).toEqual(expected002);
    });
});
