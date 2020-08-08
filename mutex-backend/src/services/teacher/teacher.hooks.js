const { authenticate } = require("@feathersjs/authentication").hooks;

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
<<<<<<< HEAD
    create: [
      async (context) => {
        const user_id = context.result.user_id;
        // const user = await context.app.service("users").get(user_id);
        // user.role = 1;
        // user.save();
        const p = await context.app
          .service("users")
          .patch(user_id, { role: 1 });
        return context;
      },
    ],
=======
    create: [async (context) => {
      const user_id = context.result.user_id;
      await context.app.service("users").patch(user_id, { role: 1 });
      return context;
    },],
>>>>>>> d451d8ec2a8d1eb601ae0672afe2bc14331fc0a5
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
