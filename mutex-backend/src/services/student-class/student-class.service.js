// Initializes the `student-class` service on path `/student-class`
const { StudentClass } = require('./student-class.class');
const createModel = require('../../models/student-class.model');
const hooks = require('./student-class.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-class', new StudentClass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-class');

  service.hooks(hooks);
};
