"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayCreateSAPage = exports.DisplayCreateTFPage = exports.DisplayCreateMCPage = exports.DisplayHomePage = void 0;
const Util_1 = require("../Util");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayCreateMCPage(req, res, next) {
    res.render('index', { title: 'Create Multiple Choice Question', page: 'createMC', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayCreateMCPage = DisplayCreateMCPage;
function DisplayCreateTFPage(req, res, next) {
    res.render('index', { title: 'Create True/False Question', page: 'createTF', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayCreateTFPage = DisplayCreateTFPage;
function DisplayCreateSAPage(req, res, next) {
    res.render('index', { title: 'Create Simple Answer Question', page: 'createSA', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayCreateSAPage = DisplayCreateSAPage;
//# sourceMappingURL=index.js.map