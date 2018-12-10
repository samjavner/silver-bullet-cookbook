import * as fs from "fs";
import * as iconv from "iconv-lite";
import { OptionsV2, parseString } from "xml2js";
import { Node } from "../xmlParser";
import * as model from "./model";
import { Parser } from "./parser";

export * from "./model";

// TODO: fdxz format

export async function parseFile(path: fs.PathLike): Promise<model.Fdx> {
    const buffer = fs.readFileSync(path);
    const content = iconv.decode(buffer, "utf-8");
    const node = await parseFdxXml(content);
    const parser = new Parser();
    const result = parser.parse(node);
    return result;
}

function parseFdxXml(fdxXml: string): Promise<Node> {
    return new Promise((resolve, reject) => {
        const options: OptionsV2 = {
            explicitCharkey: true,
            trim: true,
            emptyTag: {},
        };

        parseString(fdxXml, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.fdx);
            }
        });
    });
}
