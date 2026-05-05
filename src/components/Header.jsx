import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className="app-header">
      <div className="header-left" />

      <div className="header-title">
        <h1>HRnet</h1>
      </div>

      <div className="header-right">
        {isHome ? (
          <Link className="small-link" to="/employees">
            View Current Employees
          </Link>
        ) : (
          <Link className="small-link" to="/">
            Create Employee
          </Link>
        )}
      </div>
    </header>
  );
}

export default React.memo(Header);
