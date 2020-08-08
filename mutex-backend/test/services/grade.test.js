const assert = require('assert');
const app = require('../../src/app');

describe('\'grade\' service', () => {
  it('registered the service', () => {
    const service = app.service('grade');

    assert.ok(service, 'Registered the service');
  });
});
