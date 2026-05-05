import { useReducer } from "react";
import { EmployeeContext } from "./EmployeeContext";

const getInitialState = () => ({
  employees: [],
});

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

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
}
