export const getSubjectsPeriods = (token) => {
  return fetch(`${API}/student-class`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).catch((err) => console.log(err));
};
