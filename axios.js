import axios from "axios";

let backendURL = process.env.BACKEND_URL;

const HTTP = axios.create({
  baseURL: backendURL
});
export default HTTP;
