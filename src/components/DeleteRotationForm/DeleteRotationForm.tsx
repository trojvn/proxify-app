import delRotation from "@/services/deleteRotation";
import { responseOptions } from "@/services/getOptions";
import { Button } from "@telegram-apps/telegram-ui";
import { FormInput } from "@telegram-apps/telegram-ui/dist/components/Form/FormInput/FormInput";
import { useEffect, useState } from "react";
import SelectsWrapper from "../SelectsWrapper/SelectsWrapper";
import styles from "./DeleteRotationForm.module.css";

export default function DeleteRotationForm({
  apiOptions,
  createdProxies,
  setCreatedProxies,
}: {
  apiOptions?: responseOptions;
  createdProxies: string[];
  setCreatedProxies: (proxies: string[]) => void;
}) {
  const [delRotate, setDelRotate] = useState<string>("");
  useEffect(() => {
    if (!createdProxies.includes(delRotate)) {
      setDelRotate(createdProxies[0]);
    }
  }, [createdProxies, delRotate]);
  const onClickDelRotate = () => {
    if (!apiOptions) return;
    delRotation({
      raw: delRotate,
      user: apiOptions._id,
      pswd: apiOptions.pswd,
    }).then((response) => {
      if (response) {
        setCreatedProxies(
          createdProxies.filter((proxy) => proxy !== delRotate)
        );
      }
    });
  };
  return (
    <FormInput status="default" className={styles.formInput}>
      <SelectsWrapper
        header="Выберите ротационку"
        values={createdProxies}
        value={delRotate}
        onChange={(e) => setDelRotate(e.target.value)}
      />
      <Button className={styles.button} onClick={onClickDelRotate}>
        Удалить ротационку
      </Button>
    </FormInput>
  );
}
