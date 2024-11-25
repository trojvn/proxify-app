"use client";
import { TEXTAREA_PLACEHOLDER_EXAMPLE } from "@/helpers/consts";
import { responseOptions } from "@/services/getOptions";
import proxyChecker, { checkResult } from "@/services/proxyChecker";
import { Button, Textarea } from "@telegram-apps/telegram-ui";
import { FormInput } from "@telegram-apps/telegram-ui/dist/components/Form/FormInput/FormInput";
import { useEffect, useState } from "react";
import CheckerGrid from "../CheckerGrid/CheckerGrid";
import styles from "./CheckerForm.module.css";

export default function CheckerForm({
  apiOptions,
}: {
  apiOptions?: responseOptions;
}) {
  const [started, setStarted] = useState(false);
  const [proxies, setProxies] = useState<string[]>([]);
  const [goodProxies, setGoodProxies] = useState<string[]>([]);
  const [errorProxies, setErrorProxies] = useState<string[]>([]);
  const [checkedProxies, setCheckedProxies] = useState<checkResult[]>([]);
  const onClickChecker = () => {
    if (!apiOptions) return;
    if (!proxies.filter(Boolean).length) return;
    if (started) return alert("Проверка уже идет");
    setStarted(true);
    setGoodProxies([]);
    setErrorProxies([]);
    setCheckedProxies([]);
    proxies.filter(Boolean).map((proxy) => {
      proxyChecker({
        proxy: proxy,
        user: apiOptions._id,
        pswd: apiOptions.pswd,
      }).then((response) => {
        // setProxies(proxies.filter((item) => item !== proxy));
        if (proxy === proxies[proxies.filter(Boolean).length - 1]) {
          setStarted(false);
        }
        if (!response) {
          return setErrorProxies((prev) => [...prev, proxy]);
        }
        setCheckedProxies((prev) => [...prev, { ...response, proxy }]);
        if (response.result) {
          setGoodProxies((prev) => [...prev, proxy]);
        } else {
          setErrorProxies((prev) => [...prev, proxy]);
        }
      });
    });
  };

  useEffect(() => {
    console.log(checkedProxies);
  }, [checkedProxies]);

  return (
    <>
      <FormInput status="default" className={styles.formInput}>
        <Textarea
          header="Вставьте список прокси"
          placeholder={TEXTAREA_PLACEHOLDER_EXAMPLE}
          value={proxies.join("\n")}
          onChange={(e) => setProxies(e.target.value.split("\n"))}
        />

        <Textarea
          header="Рабочие прокси"
          status="focused"
          value={goodProxies.join("\n")}
        />
        <Textarea
          header="Нерабочие прокси"
          status="error"
          value={errorProxies.join("\n")}
        />
        <Button
          className={styles.button}
          onClick={onClickChecker}
          disabled={started}
        >
          Начать проверку
        </Button>
      </FormInput>
      <CheckerGrid rowData={checkedProxies} />
    </>
  );
}
