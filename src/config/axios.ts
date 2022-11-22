import axios from "axios";

export default axios.create({
  // baseURL: "https://fintech-backend-staging.easyaspataal.com/api",
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://fintech-cloudsql-7k5qcren2q-el.a.run.app/api",
  headers: {
    authorization:
      localStorage!.getItem("token") !== null
        ? `Bearer ${localStorage.getItem("token")}`!
        : false,
  },
});
