import { API } from "../config";
import { isAuthenticated } from "../auth";
import { getSchools } from "../core/apiCore";

// const { user } = isAuthenticated();
// const { schools } = getSchools();
// const {grades}

export const createStudent = (user_id, token, school_id, grade_id) => {
  student.user_id = user_id;
  student.school_id = school_id;
  student.grade_id = grade_id;

  return fetch(`${API}/student`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(student),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
