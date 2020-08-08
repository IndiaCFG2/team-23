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