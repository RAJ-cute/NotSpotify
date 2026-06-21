import axios from "axios";

// Your Express server runs on port 3000 (server.js).
// withCredentials is required because the backend sets the JWT as a cookie,
// not a bearer token — without this, the browser won't send/receive it.
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default api;
