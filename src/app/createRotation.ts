"use server";

import axios from "axios";

interface createRotationProps {
  server: string;
  user: string;
  pswd: string;
  port: number;
  algo: string;
  proxies: string[];
}

export default async function createRotation({
  server: server,
  user: user,
  pswd: pswd,
  port: port,
  algo: algo,
  proxies: proxies,
}: createRotationProps): Promise<string> {
  const config = {
    withCredentials: true,
    auth: {
      username: user,
      password: pswd,
    },
    params: {
      port: port,
      algo: algo,
    },
  };
  const data = proxies;
  return await axios
    .post("http://" + server + ":9999" + "/rotation/", data, config)
    .then((response) => {
      return response.data["raw"];
    })
    .catch((error) => {
      console.log(error.response.data);
      return "";
    });
}
