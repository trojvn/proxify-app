"use server";

import { SERVERS } from "@/helpers/consts";
import axios from "axios";

interface viewRotationProps {
  raw: string;
  user: string;
  pswd: string;
}

export default async function viewRotation({
  raw: raw,
  user: user,
  pswd: pswd,
}: viewRotationProps): Promise<string[]> {
  const config = {
    withCredentials: true,
    auth: {
      username: user,
      password: pswd,
    },
    params: {
      raw: raw,
    },
  };
  if (!raw) return [];
  const server = raw.split(":")[1];
  if (!server) return [];
  if (!SERVERS.includes(server)) return [];
  return await axios
    .get("http://" + server + ":9999" + "/rotation/", config)
    .then((response) => {
      return response.data["proxies"];
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}
