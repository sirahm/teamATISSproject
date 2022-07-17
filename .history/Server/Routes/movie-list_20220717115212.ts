import express from 'express';
const router = express.Router();

import { DisplayAddPage, DisplayEditPage, DisplaySurveyPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from '../Controllers/survey-page';

import { AuthGuard } from '../Util/index';

/* Display Movie List Page */
router.get('/survey-page', AuthGuard, DisplaySurveyPage);

/* Display Add Page */
router.get('/add', AuthGuard, DisplayAddPage);

/* Display Edit Page */
router.get('/edit/:id', AuthGuard, DisplayEditPage);

/* Process Add Page */
router.post('/add', AuthGuard, ProcessAddPage);

/* Process Edit Page */
router.post('/edit/:id', AuthGuard, ProcessEditPage);

/* Process Delete Page */
router.get('/delete/:id', AuthGuard, ProcessDeletePage);

export default router;