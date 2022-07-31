//instance variables
let express = require('express');
let mongoose = require('mongoose');

let router = express.Router();

// connect to our survey answers Model
let Survey = require('../models/survey');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the server answers - READ Operation */
router.get('/', requireAuth, (req, res, next) => {
    Survey.find((err, surveyAnswers) => {
        if (err) {
            console.error(err);
            return;
        }
        
        res.render('survey', { title: 'Survey Table', SurveyList: surveyAnswers });
    });
});

// GET the Book Details page in order to add a new Book
router.get('/add', requireAuth, (req, res, next) => {
    res.render('edit', { title: 'Add Survey', SurveyList: {} });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    console.log({ body: req.body });

    let newSurvey = new Survey({
        "SurveyID": req.body.SurveyID,
        "OwnerID": req.body.OwnerID,
        "SurveyName": req.body.SurveyName,
        "StartDate": req.body.StartDate,
        "EndDate": req.body.EndDate,
        "Active": req.body.Active !== undefined,
    });

    Survey.create(newSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        
        // refresh the book list
        res.redirect('/survey');
    });
});

// GET route for displaying the edit page
router.get('/edit/:id', requireAuth, (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        
        //show the edit view
        res.render('edit', { title: 'Edit Survey', SurveyList: surveyToEdit });
    });
});

router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = new Survey({
        "SurveyID": req.body.SurveyID,
        "OwnerID": req.body.OwnerID,
        "SurveyName": req.body.SurveyName,
        "StartDate": req.body.StartDate,
        "EndDate": req.body.EndDate,
        "Active": req.body.Active !== undefined,
    });

    updatedSurvey._id = new mongoose.Types.ObjectId(id); // TODO: Need to remove this dirty hack.

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }

        // refresh the book list
        res.redirect('/survey');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        
        // refresh the list
        res.redirect('/survey');
    });

});

module.exports = router;
