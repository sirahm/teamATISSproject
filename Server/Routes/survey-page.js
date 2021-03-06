"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const survey_page_1 = require("../Controllers/survey-page");
router.get('/survey-page', survey_page_1.DisplaySurveyPage);
router.get('/add', survey_page_1.DisplayAddPage);
router.get('/edit/:id', survey_page_1.DisplayEditPage);
router.post('/add', survey_page_1.ProcessAddPage);
router.post('/edit/:id', survey_page_1.ProcessEditPage);
router.get('/delete/:id', survey_page_1.ProcessDeletePage);
router.post('/createMC', survey_page_1.ProcessCreateMCPage);
exports.default = router;
//# sourceMappingURL=survey-page.js.map