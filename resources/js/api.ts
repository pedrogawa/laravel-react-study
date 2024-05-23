import axios from "axios";

// Set the Axios base URL to your backend's address
const api = axios.create({
    baseURL: "http://localhost:8080", // or whatever the correct URL and port are
});

// Set the CSRF token from Laravel's meta tag
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");
if (csrfToken) {
    api.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
}

export default api;
