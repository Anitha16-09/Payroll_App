/**
 * StaffUtils.js
 * Helper functions for StaffPortal
 */

// Format staff name properly (Title Case)
function formatStaffName(name) {
  return name.trim().split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

module.exports = { formatStaffName };
