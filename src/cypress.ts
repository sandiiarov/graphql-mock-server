declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * graphql-mock-server helpers for Cypress
     *
     * `setGQLMock*` APIs set mock
     *
     * @see https://github.com/sandiiarov/graphql-mock-server
     *
     */
    setGQLMock<T>(mocks: T): Cypress.Chainable<Response>;
    /**
     * graphql-mock-server helpers for Cypress
     *
     * `resetGQLMock*` APIs reset previous mock
     *
     * @see https://github.com/sandiiarov/graphql-mock-server
     *
     */
    resetGQLMock(): Cypress.Chainable<Response>;
  }
}
