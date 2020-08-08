import { API } from "../config";
import { isAuthenticated } from "../auth";
import { getSchools } from "../core/apiCore";

const { user } = isAuthenticated();
const { school } = getSchools();

export const createStudent = (userId, token, student) => {
  student.user_id = user._id;
  student.school_id = school._id;
  student.grant_id = 1;

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
