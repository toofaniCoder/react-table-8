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
  table.createDataColumn("select", {
    id: "select",
    header: ({ instance }) => {
      return (
        <IndeterminateCheckbox
          checked={instance.getIsAllRowsSelected()}
          indeterminate={instance.getIsSomeRowsSelected()}
          onChange={instance.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    cell: ({ row }) => (
      <IndeterminateCheckbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
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
  const [data, setData] = useState([...defaultData]);
  const [columns, setColumns] = useState([...defaultColumns]);

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
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
function IndeterminateCheckbox({ checked, indeterminate, onChange }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input type="checkbox" ref={ref} checked={checked} onChange={onChange} />
  );
}
export default BasicTable;
