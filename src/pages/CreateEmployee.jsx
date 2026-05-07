import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import DatePicker from "../components/DatePicker";
import Modal from "../components/Modal";
import { EmployeeContext } from "../store/EmployeeContext";
import { STATES, DEPARTMENTS } from "../data";

export default function CreateEmployee() {
  // État local pour les champs du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  // Récupère la fonction dispatch du contexte global
  const { dispatch } = useContext(EmployeeContext);
  const navigate = useNavigate();

  // Valide les champs du formulaire et retourne les erreurs
  const validateForm = React.useCallback(() => {
    const newFieldErrors = {};

    if (!formData.firstName.trim())
      newFieldErrors.firstName = "First Name is required";
    if (!formData.lastName.trim())
      newFieldErrors.lastName = "Last Name is required";
    if (!formData.dateOfBirth)
      newFieldErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.startDate)
      newFieldErrors.startDate = "Start Date is required";
    if (!formData.street.trim()) newFieldErrors.street = "Street is required";
    if (!formData.city.trim()) newFieldErrors.city = "City is required";
    if (!formData.state) newFieldErrors.state = "State is required";
    if (!formData.zipCode.trim())
      newFieldErrors.zipCode = "Zip Code is required";
    if (!formData.department)
      newFieldErrors.department = "Department is required";

    return newFieldErrors;
  }, [formData]);

  // Met à jour la valeur d'un champ du formulaire
  const handleChange = React.useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Gère la soumission du formulaire : validation, ajout de l'employé, affichage de la confirmation
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      // Valider le formulaire
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length > 0) {
        setFieldErrors(validationErrors);
        setShowError(true);
        return;
      }

      setFieldErrors({});

      // Add employee to store
      dispatch({
        type: "ADD_EMPLOYEE",
        payload: formData,
      });

      setShowConfirmation(true);
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        department: "",
      });
    },
    [dispatch, formData, validateForm],
  );

  const handleCloseModal = () => {
    setShowConfirmation(false);
  };

  const handleCloseErrorModal = () => {
    setShowError(false);
  };

  const handleViewEmployees = () => {
    setShowConfirmation(false);
    navigate("/employees");
  };

  return (
    <>
      <div className="container">
        <h2>Create Employee</h2>

        <form action="#" id="create-employee" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className={fieldErrors.firstName ? "input-error" : ""}
              />
              {fieldErrors.firstName && (
                <span className="field-error-message">
                  {fieldErrors.firstName}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className={fieldErrors.lastName ? "input-error" : ""}
              />
              {fieldErrors.lastName && (
                <span className="field-error-message">
                  {fieldErrors.lastName}
                </span>
              )}
            </div>
          </div>

          <DatePicker
            name="date-of-birth"
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(value) => handleChange("dateOfBirth", value)}
            error={fieldErrors.dateOfBirth}
          />

          <DatePicker
            name="start-date"
            label="Start Date"
            value={formData.startDate}
            onChange={(value) => handleChange("startDate", value)}
            error={fieldErrors.startDate}
          />

          <fieldset className="address">
            <legend>Address</legend>

            <div className="form-field">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                type="text"
                value={formData.street}
                onChange={(e) => handleChange("street", e.target.value)}
                className={fieldErrors.street ? "input-error" : ""}
              />
              {fieldErrors.street && (
                <span className="field-error-message">
                  {fieldErrors.street}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className={fieldErrors.city ? "input-error" : ""}
                />
                {fieldErrors.city && (
                  <span className="field-error-message">
                    {fieldErrors.city}
                  </span>
                )}
              </div>

              <div className="form-field form-field--medium">
                <Dropdown
                  name="state"
                  label="State"
                  options={STATES}
                  value={formData.state}
                  onChange={(value) => handleChange("state", value)}
                  placeholder="Select a state"
                  error={fieldErrors.state}
                />
              </div>

              <div className="form-field form-field--small">
                <label htmlFor="zip-code">Zip Code</label>
                <input
                  id="zip-code"
                  type="number"
                  value={formData.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  className={fieldErrors.zipCode ? "input-error" : ""}
                />
                {fieldErrors.zipCode && (
                  <span className="field-error-message">
                    {fieldErrors.zipCode}
                  </span>
                )}
              </div>
            </div>
          </fieldset>

          <Dropdown
            name="department"
            label="Department"
            options={DEPARTMENTS}
            value={formData.department}
            onChange={(value) => handleChange("department", value)}
            placeholder="Select a department"
            error={fieldErrors.department}
          />
        </form>

        <div>
          <button className="primary-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
      {/* modal de succès */}
      <Modal
        isOpen={showConfirmation}
        onClose={handleCloseModal}
        title="Success"
        closeOnBackdropClick={false}
      >
        <p className="modal-message">Employee created successfully!</p>
        <div className="modal-actions">
          <button className="primary-btn" onClick={handleViewEmployees}>
            View Employees
          </button>
        </div>
      </Modal>
      {/* modal d'erreur */}
      <Modal
        isOpen={showError}
        onClose={handleCloseErrorModal}
        title="Validation Error"
        closeOnBackdropClick={false}
      >
        <div className="modal-error-list">
          <p className="modal-error-intro">
            Please fill in all required fields:
          </p>
          <ul className="error-items">
            {Object.values(fieldErrors).map((error, idx) => (
              <li key={idx} className="error-item">
                {error}
              </li>
            ))}
          </ul>
        </div>
        <div className="modal-actions">
          <button className="primary-btn" onClick={handleCloseErrorModal}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
