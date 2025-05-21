const express = require('express');
const router = express.Router();
const { createBookRequest, getBookRequests, updateBookRequestStatus } = require('../controllers/bookRequestController'); // Import controller functions

// POST: Request a book
router.post('/request', createBookRequest);

// GET: Get all book requests (for the current user)
router.get('/', getBookRequests);

// PATCH: Update the status of a book request (approved, rejected)
router.patch('/status', updateBookRequestStatus);

module.exports = router;
