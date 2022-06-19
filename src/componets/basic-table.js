import React, { useState } from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
} from "@tanstack/react-table";
import STUDENTS from "../students.json";
const table = createTable();

// DEFAULT DATA
const defaultData = [...STUDENTS];

// DEFINE COLUMNS
const defaultColumns = [
  table.createDataColumn("subject", { id: "subjects", footer: "Total Marks:" }),
  table.createDataColumn("semester_1", {
    id: "semester_1",
    header: "Semester 1",
    footer: (props) => {
      const initialValue = 0;
      const sumWithInitial = props.instance
        .getCoreRowModel()
        .rows.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.original[props.column.id],
          initialValue
        );
      return sumWithInitial;
    },
  }),
  table.createDataColumn("semester_2", {
    id: "semester_2",
    header: "Semester 2",
    footer: (props) => {
      const initialValue = 0;
      const sumWithInitial = props.instance
        .getCoreRowModel()
        .rows.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.original[props.column.id],
          initialValue
        );
      return sumWithInitial;
    },
  }),
  table.createDataColumn("semester_3", {
    id: "semester_3",
    header: "Semester 3",
    footer: (props) => {
      const initialValue = 0;
      const sumWithInitial = props.instance
        .getCoreRowModel()
        .rows.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.original[props.column.id],
          initialValue
        );
      return sumWithInitial;
    },
  }),
  table.createDataColumn("semester_4", {
    id: "semester_4",
    header: "Semester 4",
    footer: (props) => {
      const initialValue = 0;
      const sumWithInitial = props.instance
        .getCoreRowModel()
        .rows.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.original[props.column.id],
          initialValue
        );
      return sumWithInitial;
    },
  }),
  table.createDataColumn("semester_5", {
    id: "semester_5",
    header: "Semester 5",
    footer: (props) => {
      const initialValue = 0;
      const sumWithInitial = props.instance
        .getCoreRowModel()
        .rows.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.original[props.column.id],
          initialValue
        );
      return sumWithInitial;
    },
  }),
];

const BasicTable = () => {
  const [data] = useState([...defaultData]);
  const [columns] = useState([...defaultColumns]);

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <table border="1">
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {instance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default BasicTable;
