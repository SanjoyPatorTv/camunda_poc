"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
// import { protect } from "./modules/auth";
var app = (0, express_1["default"])();
var customLogger = function (message) { return function (req, res, next) {
    console.log("custom logger ", message);
    next();
}; };
app.use((0, cors_1["default"])());
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
//protect only applies to this and not the others
// app.use('/api',protect,  router)
app.use('/api', router_1["default"]);
//this are accessible to all i.e. not protected routes
// app.use('/user', createNewUser)
// app.use('/signin', signin)
// to handle async error
app.use(function (err, req, res, next) {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    }
    else {
        res.status(500).json({ message: 'oops, thats on us' });
    }
});
exports["default"] = app;
//# sourceMappingURL=server.js.map