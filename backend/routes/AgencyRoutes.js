import express from 'express';
import { createAgency, getAgencyByName, updateAgency, deleteAgency } from '../controllers/AgencyController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Route to create a new agency profile with logo and portfolio image uploads
router.post('/create', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'portfolio', maxCount: 10 } // Adjust maxCount as needed
]), createAgency);

// Route to get an agency profile by name
router.get('/profile/:agencyName', getAgencyByName);

// Route to update an agency profile by name
router.put('/profile/:agencyName', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'portfolio', maxCount: 10 }
]), updateAgency);

// Route to delete an agency profile by name
router.delete('/profile/:agencyName', deleteAgency);

export default router;
