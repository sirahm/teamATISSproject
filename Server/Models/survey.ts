// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const SurveySchema = new Schema
({
    Name: String,
    Owner: String,
    SurveyID: Number,
    QuestionsArray: Array,
    isActive: Boolean,
    StartDate: Date,
    EndDate: Date
},
{
    collection: "surveys"
});

// Step 3- Create a Model using the Schema
const Model = mongoose.model("Survey", SurveySchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;