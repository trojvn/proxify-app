"use server";

import { SERVERS } from "@/helpers/consts";
import axios from "axios";

interface delRotationProps {
  raw: string;
  user: string;
  pswd: string;
}

export default async function delRotation({
  raw: raw,
  user: user,
  pswd: pswd,
}: delRotationProps): Promise<boolean> {
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
  if (!raw) return false;
  const server = raw.split(":")[1];
  if (!server) return false;
  if (!SERVERS.includes(server)) return false;
  return await axios
    .delete("http://" + server + ":9999" + "/rotation/", config)
    .then((response) => {
      return Boolean(response.data["result"]);
    });
}
