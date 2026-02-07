/**
 * TaxCalculation.js
 * Utility functions for payroll tax calculations
 */

function calculateTax(salary) {
  let tax = 0;

  if (salary <= 25000) {
    tax = salary * 0.05;
  } else if (salary <= 50000) {
    tax = 25000 * 0.05 + (salary - 25000) * 0.10;
  } else if (salary <= 100000) {
    tax = 25000 * 0.05 + 25000 * 0.10 + (salary - 50000) * 0.15;
  } else {
    tax = 25000 * 0.05 + 25000 * 0.10 + 50000 * 0.15 + (salary - 100000) * 0.20;
  }

  return Math.round(tax);
}

module.exports = {
  calculateTax
};
