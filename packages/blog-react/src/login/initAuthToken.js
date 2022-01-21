import setAuthToken from './setAuthToken'

export default function initAuthToken() {
    setAuthToken(localStorage.getItem("token"));
    return localStorage.getItem("token");
}