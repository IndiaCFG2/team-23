import { API } from "../config";

export const getContents = sortBy => {
    return fetch(`${API}/contents`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
       }