// Initializes the `grade` service on path `/grade`
const { Grade } = require('./grade.class');
const createModel = require('../../models/grade.model');
const hooks = require('./grade.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/grade', new Grade(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('grade');

  service.hooks(hooks);
};
