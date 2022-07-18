// Step 1 - import mongoose - database adapter
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema

// Step 2 - Create a Schema that matches the data in the collection
const QuestionSchema = new Schema
({
    QuestionText: String,
    OptionsArray: Array,
    Type: String,
    SurveyID: Number,
    QuestionID: Number
},
{
    collection: "questions"
});

// Step 3- Create a Model using the Schema
const Model = mongoose.model("Question", QuestionSchema);

// Step 4 - Export the Model -> converts this file into a module
export default Model;