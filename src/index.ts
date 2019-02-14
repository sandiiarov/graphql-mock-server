import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import bodyParser from 'body-parser';
import program from 'commander';
import express from 'express';
import fs from 'fs';
// @ts-ignore
import { addMockFunctionsToSchema, removeMockFunctionsFromSchema } from 'lunar-core';

program
  .version('0.1.1', '-v, --version')
  .option('-p, --port <n>')
  .option('-s, --schema <n>')
  .parse(process.argv);

const { port, schema: file } = program;

const toFunction = (str: string) => Function.call(null, `return ${str}`)();

const deserialize = (body: { [name: string]: any }) =>
  Object.keys(body).reduce(
    (packet, key) => ({ ...packet, [key]: toFunction(body[key]) }),
    {}
  );

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
  console.log(`GraphQL Mock Server running ${port}`);
});
