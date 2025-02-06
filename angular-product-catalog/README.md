# ASSESMENT NOTES

In order to mimic a real API call to a server, dummyjson.com was used to get the product data used in the project.This also allowed me mimic the loading state on first visit to the application.

The products folder contains the API base URL and the methods that abstracts the API Client(fetch) from the presentation layer. Using the dependency injection pattern widely used in Angular, fetch could easily be switched for the Http Client provided by Angular.

To achieve modularity in the UI, three components were created to handle:

1. Individual Product display(products-display.components)
2. Modal Display (products-modal.component)
3. A container view that manages flow of data and display of child components (products-catalog.component)

This clear separation of concern also means logic is domicilled closer to where it is used and resources are colocated.

Given more time i would love to have added pagination,lazy loading, and unit tests.

# Running Project
After cloning the repository,  run npm install to install the project modules, then run npm start to start your development server locally.

# AngularProductCatalog

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
