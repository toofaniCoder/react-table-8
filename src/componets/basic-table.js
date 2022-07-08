import React, { useState } from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
} from "@tanstack/react-table";
import STUDENTS from "../students.json";
import _ from "lodash";

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
  const [data, setData] = useState([...defaultData.slice(0, 14)]);
  const [columns, setColumns] = useState([...defaultColumns]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState({});
  const [columnPinning, setColumnPinning] = useState({});
  const [isSplit, setIsSplit] = React.useState(false);

  const instance = useTableInstance(table, {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: columnVisibility,
      columnOrder: columnOrder,
      columnPinning: columnPinning,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
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
  console.log(
    _.shuffle(instance.getAllLeafColumns().map((column) => column.id))
  );
  const randomColumnOrder = () => {
    instance.setColumnOrder(
      _.shuffle(instance.getAllLeafColumns().map((column) => column.id))
    );
  };

  return (
    <div>
      <button className="button" onClick={randomColumnOrder}>
        change column order
      </button>
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
      <div>
        <label>
          <input
            type="checkbox"
            checked={isSplit}
            onChange={(e) => setIsSplit(e.target.checked)}
          />{" "}
          Split Mode
        </label>
      </div>
      <div className={isSplit ? "flex-table" : null}>
        {isSplit ? (
          <table border={1}>
            <thead>
              {instance.getLeftHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div>
                        {header.isPlaceholder ? null : header.renderHeader()}
                        {!header.isPlaceholder && header.column.getCanPin() && (
                          <div>
                            {header.column.getIsPinned() !== "left" ? (
                              <button
                                className="button-emoji"
                                onClick={() => header.column.pin("left")}
                              >
                                {"👈"}
                              </button>
                            ) : null}
                            {header.column.getIsPinned() ? (
                              <button
                                className="button-emoji"
                                onClick={() => header.column.pin(false)}
                              >
                                {"❌"}
                              </button>
                            ) : null}
                            {header.column.getIsPinned() !== "right" ? (
                              <button
                                className="button-emoji"
                                onClick={() => header.column.pin("right")}
                              >
                                {"👉"}
                              </button>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {instance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getLeftVisibleCells().map((cell) => (
                    <td key={cell.id}>{cell.renderCell()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {instance.getLeftFooterGroups().map((footerGroup) => (
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
        ) : null}

        <table border={1}>
          <thead>
            {(isSplit
              ? instance.getCenterHeaderGroups()
              : instance.getHeaderGroups()
            ).map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div>
                      {header.isPlaceholder ? null : header.renderHeader()}
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div>
                          {header.column.getIsPinned() !== "left" ? (
                            <button
                              className="button-emoji"
                              onClick={() => header.column.pin("left")}
                            >
                              {"👈"}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() ? (
                            <button
                              className="button-emoji"
                              onClick={() => header.column.pin(false)}
                            >
                              {"❌"}
                            </button>
                          ) : null}
                          {header.column.getIsPinned() !== "right" ? (
                            <button
                              className="button-emoji"
                              onClick={() => header.column.pin("right")}
                            >
                              {"👉"}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {instance.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {(isSplit
                  ? row.getCenterVisibleCells()
                  : row.getVisibleCells()
                ).map((cell) => (
                  <td key={cell.id}>{cell.renderCell()}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {(isSplit
              ? instance.getCenterFooterGroups()
              : instance.getFooterGroups()
            ).map((footerGroup) => (
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

        {isSplit ? (
          <table border={1}>
            <thead>
              {instance.getRightHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div>
                        {header.isPlaceholder ? null : header.renderHeader()}
                        {!header.isPlaceholder && header.column.getCanPin() && (
                          <div>
                            {header.column.getIsPinned() !== "left" ? (
                              <button
                                className="button-emoji"
                                onClick={() => header.column.pin("left")}
                              >
                                {"👈"}
                              </button>
                            ) : null}
                            {header.column.getIsPinned() ? (
                              <button
                                className="button-emoji"
                                onClick={() => header.column.pin(false)}
                              >
                                {"❌"}
                              </button>
                            ) : null}
                            {header.column.getIsPinned() !== "right" ? (
                              <button
                                className="button-emoji"
                                onClick={() => header.column.pin("right")}
                              >
                                {"👉"}
                              </button>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {instance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getRightVisibleCells().map((cell) => (
                    <td key={cell.id}>{cell.renderCell()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {instance.getRightFooterGroups().map((footerGroup) => (
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
        ) : null}
      </div>
    </div>
  );
};

export default BasicTable;
