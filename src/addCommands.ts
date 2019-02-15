import { serialize } from '.';

Cypress.Commands.add('setGQLMock', <T>(mocks: T) => {
  const body = serialize(mocks);
  cy.request('POST', `${Cypress.env('GRAPHL_MOCK_SERVER')}/mock`, body);
});

Cypress.Commands.add('resetGQLMock', () => {
  cy.request('POST', `${Cypress.env('GRAPHL_MOCK_SERVER')}/reset`);
});
