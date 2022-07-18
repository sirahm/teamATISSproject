"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessCreateSAPage = exports.ProcessCreateMCPage = exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplaySurveyPage = void 0;
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
        "QuestionsArray": req.body.questionsArray + req.body.question,
        "StartDate": req.body.startDate,
        "EndDate": req.body.endDate
    });
    survey_1.default.create(newSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/login');
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
        res.redirect('/login');
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
        res.redirect('/login');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
function ProcessCreateMCPage(req, res, next) {
    let newSurvey = new survey_1.default({
        "OwnerID": req.body.username,
        "SurveyName": req.body.surveyname,
        "Active": true,
        "Questions": [
            {
                "QuestionID": "1",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question1,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question1option1,
                        "OptionValue": 1,
                        "QuestionID": "1"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question1option2,
                        "OptionValue": 2,
                        "QuestionID": "1"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question1option3,
                        "OptionValue": 3,
                        "QuestionID": "1"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question1option4,
                        "OptionValue": 4,
                        "QuestionID": "1"
                    }
                ]
            },
            {
                "QuestionID": "2",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question2,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question2option1,
                        "OptionValue": 1,
                        "QuestionID": "2"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question2option2,
                        "OptionValue": 2,
                        "QuestionID": "2"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question2option3,
                        "OptionValue": 3,
                        "QuestionID": "2"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question2option4,
                        "OptionValue": 4,
                        "QuestionID": "2"
                    }
                ]
            },
            {
                "QuestionID": "3",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question3,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question3option1,
                        "OptionValue": 1,
                        "QuestionID": "3"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question3option2,
                        "OptionValue": 2,
                        "QuestionID": "3"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question3option3,
                        "OptionValue": 3,
                        "QuestionID": "3"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question3option4,
                        "OptionValue": 4,
                        "QuestionID": "3"
                    }
                ]
            },
            {
                "QuestionID": "4",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question4,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question4option1,
                        "OptionValue": 1,
                        "QuestionID": "4"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question4option2,
                        "OptionValue": 2,
                        "QuestionID": "4"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question4option3,
                        "OptionValue": 3,
                        "QuestionID": "4"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question4option4,
                        "OptionValue": 4,
                        "QuestionID": "4"
                    }
                ]
            },
            {
                "QuestionID": "5",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question5,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question5option1,
                        "OptionValue": 1,
                        "QuestionID": "5"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question5option2,
                        "OptionValue": 2,
                        "QuestionID": "5"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question5option3,
                        "OptionValue": 3,
                        "QuestionID": "5"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question5option4,
                        "OptionValue": 4,
                        "QuestionID": "5"
                    }
                ]
            },
            {
                "QuestionID": "6",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question6,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question6option1,
                        "OptionValue": 1,
                        "QuestionID": "6"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question6option2,
                        "OptionValue": 2,
                        "QuestionID": "6"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question6option3,
                        "OptionValue": 3,
                        "QuestionID": "6"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question6option4,
                        "OptionValue": 4,
                        "QuestionID": "6"
                    }
                ]
            },
            {
                "QuestionID": "7",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question7,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question7option1,
                        "OptionValue": 1,
                        "QuestionID": "7"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question7option2,
                        "OptionValue": 2,
                        "QuestionID": "7"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question7option3,
                        "OptionValue": 3,
                        "QuestionID": "7"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question7option4,
                        "OptionValue": 4,
                        "QuestionID": "7"
                    }
                ]
            },
            {
                "QuestionID": "8",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question8,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question8option1,
                        "OptionValue": 1,
                        "QuestionID": "8"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question8option2,
                        "OptionValue": 2,
                        "QuestionID": "8"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question8option3,
                        "OptionValue": 3,
                        "QuestionID": "8"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question8option4,
                        "OptionValue": 4,
                        "QuestionID": "8"
                    }
                ]
            },
            {
                "QuestionID": "9",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question9,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question9option1,
                        "OptionValue": 1,
                        "QuestionID": "9"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question9option2,
                        "OptionValue": 2,
                        "QuestionID": "9"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question9option3,
                        "OptionValue": 3,
                        "QuestionID": "9"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question9option4,
                        "OptionValue": 4,
                        "QuestionID": "9"
                    }
                ]
            },
            {
                "QuestionID": "10",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question10,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question10option1,
                        "OptionValue": 1,
                        "QuestionID": "10"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question10option2,
                        "OptionValue": 2,
                        "QuestionID": "10"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question10option3,
                        "OptionValue": 3,
                        "QuestionID": "10"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question10option4,
                        "OptionValue": 4,
                        "QuestionID": "10"
                    }
                ]
            }
        ]
    });
    survey_1.default.create(newSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/login');
    });
}
exports.ProcessCreateMCPage = ProcessCreateMCPage;
function ProcessCreateSAPage(req, res, next) {
    let newSurvey = new survey_1.default;
    let id = req.params.id;
    ({
        "SurveyID": id,
        "OwnerID": req.body.username,
        "SurveyName": req.body.surveyname,
        "Active": true,
        "Questions": [
            {
                "QuestionID": "1",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question1,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question1option1,
                        "OptionValue": 1,
                        "QuestionID": "1"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question1option2,
                        "OptionValue": 2,
                        "QuestionID": "1"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question1option3,
                        "OptionValue": 3,
                        "QuestionID": "1"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question1option4,
                        "OptionValue": 4,
                        "QuestionID": "1"
                    }
                ]
            },
            {
                "QuestionID": "2",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question2,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question2option1,
                        "OptionValue": 1,
                        "QuestionID": "2"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question2option2,
                        "OptionValue": 2,
                        "QuestionID": "2"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question2option3,
                        "OptionValue": 3,
                        "QuestionID": "2"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question2option4,
                        "OptionValue": 4,
                        "QuestionID": "2"
                    }
                ]
            },
            {
                "QuestionID": "3",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question3,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question3option1,
                        "OptionValue": 1,
                        "QuestionID": "3"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question3option2,
                        "OptionValue": 2,
                        "QuestionID": "3"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question3option3,
                        "OptionValue": 3,
                        "QuestionID": "3"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question3option4,
                        "OptionValue": 4,
                        "QuestionID": "3"
                    }
                ]
            },
            {
                "QuestionID": "4",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question4,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question4option1,
                        "OptionValue": 1,
                        "QuestionID": "4"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question4option2,
                        "OptionValue": 2,
                        "QuestionID": "4"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question4option3,
                        "OptionValue": 3,
                        "QuestionID": "4"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question4option4,
                        "OptionValue": 4,
                        "QuestionID": "4"
                    }
                ]
            },
            {
                "QuestionID": "5",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question4,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question5option1,
                        "OptionValue": 1,
                        "QuestionID": "5"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question5option2,
                        "OptionValue": 2,
                        "QuestionID": "5"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question5option3,
                        "OptionValue": 3,
                        "QuestionID": "5"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question5option4,
                        "OptionValue": 4,
                        "QuestionID": "5"
                    }
                ]
            },
            {
                "QuestionID": "6",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question6,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question6option1,
                        "OptionValue": 1,
                        "QuestionID": "6"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question6option2,
                        "OptionValue": 2,
                        "QuestionID": "6"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question6option3,
                        "OptionValue": 3,
                        "QuestionID": "6"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question6option4,
                        "OptionValue": 4,
                        "QuestionID": "6"
                    }
                ]
            },
            {
                "QuestionID": "7",
                "QuestionType": "Multiple",
                "QuestionText": req.body.question6,
                "Options": [
                    {
                        "OptionID": "1",
                        "OptionText": req.body.question7option1,
                        "OptionValue": 1,
                        "QuestionID": "7"
                    },
                    {
                        "OptionID": "2",
                        "OptionText": req.body.question7option2,
                        "OptionValue": 2,
                        "QuestionID": "7"
                    },
                    {
                        "OptionID": "3",
                        "OptionText": req.body.question7option3,
                        "OptionValue": 3,
                        "QuestionID": "7"
                    },
                    {
                        "OptionID": "4",
                        "OptionText": req.body.question7option4,
                        "OptionValue": 4,
                        "QuestionID": "7"
                    }
                ]
            },
        ]
    });
    survey_1.default.create(newSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/login');
    });
}
exports.ProcessCreateSAPage = ProcessCreateSAPage;
//# sourceMappingURL=survey-page.js.map