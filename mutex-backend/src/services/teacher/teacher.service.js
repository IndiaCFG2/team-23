// Initializes the `teacher` service on path `/teacher`
const { Teacher } = require('./teacher.class');
const createModel = require('../../models/teacher.model');
const hooks = require('./teacher.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/teacher', new Teacher(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('teacher');

  service.hooks(hooks);
};
