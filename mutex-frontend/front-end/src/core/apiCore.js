import { API } from "../config";

export const getContents = (token) => {
    return fetch(`${API}/content`, {
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

export const getUsers = (token) => {
    console.log("its coming here")
    console.log(token)
    return fetch(`${API}/users`, {
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
    
    export const getUsersStrict = (token) => {
        console.log("its coming here")
        console.log(token)
        return fetch(`${API}/users/?role=3`, {
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

export const getSubjects = (token) => {
    return fetch(`${API}/subject`, {
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

export const getSchools = (token) => {
    return fetch(`${API}/school`, {
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

export const getGrades = (token) => {
    return fetch(`${API}/grade`, {
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
export const getPeriods = (token) => {
    return fetch(`${API}/period`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`
                   
            }
        })
            .then(response => {
                const resp = response.json()
                return resp;
            })
            .catch(err => console.log(err));
        };

// const filterDataByTeacherId = (arrayVal, key,    teacher_id) => {
//     return arrayVal[key] === val
// }
export const getPeriodsByTeacher = (token,teacher_id) => {
    return fetch(`${API}/period`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `${token}`
                   
            }
        })
            .then(response => {
                const resp = response.json();
                const data = resp.data.filter((value) => {
                    return value.teacher_id === teacher_id
                })
                resp.data = data
                return resp;

            })
            .catch(err => console.log(err));
        };