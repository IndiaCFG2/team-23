// Initializes the `subject` service on path `/subject`
const { Subject } = require('./subject.class');
const createModel = require('../../models/subject.model');
const hooks = require('./subject.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/subject', new Subject(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('subject');

  service.hooks(hooks);
};
