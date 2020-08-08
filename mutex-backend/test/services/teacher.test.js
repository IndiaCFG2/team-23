const assert = require('assert');
const app = require('../../src/app');

describe('\'teacher\' service', () => {
  it('registered the service', () => {
    const service = app.service('teacher');

    assert.ok(service, 'Registered the service');
  });
});
