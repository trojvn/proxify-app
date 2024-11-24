"use server";
import { DEFAULT_SERVER } from "@/helpers/consts";
import axios from "axios";

interface getOptionsProps {
  userId: number;
}

export interface responseOptions {
  _id: string;
  user: string;
  pswd: string;
  ports: number[];
  is_activated: boolean;
  user_id: number;
  proxies: string[];
}

interface getOptionsResponse {
  result: boolean;
  options: responseOptions | string;
}

export default async function getOptions({
  userId,
}: getOptionsProps): Promise<responseOptions | string> {
  const DB_USER = process.env.DB_USER;
  const DB_PSWD = process.env.DB_PSWD;
  const config = {
    auth: {
      username: DB_USER,
      password: DB_PSWD,
    },
    params: {
      user_id: Number(userId),
      user: "",
    },
  };
  return await axios
    .get<getOptionsResponse>(
      "http://" + DEFAULT_SERVER + ":9999" + "/auth/",
      config
    )
    .then((response) => response.data.options)
    .catch((error) => {
      console.log(error);
      return "";
    });
}
