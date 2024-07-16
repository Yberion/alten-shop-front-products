## Package Manager `pnpm`

Enable `pnpm` using Node.js's `corepack`:

```sh
corepack enable
```

```sh
corepack prepare pnpm@latest --activate
```

## Install packages

```sh
pnpm install --no-frozen-lockfile
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Json server

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## serve

Using Angular Dev server:

`pnpm run start`

Using `serve` to use the built application (require to build the app first):

`pnpm run serve`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
