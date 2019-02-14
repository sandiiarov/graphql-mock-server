How to write mocks
https://www.apollographql.com/docs/graphql-tools/mocking.html

## Basic example

```js
const serializedMocks = Object.entries(mocks).reduce(
  (packet, [key, value]) => ({ ...packet, [key]: value.toString() }),
  {}
);

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
  })
};

const data = serializedMocks(mock);

fetch('http://localhost:4000/mock', {
  method: 'POST',
  body: JSON.stringify(data),
});

fetch('http://localhost:4000/reset', {
  method: 'POST'
});
```
