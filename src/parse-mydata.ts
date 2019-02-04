const parse = require("hatebu-mydata-parser").parse;
export type ParsedResult = {
    title: string,
    comment: string,
    url: string,
    tags: string[];
};
export type ParsedResults = ParsedResult[];

export function parseMyData(text: string): ParsedResults {
    const results: {
        title: string,
        comment: string,
        url: string,
        date: Date;
    }[] = parse(text);
    return results.map(result => {
        let commentParsed = parseComment(result.comment);
        return {
            title: result.title,
            comment: commentParsed.comment,
            tags: commentParsed.tags,
            url: result.url
        };
    });
}

export function parseComment(text: string) {
    const tagPattern = /(?<=\[)(.+?)(?=])/g;
    const tags: string[] = [];
    let match: null | RegExpExecArray = null;
    let lastIndex = 0;
    while (match = tagPattern.exec(text)) {
        tags.push(match[0]);
        lastIndex = match.index + match[0].length + 1;
    }
    const comment = text.slice(lastIndex);
    return {
        tags,
        comment
    };
}
