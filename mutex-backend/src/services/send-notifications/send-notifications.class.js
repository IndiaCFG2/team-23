/* eslint-disable no-unused-vars */
const {sendSMS, sendWhatsappMessage} = require('../../../twilio')
exports.SendNotifications = class SendNotifications {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    const {channel, message} = data
    // if(numbers.includes(';')){
    let numbers = data.number.split(';');
    // }
    const resp = await Promise.all(numbers.map(async number => {
      if(channel === 'sms'){
        sendSMS(number, message)
      }
      if(channel === 'whatsapp'){
        sendWhatsappMessage(number, message)
      }
    })) 
    return resp

    
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
