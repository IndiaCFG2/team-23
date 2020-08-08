const assert = require('assert');
const app = require('../../src/app');

describe('\'student-assessment\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-assessment');

    assert.ok(service, 'Registered the service');
  });
});
