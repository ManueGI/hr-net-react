import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Chargement lazy des pages pour découper les bundles et accélérer le chargement initial
const CreateEmployee = lazy(() => import("./pages/CreateEmployee"));
const EmployeeList = lazy(() => import("./pages/EmployeeList"));

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={<div className="loading-container">Loading…</div>}>
          <Routes>
            <Route path="/" element={<CreateEmployee />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
