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
    "QuestionsArray": req.body.questionsArray,
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
    res.redirect('/survey-page');
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
    res.redirect('/survey-page');
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
    res.redirect('/survey-page');
  });
}
