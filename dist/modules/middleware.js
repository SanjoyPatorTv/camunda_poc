"use strict";
exports.__esModule = true;
exports.handleInputErrors = void 0;
var express_validator_1 = require("express-validator");
var handleInputErrors = function (req, res, next) {
    var error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        res.status(400);
        res.json({ errors: error.array() });
    }
    else {
        next();
    }
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=middleware.js.map