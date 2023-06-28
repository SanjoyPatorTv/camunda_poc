"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.completeTask = exports.claimTask = exports.getTask = exports.getAllTasks = void 0;
var camunda_8_sdk_1 = require("camunda-8-sdk");
var chalk_1 = __importDefault(require("chalk"));
var zbc = new camunda_8_sdk_1.C8.ZBClient();
var operate = new camunda_8_sdk_1.C8.OperateApiClient();
var optimize = new camunda_8_sdk_1.C8.OptimizeApiClient(); // unused
var tasklist = new camunda_8_sdk_1.C8.TasklistApiClient();
var getLogger = function (prefix, color) { return function (msg) {
    return console.log(color("[".concat(prefix, "] ").concat(msg)));
}; };
var log = getLogger("Task handler : ", chalk_1["default"].yellowBright);
//get all task list (GET) - no params,
var getAllTasks = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskListRes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, tasklist.getTasks({
                        state: camunda_8_sdk_1.Tasklist.TaskState.CREATED
                    })];
            case 1:
                taskListRes = _a.sent();
                log("Get Tasklist full ".concat(JSON.stringify(taskListRes, null, 2)));
                //same as res.json({token : token})
                res.json({ taskListRes: taskListRes });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                error_1.type = "task-error";
                log("Get Tasklist failed : ".concat(error_1));
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllTasks = getAllTasks;
//get all task list (GET) - no params,
var getTask = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, taskRes, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.id;
                log("Getting task with id: ".concat(taskId));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, tasklist.getTask(taskId)];
            case 2:
                taskRes = _a.sent();
                log("Get Task by Id ".concat(JSON.stringify(taskRes, null, 2)));
                //same as res.json({token : token})
                res.json({ taskRes: taskRes });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                error_2.type = "task-error";
                log("Get Task by Id failed :  ".concat(JSON.stringify(error_2, null, 2)));
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTask = getTask;
// claim a task with task id (POST) - { taskId, assigneeName }
var claimTask = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, assigneeName, claimTask_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.body.taskId;
                assigneeName = req.body.assigneeName;
                log("Claiming task ".concat(taskId, " with assignee ").concat(assigneeName));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, tasklist.claimTask(taskId, assigneeName, true)];
            case 2:
                claimTask_1 = (_a.sent()).claimTask;
                log("Claimed task successful :  ".concat(JSON.stringify(claimTask_1, null, 2)));
                //same as res.json({token : token})
                res.json({ claimTask: claimTask_1 });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                error_3.type = "task-error";
                log("Claim task failed :  ".concat(JSON.stringify(error_3, null, 2)));
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.claimTask = claimTask;
// complete a task and provide variables (POST) - { taskId, taskVariables : optional }
var completeTask = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, taskVariables, completeTaskRes, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.body.taskId;
                taskVariables = req.body.taskVariables;
                log("Completing task : ".concat(taskId, " with task variables ").concat(taskVariables));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, tasklist.completeTask(taskId, taskVariables)];
            case 2:
                completeTaskRes = _a.sent();
                log("Complete task successful :  ".concat(JSON.stringify(completeTaskRes, null, 2)));
                //same as res.json({token : token})
                res.json({ completeTaskRes: completeTaskRes });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                error_4.type = "task-error";
                log("Complete task failed :  ".concat(JSON.stringify(error_4, null, 2)));
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.completeTask = completeTask;
//# sourceMappingURL=task.js.map