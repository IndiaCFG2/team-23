const { authenticate } = require("@feathersjs/authentication").hooks;

async function getAUser(id, context) {
  const u = await context.app.service("users").get(id);
  return u;
}

// function sendMsg(content_name, resource_url, phonenumber) {
const accountSid = "ACbe384e6ff5c49b07fe9293233ef51ec7";
const authToken = "d1dd224c2f6b15f715d5394706459af0";
const client = require("twilio");
const twilioClient = client(accountSid, authToken);

const sendWhatsappMessage = async (message) => {
  try {
    const response = await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      body: message,
      to: `whatsapp:+917799999861`,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
  // .then(message => console.log(message.sid))
  // .catch(error => console.log(error));
};

const sendSMS = async (message) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: "+15615373424",
      to: "+917799999861",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// const content =
//   "Hello, New content added [" +
//   resource_url +
//   "], please check-out at: " +
//   resource_url;

// }

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
    create: [
      async (context) => {
        const user_id = context.result.user_id;
        // await context.app.service("users").get("5f2e64bc11aa46fbe86659c7");
        console.log(">>>>>>>>>>>>.");

        const period_id = context.data.period_id;
        const student_classes = await context.app
          .service("student-class")
          .find();

        console.log("<<<");
        console.log(typeof student_classes);
        console.log(student_classes);
        console.log("<<<");
        var user_ids = [];

        console.log(">>>> user_ids <<<<<");
        student_classes.data.forEach((item) => {
          console.log(item.period_id, period_id, item.period_id == period_id);
          if (item.period_id == period_id) {
            user_ids.push(item.user_id);
            console.log("true");
          }
        });
        console.log(user_ids);

        console.log(">>>> user_ids <<<<<");

        var users_numbers = [];

        user_ids.forEach((item) => {
          console.log(typeof item);
          const u = getAUser(item, context);
          console.log(u);
          users_numbers.push(u.phonenumber);
          console.log(users_numbers, "###");
        });

        users_numbers.forEach((item) => {
          console.log(context.result.topic, context.result.resource_url, item);
          sendMsg(context.result.topic, context.result.resource_url, item);
          const content =
            "Hello, New content added [" +
            context.result.topic +
            "], please check-out at: " +
            context.result.resource_url;
          sendWhatsappMessage(content);
          sendSMS(content);
        });

        console.log(context.result);
        console.log(context.data);
        return context;
      },
    ],
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
