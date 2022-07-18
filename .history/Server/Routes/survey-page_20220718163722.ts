import express from 'express';
const router = express.Router();

import { DisplayAddPage, DisplayEditPage, DisplaySurveyPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage, ProcessCreateMCPage } from '../Controllers/survey-page';

// import { AuthGuard } from '../Util/index';

/* Display Survey Page */
router.get('/survey-page', DisplaySurveyPage);

/* Display Add Page */
router.get('/add', DisplayAddPage);

/* Display Edit Page */
router.get('/edit/:id', DisplayEditPage);

/* Process Add Page */
router.post('/add', ProcessAddPage);

/* Process Edit Page */
router.post('/edit/:id', ProcessEditPage);

/* Process Delete Page */
router.get('/delete/:id', ProcessDeletePage);

router.post('/createMC', ProcessCreateMCPage);


export default router;