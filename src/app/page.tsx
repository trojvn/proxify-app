"use client";
import CellsWrapper from "@/components/CellsWrapper/CellsWrapper";
import SelectsWrapper from "@/components/SelectsWrapper/SelectsWrapper";
import { SERVERS } from "@/helpers/consts";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Button,
  Cell,
  List,
  Section,
  Textarea,
} from "@telegram-apps/telegram-ui";
import { FormInput } from "@telegram-apps/telegram-ui/dist/components/Form/FormInput/FormInput";
import cn from "classnames";
import { useEffect, useState } from "react";
import createRotation from "./createRotation";
import getOptions, { responseOptions } from "./getOptions";
import styles from "./page.module.css";

export default function Home() {
  const [port, setPort] = useState(0);
  const [algo, setAlgo] = useState("rr");
  const [server, setServer] = useState(SERVERS[0]);
  const [proxies, setProxies] = useState<string>("");
  const [proxiesList, setProxiesList] = useState<string[]>([]);
  const [createdProxies, setCreatedProxies] = useState<string[]>([]);
  const [apiOptions, setApiOptions] = useState<responseOptions>();
  const lp = useLaunchParams();
  const userId = lp.initData?.user?.id;
  useEffect(() => {
    if (userId) {
      getOptions({ userId }).then((options) => {
        if (typeof options === "string") console.log(options);
        else setApiOptions(options);
      });
    }
  }, [userId]);
  const isActivated = apiOptions?.is_activated
    ? "Активирован"
    : "Не активирован";
  const algos = ["rr"];
  let textAreaPlaceholder = "Формат следующий: \n";
  textAreaPlaceholder += "http:ipaddr:port:user:pswd\n";
  textAreaPlaceholder += "socks5:ipaddr:port:user:pswd";
  const onClickCreateRotation = () => {
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
  useEffect(() => {
    setPort(apiOptions?.ports[0] || 0);
  }, [apiOptions]);
  useEffect(() => {
    const proxiesSplitted = proxies.split("\n").filter(Boolean);
    setProxiesList(proxiesSplitted);
  }, [proxies]);
  useEffect(() => {
    setCreatedProxies(apiOptions?.proxies || []);
  }, [apiOptions]);
  return (
    <List className={cn(styles.mainSection)}>
      <Section header={`Ваш статус (UserID: ${userId})`}>
        <Cell>{isActivated}</Cell>
      </Section>
      <Section header="Список созданных ротационок">
        <CellsWrapper values={createdProxies} />
      </Section>
      <Section header="Создание ротационки" className={styles.formSection}>
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
            values={algos}
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
          />
          <Textarea
            header="Вставьте список проксей"
            placeholder={textAreaPlaceholder}
            value={proxies}
            onChange={(e) => setProxies(e.target.value)}
          />
          <Button onClick={onClickCreateRotation} className={styles.button}>
            Создать ротационку
          </Button>
        </FormInput>
      </Section>
    </List>
  );
}
