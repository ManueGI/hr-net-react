import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import Header from "./components/Header";

// App: keep structure minimal; Header shows a single nav link depending on page
export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </main>
    </div>
  );
}
