const assert = require('assert');
const app = require('../../src/app');

describe('\'school\' service', () => {
  it('registered the service', () => {
    const service = app.service('school');

    assert.ok(service, 'Registered the service');
  });
});
