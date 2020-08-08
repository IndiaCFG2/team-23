const assert = require('assert');
const app = require('../../src/app');

describe('\'student-class\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-class');

    assert.ok(service, 'Registered the service');
  });
});
