"use client";
import CellsWrapper from "@/components/CellsWrapper/CellsWrapper";
import CreateRotationForm from "@/components/CreateRotationForm/CreateRotationForm";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Cell, List, Section } from "@telegram-apps/telegram-ui";
import { FormInput } from "@telegram-apps/telegram-ui/dist/components/Form/FormInput/FormInput";
import cn from "classnames";
import { useEffect, useState } from "react";
import getOptions, { responseOptions } from "./getOptions";
import styles from "./page.module.css";

export default function Home() {
  const [apiOptions, setApiOptions] = useState<responseOptions>();
  const [createdProxies, setCreatedProxies] = useState<string[]>([]);
  const userId = useLaunchParams().initData?.user?.id;
  useEffect(() => {
    if (userId) {
      getOptions({ userId }).then((options) => {
        if (typeof options === "string") console.log(options);
        else setApiOptions(options);
      });
    }
  }, [userId]);
  useEffect(() => {
    setCreatedProxies(apiOptions?.proxies || []);
  }, [apiOptions]);
  return (
    <List className={cn(styles.mainSection)}>
      <Section header={`Ваш статус (UserID: ${userId})`}>
        <Cell>
          {apiOptions?.is_activated ? "Активирован" : "Не активирован"}
        </Cell>
      </Section>
      <Section header="Список созданных ротационок">
        <CellsWrapper values={createdProxies} />
      </Section>
      <Section header="Создание ротационки"></Section>
      <CreateRotationForm
        apiOptions={apiOptions}
        createdProxies={createdProxies}
        setCreatedProxies={setCreatedProxies}
      />
      <Section header="Удалить ротационку">
        <FormInput></FormInput>
      </Section>
    </List>
  );
}
