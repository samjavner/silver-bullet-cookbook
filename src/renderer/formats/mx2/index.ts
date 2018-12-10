import * as fs from "fs";
import * as iconv from "iconv-lite";
import { OptionsV2, parseString } from "xml2js";
import { Node } from "../xmlParser";
import * as model from "./model";
import { Parser } from "./parser";

export * from "./model";

// TODO: mz2 format

export async function parseFile(path: fs.PathLike): Promise<model.Mx2> {
    const buffer = fs.readFileSync(path);
    const content = iconv.decode(buffer, "iso-8859-1");
    const node = await parseMx2Xml(content);
    const parser = new Parser();
    const result = parser.parse(node);
    return result;
}

function parseMx2Xml(mx2Xml: string): Promise<Node> {
    return new Promise((resolve, reject) => {
        const options: OptionsV2 = {
            explicitCharkey: true,
            trim: true,
            emptyTag: {},
        };

        parseString(mx2Xml, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.mx2);
            }
        });
    });
}
