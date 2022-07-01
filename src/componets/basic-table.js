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
  table.createGroup({
    header: "Full Name",
    columns: [
      table.createDataColumn("firstName", {
        id: "First Name",
      }),
      table.createDataColumn("middleName", {
        id: "Middle Name",
      }),
      table.createDataColumn("lastName", {
        id: "Last Name",
      }),
    ],
  }),
  table.createDataColumn("age", {
    id: "Age",
  }),
  table.createGroup({
    header: "Phone Number",
    columns: [
      table.createDataColumn((row) => row.phone[1], {
        id: "Phone Number 1",
      }),
      table.createDataColumn((row) => row.phone[2], {
        id: "Phone Number 2",
      }),
    ],
  }),
  table.createDataColumn("email", {
    id: "E-mail Address",
  }),
  table.createGroup({
    header: "Full Address",
    columns: [
      table.createDataColumn((row) => row.address.street, {
        id: "Street",
      }),
      table.createDataColumn((row) => row.address.city, {
        id: "City",
      }),
      table.createDataColumn((row) => row.address.state, {
        id: "Address",
      }),
      table.createDataColumn((row) => row.address.pincode, {
        id: "Pin Code",
      }),
    ],
  }),
  table.createGroup({
    header: "Date Details",
    columns: [
      table.createDataColumn("date_of_birth", {
        id: "Date of Birth",
        cell: (props) => new Date(props.getValue()).toDateString(),
      }),
      table.createDataColumn("date_of_admission", {
        id: "Date of Admission",
        cell: (props) => new Date(props.getValue()).toDateString(),
      }),
    ],
  }),
];
const BasicTable = () => {
  const [data] = useState([...defaultData.slice(0, 14)]);
  const [columns] = useState([...defaultColumns]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });
  /*
  TEST cases
['E-mail Address', 'Middle Name', 'Phone Number 2', 'Last Name',
 'Street', 'Pin Code', 'Date of Admission', 'Date of Birth',
  'Phone Number 1', 'First Name', 'Address', 'City', 'Age']

['Pin Code', 'Age', 'First Name', 'Last Name', 'E-mail Address',
 'Date of Birth', 'Date of Admission', 'Middle Name', 'Street',
  'Phone Number 1', 'Address', 'Phone Number 2', 'City']

['Phone Number 2', 'E-mail Address', 'City', 'Street', 'Age',
'Last Name', 'Date of Admission', 'Pin Code', 'Middle Name',
 'First Name', 'Date of Birth', 'Phone Number 1', 'Address']

['Middle Name', 'Date of Admission', 'First Name', 'Phone Number 1',
 'Address', 'Date of Birth', 'Street', 'Phone Number 2', 'City',
  'Age', 'E-mail Address', 'Last Name', 'Pin Code']

  */

  return (
    <div>
      <div className="input-group">
        {" "}
        <label>
          <input
            type="checkbox"
            checked={instance.getIsAllColumnsVisible()}
            onChange={instance.getToggleAllColumnsVisibilityHandler()}
          />
          Toggle All
        </label>
        {instance.getAllLeafColumns().map((column) => (
          <label key={column.id}>
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.id}
          </label>
        ))}
      </div>

      <table border={1}>
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
