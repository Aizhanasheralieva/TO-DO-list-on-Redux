import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "https://aizhana-js26-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;
