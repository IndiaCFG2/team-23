const assert = require('assert');
const app = require('../../src/app');

describe('\'teacherClass\' service', () => {
  it('registered the service', () => {
    const service = app.service('teacher-class');

    assert.ok(service, 'Registered the service');
  });
});
