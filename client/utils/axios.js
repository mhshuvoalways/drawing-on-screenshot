import axios from "axios";
import backendUrl from "./baseUrl";

const instance = axios.create({
  baseURL: backendUrl,
});

export default instance;