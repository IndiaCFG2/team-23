import { API } from '../config';

export const createTeacher = (userId, token, teacher) => {
    return fetch(`${API}/teacher`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`
        },
        body: JSON.stringify(teacher)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


