"use server";

import { DEFAULT_SERVER } from "@/helpers/consts";
import axios from "axios";

interface proxyCheckerProps {
  proxy: string;
  user: string;
  pswd: string;
}

export interface checkResult {
  result: boolean;
  proxy?: string;
  error?: string;
  query?: string;
  city?: string;
  country?: string;
  region?: string;
  timezone?: string;
}

export default async function proxyChecker({
  proxy: proxy,
  user: user,
  pswd: pswd,
}: proxyCheckerProps): Promise<checkResult | undefined> {
  const config = {
    withCredentials: true,
    auth: {
      username: user,
      password: pswd,
    },
    params: {
      proxy: proxy,
    },
  };
  if (!proxy) return;
  return await axios
    .get("http://" + DEFAULT_SERVER + ":9999" + "/checker/", config)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}
