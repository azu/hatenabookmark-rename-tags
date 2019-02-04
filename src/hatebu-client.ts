import { Client } from "hatena-bookmark-api";
import { ParsedResult } from "./parse-mydata";

const consumerKey = process.env.HATENA_CONSUMER_KEY;
const consumerSecret = process.env.HATENA_CONSUMER_SECRET;
const accessToken = process.env.HATENA_ACCESS_TOKEN;
const accessTokenSecret = process.env.HATENA_ACCESS_SECRET;

export class HatebuClient {
    private client: Client;

    constructor() {
        if (consumerKey === undefined) throw new Error("Not found HATENA_CONSUMER_KEY");
        if (consumerSecret === undefined) throw new Error("Not found HATENA_CONSUMER_SECRET");
        if (accessToken === undefined) throw new Error("Not found HATENA_ACCESS_TOKEN");
        if (accessTokenSecret === undefined) throw new Error("Not found HATENA_ACCESS_SECRET");

        this.client = new Client({
            // token credentials
            accessToken,
            accessTokenSecret,
            // client credentials
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
        return this.client.postBookmark({
            url: bookmark.url,
            tags: newTags,
            comment: bookmark.comment
        });
    }
}
