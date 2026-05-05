import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Chargement lazy des pages pour découper les bundles et accélérer le chargement initial
const CreateEmployee = lazy(() => import("./pages/CreateEmployee"));
const EmployeeList = lazy(() => import("./pages/EmployeeList"));
import Header from "./components/Header";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <section className="hrnet-hero-section">
          <h1 className="hrnet-hero-title">HRNet – Employee Management</h1>
          <p className="hrnet-hero-desc">
            Gérez facilement vos employés : création, consultation, et gestion
            RH simplifiée.
          </p>
        </section>
        <Suspense fallback={<div>Loading…</div>}>
          <Routes>
            <Route path="/" element={<CreateEmployee />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
