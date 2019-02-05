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

export interface RenameTagOptions {
    reload: boolean;
}

/**
 * Rename Tag
 * @param hatenaUserName
 * @param oldTag
 * @param newTag
 * @param options
 */
export function renameTag(hatenaUserName: string, oldTag: string, newTag: string, options: RenameTagOptions) {
    return fetchHatenaBookmarks(hatenaUserName, options).then(results => {
        const client = new HatebuClient();
        const promises = results
            .filter(result => {
                return result.tags.includes(oldTag);
            })
            .map(result => {
                return () => {
                    return client
                        .updateTag(result, oldTag, newTag)
                        .catch((...args) => {
                            console.error("Fail to update", result);
                            console.error(...args);
                        })
                        .then(() => {
                            return waitMs(500);
                        });
                };
            });
        return pAll(promises, { concurrency: 1 });
    });
}
