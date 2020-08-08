const assert = require('assert');
const app = require('../../src/app');

describe('\'student\' service', () => {
  it('registered the service', () => {
    const service = app.service('student');

    assert.ok(service, 'Registered the service');
  });
});
