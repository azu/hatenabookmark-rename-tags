require("dotenv").config();
const pAll = require("p-all");
import { fetchHatenaBookmarks } from "./bookmark-fetch";

import { HatebuClient } from "./hatebu-client";

const waitMs = (ms: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

// FIXME
export function run(hatenaUserName: string, oldTag: string, newTag: string) {
    return fetchHatenaBookmarks(hatenaUserName).then(results => {
        const client = new HatebuClient();
        const promises = results
            .filter(result => {
                return result.tags.includes(oldTag);
            })
            .map(result => {
                return () => {
                    return client
                        .updateTag(result, oldTag, newTag)
                        .catch(error => {
                            console.error("Fail to update", result);
                            console.error(error);
                        })
                        .then(() => {
                            return waitMs(1000);
                        });
                };
            });
        return pAll(promises, { concurrency: 1 }).catch((error: Error) => {
            console.error(error);
        });
    });
}
