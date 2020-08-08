import { API } from '../config';

export const createAssessment = ( token, assessment) => {
    return fetch(`${API}/assessment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`
        },
        body: JSON.stringify(assessment)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createContent = ( token, content) => {
    return fetch(`${API}/content`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`
        },
        body: JSON.stringify(content)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createClass = ( token, class_data) => {
    return fetch(`${API}/content`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`
        },
        body: JSON.stringify(class_data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
// export const getTeacherByUserID = ( token, userId) => {
//     console.log(token, userId)
//      return fetch(`${API}/teacher?user_id=${userId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `${token}`
//         }
        
//     })
//         .then(async response => {
//             // console.log(response.json())
//             return await response.json();
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

export const getTeacherByUserID = (token, userId) => {
    return fetch(`${API}/teacher?user_id=${userId}`, {
         method: "GET",
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
             Authorization: `${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };

