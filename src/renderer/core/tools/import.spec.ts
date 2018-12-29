import { init, update } from "./import";

describe("import", () => {
    describe("update", () => {
        it("should handle importRequest", () => {
            const actual = update.importRequest(init);
            expect(actual.isImporting).toEqual(true);
        });

        it("should handle importSuccess", () => {
            const actual = update.importSuccess({ ...init, isImporting: true });
            expect(actual.isImporting).toEqual(false);
        });
    });

    describe("commands", () => {
        // TODO
    });
});
