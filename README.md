How to write mocks
https://www.apollographql.com/docs/graphql-tools/mocking.html

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
