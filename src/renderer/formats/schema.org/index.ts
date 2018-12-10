import * as fs from "fs";
import * as iconv from "iconv-lite";
import { expand } from "../jsonldParser";
import { Recipe } from "./model";
import { Parser } from "./parser";

export * from "./model";

export function parseFile(path: fs.PathLike): Recipe[] {
    const buffer = fs.readFileSync(path);
    const content = iconv.decode(buffer, "utf-8");
    const data = JSON.parse(content);
    const expanded = expand(data);
    const parser = new Parser();
    const result = expanded.map(x => parser.parseRecipe(x));
    return result;
}
