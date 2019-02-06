# hatenabookmark-rename-tags

A CLI that replace all hatena bookmark tags.

## How to use?

You need to hatena OAuth access token.
This repository includes helper app for getting access token.

### 1. Get OAuth Token

Run electron app for getting your hatena oauth token.

```
git clone https://github.com/azu/hatenabookmark-rename-tags
cd hatenabookmark-rename-tags
yarn install
yarn run get-token
```

**Steps**: get your OAuth tokens

1. Login and OAuth hatena account that want to rename tags
2. Copy the results that are access token and access token secret

### 2. Run rename script

Install `hatenabookmark-rename-tags` to globally and pass access token as environment variables.

```
npm install -g hatenabookmark-rename-tags
HATENA_ACCESS_TOKEN="___" HATENA_ACCESS_SECRET="____" hatenabookmark-rename-tags [option]
```

**CLI Usage**:

    Usage
      $ hatenabookmark-rename-tags --user <user> --before <tag> --after <tag>
 
    Options
      --user Hatena User Name
      --before a Tag name that is old name
      --after  a Tag name that is new name
      --reload prune cache data and fetch your bookmarks if this flag is specified
 
    Examples
      $ HATENA_ACCESS_TOKEN="___" HATENA_ACCESS_SECRET="____" hatenabookmark-rename-tags --user test --before "js" --after "JavaScript"
      # ignore cache data
      $ HATENA_ACCESS_TOKEN="___" HATENA_ACCESS_SECRET="____" hatenabookmark-rename-tags --reload --user test --before "before" --after "after"

`hatenabookmark-rename-tags` use cache data by default. The cache data is stored into `.cache/search.data`.

If your want to reload your cached bookmarks, use `--reload` flags.

**Limitation**: This script support only *public* bookmarks.

It depended on [search.data](https://github.com/azu/hatebu-mydata-parser/blob/master/doc/search.data-format.md).
Because, Hatena bookmark API does not provide listing API of bookmarks.

## Changelog

See [Releases page](https://github.com/azu/hatenabookmark-rename-tags/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/hatenabookmark-rename-tags/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
