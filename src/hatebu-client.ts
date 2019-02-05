import { Client } from "hatena-bookmark-api";
import { ParsedResult } from "./parse-mydata";

const consumerKey = process.env.HATENA_CONSUMER_KEY || "KP3igGP/IxuINQ==";
const consumerSecret = process.env.HATENA_CONSUMER_SECRET || "3DGtEHE/YEEZdmWGngc5zqAPV5w=";
const accessToken = process.env.HATENA_ACCESS_TOKEN;
const accessTokenSecret = process.env.HATENA_ACCESS_SECRET;

export class HatebuClient {
    private client: Client;

    constructor() {
        if (consumerKey === undefined) throw new Error("Not found process.env.HATENA_CONSUMER_KEY");
        if (consumerSecret === undefined) throw new Error("Not found process.env.HATENA_CONSUMER_SECRET");
        if (accessToken === undefined) throw new Error("Not found process.env.HATENA_ACCESS_TOKEN");
        if (accessTokenSecret === undefined) throw new Error("Not found process.env.HATENA_ACCESS_SECRET");

        this.client = new Client({
            accessToken,
            accessTokenSecret,
            consumerKey,
            consumerSecret
        });
    }

    updateTag(bookmark: ParsedResult, oldTag: string, newTag: string): Promise<any> {
        const newTags = bookmark.tags.map(tag => {
            return tag === oldTag ? newTag : tag;
        });
        console.info(`[${newTags.join("][")}]${bookmark.comment}
${bookmark.url}`);
        // Workaround:https://twitter.com/azu_re/status/1092580264692183040
        // Hatena bookamrk does not work `tags{ query correcty
        return this.client.postBookmark({
            url: bookmark.url,
            comment: `[${newTags.join("][")}]${bookmark.comment}`
        });
    }
}
