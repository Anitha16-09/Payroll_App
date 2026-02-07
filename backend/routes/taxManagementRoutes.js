const express = require('express');
const router = express.Router();
const taxManagementController = require('../controllers/TaxManagementController');

// Create
router.post('/add', taxManagementController.addTaxRecord);

// Read all
router.get('/all', taxManagementController.getAllTaxRecords);

// Read by employee
router.get('/employee/:employeeId', taxManagementController.getTaxByEmployee);

// Update
router.put('/update/:id', taxManagementController.updateTaxRecord);

// Delete
router.delete('/delete/:id', taxManagementController.deleteTaxRecord);

module.exports = router;
