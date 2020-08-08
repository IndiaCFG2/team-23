// Initializes the `content` service on path `/content`
const { Content } = require('./content.class');
const createModel = require('../../models/content.model');
const hooks = require('./content.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/content', new Content(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('content');

  service.hooks(hooks);
};
