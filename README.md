# Bootstrapped app with create-next-app by Ackee

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

We are using our skeleton written in Typescript and based on create-next-app => https://github.com/AckeeCZ/next-app-template

## Getting Started

0. Activate package manager & Install dependencies
   This project uses `yarn@4.x`:

    ```sh
    # adds required binaries based on packageManager field in package.json
    corepack enable
    ```

    then install dependencies by running:

    ```sh
    yarn
    ```

1. [Download `env.local` from Passwd](https://ackee.passwd.team/secrets/3vA3iG87ziu3RAchXXUM) and rename it to `.env.local`.

    > Be aware that env. variables are validated with predefined zod schema in `src/env/index.mjs`.
    > If you need to add/remove a new env. var., don't forget the update the schema too.

2. Set `sheetId` in `template/tooling/lokse/config/index.js` & fetch fresh translations:

    ```sh
    # Go to the app
    cd apps/web

    # Fetch fresh translations
    yarn localize
    ```

3. Launch development server:

    ```sh
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

    You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### Unit tests

```bash
yarn workspace web test          # watch mode
yarn workspace web test:ci       # CI / single run
```

### Linting & type checks

```bash
yarn lint
yarn types-check
```

### Cypress end-to-end tests

Interactive runner:

```bash
yarn workspace web cypress:open
```

Headless run (also executed by the `pre-commit` hook):

```bash
yarn workspace web cypress:run
```

> **Note:** Cypress tests expect the development server to be running locally on port 3000.

## Envs

- For local development, you need to provide `.env.local` with those vars placed in the `apps/web`.

## Storybook

We use Storybook for design system of UI components. You can build it and run with:

```bash
yarn storybook:dev
```

```bash
yarn generate-icons
```

It will generate icons into the React/Typescript components ready to use.

## Release

The versioning follows:

-   `major` version - for production releases
-   `minor` version - for stage releases
-   `patch` version - hotfixes / minor fixes

The version bumping is happening in `apps/web`:

1. Go to the app

    ```sh
    cd apps/web
    ```

2. Make sure you're in `dev` branch. Bump the new version as:

    ```sh
    yarn release 0.19.0
    ```

    - This calls `scripts/release.mjs`.
    - It bumps version in the `package.json`.
    - Updates changelog (adds commits from last git tag).
    - Waits for closing the changelog file.
    - Creates release a commit and git tag.
    - Calls git push (including tags so other developers can correctly generate the changelog too).

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.Z
