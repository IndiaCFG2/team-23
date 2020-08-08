// Initializes the `assessment` service on path `/assessment`
const { Assessment } = require('./assessment.class');
const createModel = require('../../models/assessment.model');
const hooks = require('./assessment.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/assessment', new Assessment(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('assessment');

  service.hooks(hooks);
};
