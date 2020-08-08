const assert = require('assert');
const app = require('../../src/app');

describe('\'period\' service', () => {
  it('registered the service', () => {
    const service = app.service('period');

    assert.ok(service, 'Registered the service');
  });
});
