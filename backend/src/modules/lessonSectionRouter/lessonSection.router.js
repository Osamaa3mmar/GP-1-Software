import { Router } from 'express';
import { getAllSections, addSection, updateSection, deleteSection, reorderSections } from './lessonSection.controller.js';
import { auth } from '../../middleware/auth.js';
import { fileUpload } from '../../utils/fileUpload.js';

const router = Router();

// Get all sections for a lesson
router.get('/getall/:lessonId', auth(), getAllSections);

// Add a new section
router.post('/add', fileUpload().fields([{name: "sectionImage", maxCount: 1}]), auth(), addSection);

// Update a section
router.put('/update', fileUpload().fields([{name: "sectionImage", maxCount: 1}]), auth(), updateSection);

// Delete a section
router.delete('/delete', auth(), deleteSection);

// Reorder sections
router.put('/reorder', auth(), reorderSections);

export default router;
