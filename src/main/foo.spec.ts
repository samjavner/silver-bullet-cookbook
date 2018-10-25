import { sum } from "./foo";

describe("sum", () => {
    it("basic", () => {
        expect(sum()).toBe(0);
    });

    it("basic again", () => {
        expect(sum(1, 2)).toBe(3);
    });
});
