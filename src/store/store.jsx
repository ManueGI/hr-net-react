import { useReducer, useEffect } from "react";
import { EmployeeContext } from "./EmployeeContext";

const STORAGE_KEY = "hrnet_employees";

const getInitialState = () => {
  const savedEmployees = localStorage.getItem(STORAGE_KEY);
  return {
    employees: savedEmployees ? JSON.parse(savedEmployees) : [],
  };
};

function employeeReducer(state, action) {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case "REMOVE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter((_, idx) => idx !== action.payload),
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((emp, idx) =>
          idx === action.payload.index ? action.payload.data : emp,
        ),
      };
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, null, getInitialState);

  // Sauvegarder dans localStorage chaque fois que l'état change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.employees));
  }, [state.employees]);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
}
