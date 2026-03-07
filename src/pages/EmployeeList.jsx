import { useContext } from "react";
import { DataTable } from "data-table-component-gif";
import "data-table-component-gif/dist/data-table-component-gif.css";

import { EmployeeContext } from "../store/EmployeeContext";

export default function EmployeeList() {
  const { state } = useContext(EmployeeContext);

  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "dateOfBirth", label: "Date of Birth" },
    { key: "startDate", label: "Start Date" },
    { key: "street", label: "Street" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "zipCode", label: "Zip Code" },
    { key: "department", label: "Department" },
  ];

  return (
    <>
      <div id="employee-div" className="container">
        <h2>Current Employees</h2>
        <DataTable data={state.employees} columns={columns} itemsPerPage={10} />
      </div>
    </>
  );
}
