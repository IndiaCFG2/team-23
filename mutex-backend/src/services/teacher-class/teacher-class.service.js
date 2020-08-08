// Initializes the `teacherClass` service on path `/teacher-class`
const { TeacherClass } = require('./teacher-class.class');
const createModel = require('../../models/teacher-class.model');
const hooks = require('./teacher-class.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/teacher-class', new TeacherClass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('teacher-class');

  service.hooks(hooks);
};
