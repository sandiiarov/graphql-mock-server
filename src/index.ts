import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import bodyParser from 'body-parser';
import program from 'commander';
import express from 'express';
import fs from 'fs';
import {
  addMockFunctionsToSchema,
  removeMockFunctionsFromSchema,
} from 'lunar-core';

const toFunction = (str: string): (() => void) =>
  Function.call(null, `return ${str}`)();

export const serialize = <T>(body: T) =>
  Object.entries(body).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value.toString() }),
    {}
  );

export const deserialize = <T>(body: T) =>
  Object.entries(body).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: toFunction(value) }),
    {}
  );

export default async function() {
  program
    .version('0.0.2', '-v, --version')
    .usage('[options] <file ...>')
    .option('-p, --port <port>')
    .parse(process.argv);

  const {
    port,
    args: [file],
  } = program;

  const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync(file, 'utf8'),
  });

  const currentMocks = [{}];
  const app = express();
  const server = new ApolloServer({ schema });

  app.use(bodyParser.json());
  app.get('/', (req, res) => res.json({ port, schema }));
  app.post('/mock', (req, res) => {
    currentMocks.push(deserialize(req.body));
    addMockFunctionsToSchema({ schema, mocks: currentMocks });
    res.sendStatus(200);
  });
  app.post('/reset', (req, res) => {
    currentMocks.splice(1, currentMocks.length);
    removeMockFunctionsFromSchema({ schema });
    addMockFunctionsToSchema({ schema, mocks: {} });
    res.sendStatus(200);
  });

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`🐬  GraphQL Mock Server running at http://localhost:${port}`);
  });
}

Cypress.Commands.add('setGQLMock', <T>(mocks: T) => {
  const body = serialize(mocks);
  cy.request('POST', `${Cypress.env('GRAPHL_MOCK_SERVER')}/mock`, body);
});

Cypress.Commands.add('resetGQLMock', () => {
  cy.request('POST', `${Cypress.env('GRAPHL_MOCK_SERVER')}/reset`);
});
