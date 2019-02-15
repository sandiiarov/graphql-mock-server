## Example
https://github.com/sandiiarov/cypress-graphql-mock-server-example

## Install

```sh
yarn global add graphql-mock-server
```

or

```sh
yarn add --dev graphql-mock-server
```

## Usage

```sh
graphql-mock-server ./schema.graphql -p 4000
```

```sh
gms ./schema.graphql -p 4000
```

## Basic example

```js
import { serializedMocks } from 'graphql-mock-server';

const mock = {
  Query: () => ({
    users: () => [
      {
        id: '1',
        name: 'Foo',
      },
      {
        id: '2',
        name: 'Baz',
      },
    ],
  }),
};

const data = serializedMocks(mock);

// Set mock
fetch('http://localhost:4000/mock', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Reset mock
fetch('http://localhost:4000/reset', {
  method: 'POST',
});
```

How to write mocks
https://www.apollographql.com/docs/graphql-tools/mocking.html

### Accessing arguments in mock resolvers

Since the mock functions on fields are actually just GraphQL resolvers, you can use arguments and context in them as well:

```js
{
  Query: () => ({
    // the number of friends in the list now depends on numPages
    paginatedFriends: (root, { numPages }) => new MockList(numPages * PAGE_SIZE),
  }),
}
```

## Cypress
```sh
yarn add --dev cypress-graphql-mock-server
```
add to `support\index.js`
```js
import 'cypress-graphql-mock-server';
```
If you are using TypeScript

add to `tsconfig.json`
```js
{
  "compilerOptions": {
    ...
    "types": ["cypress-graphql-mock-server"]
  }
}
```
### Generate types
You can also generate TS types using GraphQL schema.
For type generating you should use https://github.com/dotansimha/graphql-code-generator
with plugins:
 - graphql-codegen-typescript-common
 - graphql-codegen-typescript-server
 - graphql-codegen-typescript-mocks
 
