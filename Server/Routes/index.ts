import express from 'express';
const router = express.Router();

import { DisplayCreateMCPage, DisplayCreateTFPage, DisplayCreateSAPage, DisplayHomePage } from '../Controllers/index';


router.get('/', DisplayHomePage);


router.get('/home', DisplayHomePage);


router.get('/createMC', DisplayCreateMCPage);


router.get('/createTF', DisplayCreateTFPage);


router.get('/createSA', DisplayCreateSAPage);


export default router;
