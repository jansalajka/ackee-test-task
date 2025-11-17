# Ackee Next.js template

Shared Ackee starter based on `create-next-app`.

## Quick start

```sh
corepack enable
yarn
# download/copy env file for apps/web
cp apps/web/.env.local.example apps/web/.env.local
yarn dev
```

Open <http://localhost:3000> and edit files inside `apps/web`.

## Common scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Run the Next.js dev server (Turbopack). |
| `yarn vitest` | Run all unit tests across workspaces via Turbo. |
| `yarn lint`, `yarn types-check`, `yarn format` | Repo-wide quality checks. |
| `yarn cy:open`, `yarn cy:run` | Cypress UI / headless (expects localhost:3000). |
| `yarn storybook:dev`, `yarn generate-icons` | Storybook + icon generation. |

## Environment

- Client env vars live in `apps/web/.env.local` and are validated with `@t3-oss/env`.
- Official secrets are in Passwd (see company docs for the link).

## Release

Releases are bumped from `apps/web` via `yarn release <semver>` which runs `scripts/release.mjs`, updates the changelog, tags, and pushes.

## References

- [Next.js docs](https://nextjs.org/docs)
- [Ackee template](https://github.com/AckeeCZ/next-app-template)

