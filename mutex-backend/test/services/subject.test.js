const assert = require('assert');
const app = require('../../src/app');

describe('\'subject\' service', () => {
  it('registered the service', () => {
    const service = app.service('subject');

    assert.ok(service, 'Registered the service');
  });
});
