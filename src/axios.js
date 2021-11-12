import axios from "axios";

// THE API (cloud function)URL
const instance = axios.create({
  baseURL: "http://localhost:5001/clone-38c90/us-central1/api",
  //baseURL: "https://us-central1-clone-38c90.cloudfunctions.net/api",
});

export default instance;

//https://us-central1-clone-38c90.cloudfunctions.net/api
