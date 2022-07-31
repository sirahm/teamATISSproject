//instance variables
let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    SurveyID: String,
    OwnerID: String,
    SurveyName: String,
    StartDate: String,
    EndDate: String, 
    Active: Boolean, 

},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey-Answer', surveyModel);