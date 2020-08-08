import { API } from "../config";
import { isAuthenticated } from "../auth";

const { user } = isAuthenticated();

export const createStudent = (userId, token, student) => {
  student.user_id = user._id;

  return fetch(`${API}/student`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(teacher),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
