// Initializes the `send-notifications` service on path `/send-notifications`
const { SendNotifications } = require('./send-notifications.class');
const hooks = require('./send-notifications.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/send-notifications', new SendNotifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('send-notifications');

  service.hooks(hooks);
};
