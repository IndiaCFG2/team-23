// Initializes the `student` service on path `/student`
const { Student } = require('./student.class');
const createModel = require('../../models/student.model');
const hooks = require('./student.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student', new Student(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student');

  service.hooks(hooks);
};
