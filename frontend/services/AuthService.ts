import { apiUrl } from "@/constants";
import axios from "axios";

export const logIn = (email: string, password: string) => {
  let data = "";
  if (email.includes("@")) {
    data = JSON.stringify({
      email: email,
      password: password,
      username: "",
    });
  } else {
    data = JSON.stringify({
      email: "",
      password: password,
      username: email,
    });
  }

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: apiUrl + "/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios.request(config);
};
