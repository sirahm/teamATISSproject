"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ResponseSchema = new Schema({
    SurveyID: Number,
    QuestionID: Number,
    OptionID: Number,
    ResponseValue: String
}, {
    collection: "responses"
});
const Model = mongoose_1.default.model("Response", ResponseSchema);
exports.default = Model;
//# sourceMappingURL=response.js.map