const accountSid = 'ACf78d3714bc2d7f4789d3a84b59d52353';
const authToken = '2baf12d6b0472b4b50956d0495db9326';
const client = require('twilio');
const twilioClient = client(accountSid, authToken)


const sendWhatsappMessage = async (receiverNumber = '+918096849684', message) => {
	try{
	const response = await twilioClient.messages.create({
		from: 'whatsapp:+14155238886',
		body: message,
		to: `whatsapp:${receiverNumber}`
	});
	console.log(response)
	return response;
	}
	catch(error) {
	console.log(error)
	return error;
	}
	// .then(message => console.log(message.sid))
	// .catch(error => console.log(error));
}

const sendSMS = async (receiverNumber= '+918096849684',message ) => {
	try {
	const response = await twilioClient.messages.create({
	     body: message,
	     from: '+12564628141',
	     to: receiverNumber
   	})
   	console.log(response)
  	return response
	}
	catch(error){
	console.log(error)
	return error
	}
}

//sendWhatsappMessage("+918096849684", "Hello");
// sendSMS("+918096849684", "Hello")
module.exports = {
    sendWhatsappMessage : sendWhatsappMessage,
    sendSMS : sendSMS
}