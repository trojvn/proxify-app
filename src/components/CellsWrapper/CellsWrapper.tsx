"use client";
import { Cell, Tooltip } from "@telegram-apps/telegram-ui";
import { createRef, useEffect, useRef, useState } from "react";

interface CellProps {
  values?: string[] | number[];
}

export default function CellsWrapper({ values: values }: CellProps) {
  const [currentRef, setCurrentRef] = useState(-1);
  const myRefs = useRef([]);
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (currentRef !== -1) {
      timerId = setTimeout(() => {
        setCurrentRef(-1);
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [currentRef]);
  if (!values) return <Cell>Нет данных</Cell>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    const selectedText: string = e.target.parentElement.innerText;
    navigator.clipboard.writeText(selectedText.trim());
  };
  myRefs.current = values?.map(
    (_element, i) => myRefs.current[i] ?? createRef()
  );

  const children = values?.map((value, index) => {
    return (
      <Cell
        key={index}
        onClick={(e) => {
          setCurrentRef(index);
          onClick(e);
        }}
        ref={myRefs.current[index]}
      >
        {value}
      </Cell>
    );
  });
  const ifNeedTooltip = () => {
    if (values?.length === 0) return <Cell>Пусто</Cell>;
    if (currentRef !== -1) {
      return (
        <>
          {children}
          <Tooltip mode="dark" targetRef={myRefs.current[currentRef]}>
            Скопирован в буфер обмена!
          </Tooltip>
        </>
      );
    }
  };
  return <>{ifNeedTooltip() || children}</>;
}
