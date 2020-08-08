// Initializes the `student-assessment` service on path `/student-assessment`
const { StudentAssessment } = require('./student-assessment.class');
const createModel = require('../../models/student-assessment.model');
const hooks = require('./student-assessment.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-assessment', new StudentAssessment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-assessment');

  service.hooks(hooks);
};
