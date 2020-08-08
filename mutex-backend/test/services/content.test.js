const assert = require('assert');
const app = require('../../src/app');

describe('\'content\' service', () => {
  it('registered the service', () => {
    const service = app.service('content');

    assert.ok(service, 'Registered the service');
  });
});
