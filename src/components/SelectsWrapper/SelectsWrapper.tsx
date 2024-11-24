import { Select, SelectProps } from "@telegram-apps/telegram-ui";

interface SelectPropsLocal extends Omit<SelectProps, "children"> {
  values?: string[] | number[];
  children?: React.ReactNode;
}

export default function SelectsWrapper({
  values: values,
  ...props
}: SelectPropsLocal) {
  const emptyOption = <option>Пусто</option>;
  const noDataOption = <option>Нет данных</option>;
  if (values?.length === 0) return <Select>{emptyOption}</Select>;
  if (!values) return <Select>{noDataOption}</Select>;
  const children = values?.map((value) => <option key={value}>{value}</option>);
  return <Select {...props}>{children}</Select>;
}
