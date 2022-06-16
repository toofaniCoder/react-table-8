import React, { useState } from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
} from "@tanstack/react-table";
import STUDENTS from "../students.json";

const table = createTable();
const defaultData = [...STUDENTS];
const defaultColumns = [
  table.createDataColumn("name", {
    id: "name",
    header: "Full Name",
    cell: (props) => props.getValue().toUpperCase(),
  }),
  table.createDataColumn("email", {
    id: "email",
    header: "E-mail Address",
  }),
  table.createDataColumn("phone", {
    id: "phone",
    header: "Phone Number",
  }),
  table.createDataColumn("standard", {
    id: "standard",
    header: "Class",
  }),
  table.createDataColumn("section", {
    id: "section",
    header: "Section",
  }),
  table.createDataColumn("age", {
    id: "age",
    header: "Age",
  }),
  table.createDataColumn("date_of_birth", {
    id: "date_of_birth",
    header: "Date of Birth",
    cell: (props) => new Date(props.getValue()).toDateString(),
  }),
  table.createDataColumn("date_of_admission", {
    id: "date_of_admission",
    header: "Date of Admission",
    cell: (props) => new Date(props.getValue()).toDateString(),
  }),
  table.createDataColumn((row) => row.address.pincode, {
    id: "pincode",
    header: "Pin Code",
  }),
  table.createDataColumn(
    (row) => `${row.address.street}, ${row.address.city}, ${row.address.state}`,
    {
      id: "address",
      header: "Full Address",
      cell: (props) => (
        <span>
          {props.getValue()} - <b>{props.row.original.address.pincode}</b>
        </span>
      ),
    }
  ),
];
const BasicTable = () => {
  const [data, setData] = useState([...defaultData]);
  const [columns, setColumns] = useState([...defaultColumns]);

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(instance.getRowModel());
  return (
    <div>
      <table border={1}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                <th key={header.id}>
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
