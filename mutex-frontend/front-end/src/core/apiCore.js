import { API } from "../config";

export const getContents = (sortBy) => {
  return fetch(`${API}/content`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsers = () => {
  return fetch(`${API}/users`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSubjects = () => {
  return fetch(`${API}/subject`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSchools = () => {
  return fetch(`${API}/school`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
