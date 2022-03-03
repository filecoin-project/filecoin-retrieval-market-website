# filecoin-retrieval-market-website

## Project setup

### Requirements

- Node.js >= 14.17.0
- NPM >= please-use-yarn
- Yarn >= 1.22.0

## Docs and links

- [Figma design](https://www.figma.com/file/Jyqz4uiIduzTDulNAs0A0U/Retrieval-Market-(Dev)?node-id=2%3A2)
- [Website staging](https://filecoin-retrieval-market-website-staging.vercel.app/)

### Install dependencies

```sh
yarn
```

## Running the application

To start the project locally run:

```sh
yarn start
```

## Running storybook

To start the project locally run:

```sh
yarn start:storybook
```

## Bundle the application

To bundle the project run:

```sh
yarn bundle
```

## Running tests

To run the project tests (eslint, stylelint, typescript and jest):

```sh
yarn lint
```

## Releases

Be sure to have configured `GITHUB_TOKEN` in your globals.

```bash
git checkout development
npm version [<new version> | major | minor | patch] -m "Release %s"
git checkout master
git rebase development
git push origin development && git push origin master && git push --tags
```
