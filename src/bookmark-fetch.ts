import * as path from "path";
import * as fs from "fs";
import { parseMyData, ParsedResults } from "./parse-mydata";

require("cross-fetch/polyfill");
const OUTPUT_PATH = path.join(__dirname, "../.cache/search.data");
export const fetchHatenaBookmarks = async (userName: string): Promise<ParsedResults> => {
    const searchDataURL = `http://b.hatena.ne.jp/${encodeURIComponent(userName)}/search.data`;
    if (fs.existsSync(OUTPUT_PATH)) {
        const searchData = fs.readFileSync(OUTPUT_PATH, "utf-8");
        const parsed = parseMyData(searchData);
        return parsed as ParsedResults;
    }
    console.info(`Start Fetch: ${searchDataURL}`);
    const response = await fetch(searchDataURL);
    if (!response.ok) {
        throw new Error(`Can not fetch: ${searchDataURL}`);
    }
    const text = await response.text();
    console.info(`Complete fetch: ${searchDataURL}`);
    fs.writeFileSync(OUTPUT_PATH, text, "utf-8");
    return parseMyData(text);
};
