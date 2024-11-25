"use client";
import { checkResult } from "@/services/proxyChecker";
import { RowClassParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from "ag-grid-react";
import "./CheckerGrid.css";

export default function CheckerGrid({ rowData }: { rowData: checkResult[] }) {
  const colDefs = [
    { field: "result" as keyof checkResult, flex: 1 },
    { field: "proxy" as keyof checkResult, flex: 1 },
    { field: "error" as keyof checkResult, flex: 1 },
    { field: "query" as keyof checkResult, flex: 1 },
    { field: "city" as keyof checkResult, flex: 1 },
    { field: "country" as keyof checkResult, flex: 1 },
    { field: "region" as keyof checkResult, flex: 1 },
    { field: "timezone" as keyof checkResult, flex: 1 },
  ];
  const rowClassRules = {
    "rag-red": (params: RowClassParams) => params.data.result === false,
    "rag-green": (params: RowClassParams) => params.data.result === true,
  };
  return (
    <div
      className="ag-theme-material" // applying the Data Grid theme
      style={{ height: 400 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        rowClassRules={rowClassRules}
        overlayNoRowsTemplate="Пусто"
      />
    </div>
  );
}
