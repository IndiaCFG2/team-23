// Initializes the `school` service on path `/school`
const { School } = require('./school.class');
const createModel = require('../../models/school.model');
const hooks = require('./school.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/school', new School(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('school');

  service.hooks(hooks);
};
