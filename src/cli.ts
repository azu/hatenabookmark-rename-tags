import meow from "meow";
import { renameTag } from "./index";

export function run() {
    const cli = meow(`
    Usage
      $ hatenabookmark-rename-tags --user <user> --before <tag> --after <tag>
 
    Options
      --user Hatena User Name
      --before a Tag name that is old name
      --after  a Tag name that is new name
      --reload prune cache data and fetch your bookmarks if this flag is specified
 
    Examples
      $ hatenabookmark-rename-tags --user test --before "検索" --after "Search"
`, {
        flags: {
            user: {
                type: "string"
            },
            before: {
                type: "string"
            },
            after: {
                type: "string"
            },
            reaload: {
                type: "boolean"
            }
        }
        , autoVersion: true,
        autoHelp: true
    });

    const hatenaUserName = cli.flags.user;
    const oldTag = cli.flags.before;
    const newTag = cli.flags.after;
    // TODO: remove tag is not support
    if (!hatenaUserName || !oldTag || !newTag) {
        cli.showHelp();
    }
    const reload = cli.flags.reload !== undefined ? cli.flags.reload : false;
    return renameTag(hatenaUserName, oldTag, newTag, {
        reload
    }).then(() => {
        console.info("All Completed!");
    }).catch((error: Error) => {
        console.error(error);
    });
}

