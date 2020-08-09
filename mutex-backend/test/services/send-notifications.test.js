const assert = require('assert');
const app = require('../../src/app');

describe('\'send-notifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('send-notifications');

    assert.ok(service, 'Registered the service');
  });
});
