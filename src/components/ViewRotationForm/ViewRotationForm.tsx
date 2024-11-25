"use client";
import { responseOptions } from "@/services/getOptions";
import viewRotation from "@/services/viewRotation";
import { Textarea } from "@telegram-apps/telegram-ui";
import { FormInput } from "@telegram-apps/telegram-ui/dist/components/Form/FormInput/FormInput";
import { useEffect, useState } from "react";
import SelectsWrapper from "../SelectsWrapper/SelectsWrapper";
import styles from "./ViewRotationForm.module.css";

export default function ViewRotationForm({
  apiOptions,
  createdProxies,
}: {
  apiOptions?: responseOptions;
  createdProxies: string[];
}) {
  const [selectedRotation, setSelectedRotation] = useState<string>("");
  const [proxies, setProxies] = useState<string[]>([]);
  useEffect(() => {
    if (!createdProxies.length) {
      setProxies([]);
      return;
    }
    if (selectedRotation === "") setSelectedRotation(createdProxies[0]);
    else {
      if (!createdProxies.includes(selectedRotation)) {
        setSelectedRotation(createdProxies[0]);
      }
    }
  }, [createdProxies, selectedRotation]);
  useEffect(() => {
    if (!apiOptions) return;
    viewRotation({
      raw: selectedRotation,
      user: apiOptions._id,
      pswd: apiOptions.pswd,
    })
      .then((response) => {
        setProxies(response);
      })
      .catch(() => {
        setProxies([]);
      });
  }, [selectedRotation, createdProxies, apiOptions]);
  return (
    <FormInput status="default" className={styles.formInput}>
      <SelectsWrapper
        values={createdProxies}
        onChange={(e) => setSelectedRotation(e.target.value)}
      />
      {!proxies.length ? (
        <></>
      ) : (
        <Textarea value={proxies.join("\n")} readOnly={true} />
      )}
    </FormInput>
  );
}
