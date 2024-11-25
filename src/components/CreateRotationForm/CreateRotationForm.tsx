import createRotation from "@/app/createRotation";
import { responseOptions } from "@/app/getOptions";
import {
  ALGOS,
  SERVERS,
  TEXTAREA_PLACEHOLDER_IP_EXAMPLE as TEXTAREA_PLACEHOLDER_EXAMPLE,
} from "@/helpers/consts";
import { Button, Textarea } from "@telegram-apps/telegram-ui";
import { FormInput } from "@telegram-apps/telegram-ui/dist/components/Form/FormInput/FormInput";
import { useEffect, useState } from "react";
import SelectsWrapper from "../SelectsWrapper/SelectsWrapper";
import styles from "./CreateRotationForm.module.css";

export default function CreateRotationForm({
  apiOptions,
  createdProxies,
  setCreatedProxies,
}: {
  apiOptions?: responseOptions;
  createdProxies: string[];
  setCreatedProxies: (proxies: string[]) => void;
}) {
  const [port, setPort] = useState(0);
  const [server, setServer] = useState(SERVERS[0]);
  const [algo, setAlgo] = useState("rr");
  const [proxies, setProxies] = useState<string>("");
  const [proxiesList, setProxiesList] = useState<string[]>([]);
  useEffect(() => {
    setPort(apiOptions?.ports[0] || 0);
  }, [apiOptions]);
  useEffect(() => {
    const proxiesSplitted = proxies.split("\n").filter(Boolean);
    setProxiesList(proxiesSplitted);
  }, [proxies]);
  const onClickCreate = () => {
    if (!apiOptions) return;
    if (!proxiesList.length) return;
    createRotation({
      server: server,
      user: apiOptions._id,
      pswd: apiOptions.pswd,
      port: port,
      algo: algo,
      proxies: proxiesList,
    }).then((response) => {
      if (!response) return;
      setCreatedProxies([...createdProxies, response]);
    });
  };
  return (
    <FormInput status="default" className={styles.formInput}>
      <SelectsWrapper
        header="Выберите сервер"
        values={SERVERS}
        value={server}
        onChange={(e) => setServer(e.target.value)}
      />
      <SelectsWrapper
        header="Выберите порт"
        values={apiOptions?.ports}
        value={port}
        onChange={(e) => setPort(parseInt(e.target.value))}
      />
      <SelectsWrapper
        header="Выберите алгоритм"
        values={ALGOS}
        value={algo}
        onChange={(e) => setAlgo(e.target.value)}
      />
      <Textarea
        header="Вставьте список проксей"
        placeholder={TEXTAREA_PLACEHOLDER_EXAMPLE}
        value={proxies}
        onChange={(e) => setProxies(e.target.value)}
      />
      <Button onClick={onClickCreate} className={styles.button}>
        Создать ротационку
      </Button>
    </FormInput>
  );
}
