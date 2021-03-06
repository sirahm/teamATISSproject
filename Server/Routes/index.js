"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = require("../Controllers/index");
const survey_page_1 = require("../Controllers/survey-page");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
router.get('/createMC', index_1.DisplayCreateMCPage);
router.get('/createTF', index_1.DisplayCreateTFPage);
router.get('/createSA', index_1.DisplayCreateSAPage);
router.get('/survey-page', survey_page_1.DisplaySurveyPage);
exports.default = router;
//# sourceMappingURL=index.js.map