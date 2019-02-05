import * as path from "path";
import * as fs from "fs";
import { parseMyData, ParsedResults } from "./parse-mydata";

require("cross-fetch/polyfill");
const CACHE_DIR = path.join(__dirname, "../.cache");
const OUTPUT_PATH = path.join(CACHE_DIR, "search.data");

export interface FetchHatenaBookmarksOptions {
    reload: boolean;
}

export const fetchHatenaBookmarks = async (userName: string, options: FetchHatenaBookmarksOptions): Promise<ParsedResults> => {
    const searchDataURL = `http://b.hatena.ne.jp/${encodeURIComponent(userName)}/search.data`;
    if (!options.reload && fs.existsSync(OUTPUT_PATH)) {
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
    if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR);
    }
    fs.writeFileSync(OUTPUT_PATH, text, "utf-8");
    console.info(`Store cache data to ${OUTPUT_PATH}`);
    return parseMyData(text);
};
