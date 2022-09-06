# TodoApp with NodeJs



## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install
```
or
```sh
yarn
```

Please rename .env.example to .env and add your configuration information.
```
HOST = 127.0.0.1
PORT = 1234
MONGO_DB_CONNECT_LINK = 
```

And run the server with;

```
npm run start:dev
```
or
```
yarn start:dev
```
## Dependencies

- [bcrypt](https://ghub.io/bcrypt): A bcrypt library for NodeJS.
- [cors](https://ghub.io/cors): Node.js CORS middleware
- [dotenv](https://ghub.io/dotenv): Loads environment variables from .env file
- [express](https://ghub.io/express): Fast, unopinionated, minimalist web framework
- [express-validator](https://ghub.io/express-validator): Express middleware for the validator module.
- [jsonwebtoken](https://ghub.io/jsonwebtoken): JSON Web Token implementation (symmetric and asymmetric)
- [mongoose](https://ghub.io/mongoose): Mongoose MongoDB ODM

## Dev Dependencies

- [eslint](https://ghub.io/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-standard](https://ghub.io/eslint-config-standard): JavaScript Standard Style - ESLint Shareable Config
- [eslint-plugin-import](https://ghub.io/eslint-plugin-import): Import with sanity.
- [eslint-plugin-n](https://ghub.io/eslint-plugin-n): Additional ESLint&#39;s rules for Node.js
- [eslint-plugin-promise](https://ghub.io/eslint-plugin-promise): Enforce best practices for JavaScript promises
- [nodemon](https://ghub.io/nodemon): Simple monitor script for use during development of a Node.js app.

## License

ISC
