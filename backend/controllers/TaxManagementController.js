const Tax = require('../models/Tax');
const { calculateTax } = require('../utils/TaxCalculation');

// Add new tax record
exports.addTaxRecord = async (req, res) => {
  try {
    const { employeeId, salary, year } = req.body;
    const taxAmount = calculateTax(salary);

    const tax = new Tax({ employeeId, salary, taxAmount, year });
    await tax.save();

    res.status(201).json({ status: "success", message: "Tax record added", data: tax });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get all tax records
exports.getAllTaxRecords = async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.status(200).json({ status: "success", data: taxes });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get tax records by employee ID
exports.getTaxByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const tax = await Tax.find({ employeeId });

    if (!tax.length) return res.status(404).json({ status: "fail", message: "No records found" });

    res.status(200).json({ status: "success", data: tax });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update tax record by ID
exports.updateTaxRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTax = await Tax.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTax) return res.status(404).json({ status: "fail", message: "Record not found" });

    res.status(200).json({ status: "success", message: "Record updated", data: updatedTax });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete tax record by ID
exports.deleteTaxRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tax.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ status: "fail", message: "Record not found" });

    res.status(200).json({ status: "success", message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
