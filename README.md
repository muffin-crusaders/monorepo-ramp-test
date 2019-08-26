# RAMP Monorepo Test

A sample monorepo (without any RAMP code for the moment) to gauge feasibility of switching RAMP to this approach.

There are some benefits with switching to a monorepo:

-   no multiple PRs when adding features (you know)
-   no linking madness (it's all taken care of by 🦄)
-   hot-reload of the dependency chain (work simultaneously on RAMP code and plugins without having to manually rebuild)
-   code sharing and reuse (any common dependencies can be shared between monorepo packages)
-   one step closer to a James' Monofile™ (TBD)

Some further advantages:

-   refactoring required to consolidate RAMP repos (core, geoapi, plugins, geo-search) will generate lots of work and opportunities to hone one's tinkering and debugging skills

## Getting Started

From your shell, install Rush like this:

```
$ npm install -g @microsoft/rush
```

Clone the repo and use Rush to install dependencies:

```
$ rush update
```

Serve the project:

```
$ rush serve
```

Open the page (you can click on emoji):

```
http://localhost:3001
```

In your editor, make changes to `packages\ramp-one\src\index.ts` or `packages\ramp-two\src\index.ts` files and observe the page reloaded on save.

## Setup

The monorepo setup and all dependencies are handled by [Rush](https://rushjs.io), and certain `npm` commands [should not be used directly](https://rushjs.io/pages/developer/new_developer/#1-avoid-certain-commands-in-a-rush-repo) (`run`, `install`, `link`, `dedupe`).

### Packages

There are two packages in this monorepo sample: `ramp-one` and `ramp-two`.

#### ramp-two

This is a simple library package that exposes a couple of useless functions. The build step simply transpiles Typescript into JavaScript.

#### ramp-one

This is a simple HTML page with some Typescript compiled and served by [Parcel](https://parceljs.org). `ramp-one` imports `ramp-two` and renders its output to the page.

### Build/Serve

Both packages use their own build tasks, and can be built independently of each other. Simply execute `npm run build` inside the package folder.

[`rush build`](https://rushjs.io/pages/commands/rush_build/) is a default Rush command and executes `npm run build` commands for all packages in the monorepo in the order of their dependency on each other.

`rush serve` is a custom command (it's described in `common/config/rush/command-line.json`) which will execute `npm run serve` in all monorepo packages in parallel.

## Notes

**Why not [Lerna](https://github.com/lerna/lerna)?**

Lerna doesn't play nicely with local-only packages used in the monorepo. It wants packages to be published to NPM or a private NPM registry or read-only Github repos (using something like [splitsh](https://github.com/splitsh/lite) to break your monorepo into separate read-only repos). When packages are specified with `file:` descriptors, [Lerna doesn't link them properly](https://github.com/lerna/lerna/issues/1679). It's madness.

**Why [Rush](https://rushjs.io)?**

First, the only other choices are [OAO](https://github.com/guigrpa/oao) and Yarn Workspaces, which both use Yarn. I also (very objectively) didn't like them. 🤪

Second, Rush is created by a Microsoft team behind [web-build-tools](https://github.com/microsoft/web-build-tools), and Lerna guys [accused them in stealing their code](https://github.com/microsoft/web-build-tools/issues/673). So, it means Rush must be very good then.

Third, local-only package linking works perfectly - no need to publish anything to NPM or keep a read-only Git repos.
