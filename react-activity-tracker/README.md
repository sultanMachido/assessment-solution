# Assessment Notes

In order to mimic a websocket server, the mock-websocket-server.ts file in the root dirctory was used to mock a websocket server sending real time activity updates to a client. The mock-socket package creates a mock server while user data and activity data are two different arrays that are picked at random to different combinations of user and activity. This message is then sent to the client at intervals of two seconds.

On the Client side, a custom react hook is used to handle connection to the mock server and dispatching the message to a store. In this hook i implemented a manual retry logic for cases when the client fails to connect to the Websocket server. An improved implementation will be an automatic retry after a few seconds delay and termination after a certain number of retries.

A few UI components were created to handle the activity display, search input and retry button.

So as to limit the number of activities displayed to a user, a limit of 15 activities are shown at a time. I implemented a load more button that allows the user see older activites.

#Running Application
After cloning the project to your computer, navigate to the folder and run the command npm install to install packages. After that, you can run the command npm run dev to start the application on your  computer  

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
