/// <reference types="node" />

declare module 'lunar-core' {
  import { GraphQLSchema } from 'graphql';

  interface AddMockFunctionsToSchemaOptions {
    schema: GraphQLSchema;
    mocks: {};
  }

  interface RemoveMockFunctionsFromSchemaOptions {
    schema: GraphQLSchema;
  }

  export function addMockFunctionsToSchema({
    schema,
    mocks,
  }: AddMockFunctionsToSchemaOptions): void;

  export function removeMockFunctionsFromSchema({
    schema,
  }: RemoveMockFunctionsFromSchemaOptions): void;
}
