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

Cypress.Commands.add('setGQLMock', <T>(mocks: T) => {
  const serializedMocks = Object.entries(mocks).reduce(
    (packet, [key, value]) => ({ ...packet, [key]: value.toString() }),
    {}
  );

  cy.request('POST', `${Cypress.env('MOCK_HOST')}/store/mock`, serializedMocks);
});

Cypress.Commands.add('resetGQLMock', () => {
  cy.request('POST', `${Cypress.env('MOCK_HOST')}/store/reset`);
});
