"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplaySurveyPage = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const Util_1 = require("../Util");
function DisplaySurveyPage(req, res, next) {
    survey_1.default.find(function (err, surveysCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'Survey', page: 'survey-page', surveys: surveysCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyPage = DisplaySurveyPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', survey: '', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, function (err, surveyToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', survey: surveyToEdit, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newSurvey = new survey_1.default({
        "Name": req.body.surveyName,
        "Owner": req.body.ownerName,
        "QuestionsArray": req.body.questionsArray,
        "StartDate": req.body.startDate,
        "EndDate": req.body.endDate
    });
    survey_1.default.create(newSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-page');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedSurvey = new survey_1.default({
        "_id": id,
        "Name": req.body.surveyName,
        "Owner": req.body.ownerName,
        "QuestionsArray": req.body.questionsArray,
        "StartDate": req.body.startDate,
        "EndDate": req.body.endDate
    });
    survey_1.default.updateOne({ _id: id }, updatedSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-page');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-page');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=survey-page.js.map