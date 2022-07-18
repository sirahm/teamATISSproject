import express from 'express';
import { CallbackError } from 'mongoose';

// import the Movie Model
import Survey from '../Models/survey';
import Question from '../Models/question';
import Option from '../Models/option';
import Response from '../Models/response';
import { UserDisplayName  } from '../Util';
import { create } from 'domain';
import { randomBytes } from 'crypto';

export function DisplaySurveyPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
    Survey.find(function(err, surveysCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      res.render('index', { title: 'Survey', page: 'survey-page', surveys: surveysCollection, displayName:  UserDisplayName(req)  });
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  res.render('index', { title: 'Add', page: 'edit', survey: '', displayName:  UserDisplayName(req) })
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the db and read the movie into the edit page
  Survey.findById(id, {}, {}, function(err, surveyToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view with the data
    res.render('index', { title: 'Edit', page: 'edit', survey: surveyToEdit, displayName:  UserDisplayName(req) })
  });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new Movie to Add
  let newSurvey = new Survey
  ({
    "Name": req.body.surveyName,
    "Owner": req.body.ownerName,
    "QuestionsArray": req.body.questionsArray + req.body.question,
    "StartDate": req.body.startDate,
    "EndDate": req.body.endDate
  });

  // Insert the new Movie object into the database (movies collection)
  Survey.create(newSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new movie has been added -> refresh the movie-list
    res.redirect('/login');
  })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // instantiate a new Movie to Edit
  let updatedSurvey = new Survey
  ({
    "_id": id,
    "Name": req.body.surveyName,
    "Owner": req.body.ownerName,
    "QuestionsArray": req.body.questionsArray,
    "StartDate": req.body.startDate,
    "EndDate": req.body.endDate
  });

  // update the movie in the database
Survey.updateOne({_id: id}, updatedSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the movie-list page
    res.redirect('/login');
  });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the movie
  Survey.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/login');
  });
}

export function ProcessCreateMCPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new Movie to Add
  let newSurvey = new Survey
  ({
    "OwnerID": req.body.username,
    "SurveyName": req.body.surveyname,
    "Active": true,
    "Questions":
    [
      {
          "QuestionID": "1",
          "QuestionType":"Multiple",
          "QuestionText": req.body.question1,
          "Options":
          [
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
              "QuestionType":"Multiple",
              "QuestionText": req.body.question2,
              "Options":
              [
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
                  "QuestionType":"Multiple",
                  "QuestionText": req.body.question3,
                  "Options":
                  [
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
                      "QuestionType":"Multiple",
                      "QuestionText": req.body.question4,
                      "Options":
                      [
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
                          "QuestionType":"Multiple",
                          "QuestionText": req.body.question5,
                          "Options":
                          [
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
                              "QuestionType":"Multiple",
                              "QuestionText": req.body.question6,
                              "Options":
                              [
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
                                  "QuestionType":"Multiple",
                                  "QuestionText": req.body.question7,
                                  "Options":
                                  [
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
                                      "QuestionType":"Multiple",
                                      "QuestionText": req.body.question8,
                                      "Options":
                                      [
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
                                          "QuestionType":"Multiple",
                                          "QuestionText": req.body.question9,
                                          "Options":
                                          [
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
                                              "QuestionType":"Multiple",
                                              "QuestionText": req.body.question10,
                                              "Options":
                                              [
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

  // Insert the new Movie object into the database (movies collection)
  Survey.create(newSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new movie has been added -> refresh the movie-list
    res.redirect('/login');
  })
}

export function ProcessCreateSAPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new Movie to Add
  let newSurvey = new Survey
  let id = req.params.id;
  ({
    "SurveyID": id,
    "OwnerID": req.body.username,
    "SurveyName": req.body.surveyname,
    "Active": true,
    "Questions":
    [
      {
          "QuestionID": "1",
          "QuestionType":"Multiple",
          "QuestionText": req.body.question1,
          "Options":
          [
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
              "QuestionType":"Multiple",
              "QuestionText": req.body.question2,
              "Options":
              [
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
                  "QuestionType":"Multiple",
                  "QuestionText": req.body.question3,
                  "Options":
                  [
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
                      "QuestionType":"Multiple",
                      "QuestionText": req.body.question4,
                      "Options":
                      [
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
                          "QuestionType":"Multiple",
                          "QuestionText": req.body.question4,
                          "Options":
                          [
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
                              "QuestionType":"Multiple",
                              "QuestionText": req.body.question6,
                              "Options":
                              [
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
                                  "QuestionType":"Multiple",
                                  "QuestionText": req.body.question6,
                                  "Options":
                                  [
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

  // Insert the new Movie object into the database (movies collection)
  Survey.create(newSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new movie has been added -> refresh the movie-list
    res.redirect('/login');
  })
}