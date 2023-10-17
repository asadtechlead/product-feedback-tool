const BASE_URL = 'http://127.0.0.1:8000/api/v1';
const HEADERS = { 'Accept': 'application/json'}

export async function getUser() {
    return makeAPICall('GET', 'user', null, true);
}
export async function login(credentials) {
    return makeAPICall('POST', 'login', credentials);
}

export async function signUp(userData) {
    return makeAPICall('POST', 'signup', userData);
}

export async function userLogout() {
    return makeAPICall('POST', 'logout', null, true);
}

export async function submitFeedback(feedback) {
    return makeAPICall('POST', 'feedback', feedback, true);
}
export async function getFeedbackList(page) {
    return makeAPICall('GET', `feedback?page=${page}`, null, true);
}
export async function getSingleFeedback(id) {
    return makeAPICall('GET', `feedback/${id}`, null, true);
}
export async function addComment(comment) {
    return makeAPICall('POST', 'comment', comment, true);
}
export async function addFeedbackVote(id) {
    return makeAPICall('PUT', `feedback/${id}/vote`, null, true);
}
export async function deleteFeedback(id) {
        return makeAPICall('DELETE',`feedback/${id}`, null, true);
}

export async function getUserList(page) {
    return makeAPICall('GET', `users?page=${page}`, null, true);
}
export async function deleteUser(id) {
    return makeAPICall('DELETE',`user/${id}`, null, true);
}
export async function commentSetting(state) {
    return makeAPICall('POST',`comment-setting`, {state}, true);
}

async function makeAPICall(method, uri, body, authenticated = false) {
    let data = {method, headers: {...HEADERS}};
    if(authenticated)
    {
        data.headers = {...data.headers, 'Authorization': `Bearer ${localStorage.getItem('token')}`};
    }
    if(body)
    {
        data.headers = {...data.headers, 'Content-Type': 'application/json'};
        data.body = JSON.stringify(body);
    }

    return await fetch(`${BASE_URL}/${uri}`, data)
        .then(response => response.json() )
        .then(handleErrors)
        .catch(error => error );
}
function handleErrors(response) {
    if (!response.ok) {
        if(response.status)
        {
            return response;
        }
        throw Error(response.message);
    }
    return response;
}
