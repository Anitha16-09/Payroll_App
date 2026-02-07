// frontend/src/pages/TaxManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaxManagement = () => {
  const [taxes, setTaxes] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    salary: "",
    taxAmount: "",
    year: "",
  });

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add tax record
  const addTax = async () => {
    try {
      await axios.post("http://localhost:5000/api/taxmanagement/add", form);
      fetchTaxes();
      setForm({ employeeId: "", salary: "", taxAmount: "", year: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all tax records
  const fetchTaxes = async () => {
    const res = await axios.get("http://localhost:5000/api/taxmanagement/all");
    setTaxes(res.data.data);
  };

  // Delete tax record
  const deleteTax = async (id) => {
    await axios.delete(`http://localhost:5000/api/taxmanagement/delete/${id}`);
    fetchTaxes();
  };

  // Update tax record (simple prompt for demo)
  const updateTax = async (id) => {
    const newAmount = prompt("Enter new Tax Amount:");
    if (newAmount) {
      await axios.put(`http://localhost:5000/api/taxmanagement/update/${id}`, { taxAmount: newAmount });
      fetchTaxes();
    }
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tax Management Module</h2>
      <div>
        <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
        <input name="taxAmount" placeholder="Tax Amount" value={form.taxAmount} onChange={handleChange} />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <button onClick={addTax}>Add Tax</button>
      </div>

      <h3>All Tax Records</h3>
      <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Salary</th>
            <th>Tax Amount</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) => (
            <tr key={tax._id}>
              <td>{tax.employeeId}</td>
              <td>{tax.salary}</td>
              <td>{tax.taxAmount}</td>
              <td>{tax.year}</td>
              <td>
                <button onClick={() => updateTax(tax._id)}>Update</button>
                <button onClick={() => deleteTax(tax._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaxManagement;
