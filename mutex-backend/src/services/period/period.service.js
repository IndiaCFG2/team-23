// Initializes the `period` service on path `/period`
const { Period } = require('./period.class');
const createModel = require('../../models/period.model');
const hooks = require('./period.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/period', new Period(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('period');

  service.hooks(hooks);
};
