import { API } from "../config";
import { TWILIO_API } from "../../public/twilio";

export const getContents = (token) => {
  return fetch(`${API}/content`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).catch((err) => console.log(err));
};

export const getUsers = (token) => {
  console.log("its coming here");
  console.log(token);
  return fetch(`${API}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSubjects = (token) => {
  return fetch(`${API}/subject`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).catch((err) => console.log(err));
};

export const getSchools = (token) => {
  return fetch(`${API}/school`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).catch((err) => console.log(err));
};

export const sendWhatsAppMsg = (assessment_name, reource_) => {
  const accountSid = "ACbe384e6ff5c49b07fe9293233ef51ec7";
  const authToken = TWILIO_API;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+15017122661",
      to: "+917799999861",
    })
    .then((message) => console.log(message.sid));
};
