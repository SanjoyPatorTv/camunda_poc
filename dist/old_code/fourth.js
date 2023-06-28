"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var camunda_8_sdk_1 = require("camunda-8-sdk");
var chalk_1 = __importDefault(require("chalk"));
var path = __importStar(require("path"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var zbc = new camunda_8_sdk_1.C8.ZBClient();
var operate = new camunda_8_sdk_1.C8.OperateApiClient();
var optimize = new camunda_8_sdk_1.C8.OptimizeApiClient(); // unused
var tasklist = new camunda_8_sdk_1.C8.TasklistApiClient();
var getLogger = function (prefix, color) { return function (msg) {
    return console.log(color("[".concat(prefix, "] ").concat(msg)));
}; };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var log, res, err_1, p, bpmn, err_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log = getLogger("Zeebe", chalk_1["default"].greenBright);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, zbc.deployProcess(path.join(process.cwd(), 'bpmn', 'c8-sdk-fourth.bpmn'))];
                case 2:
                    res = _a.sent();
                    log("Deployed process ".concat(JSON.stringify(res, null, 2)));
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    log("Deploy failed: ".concat(err_1));
                    return [3 /*break*/, 4];
                case 4:
                    _a.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, zbc.createProcessInstance({
                            bpmnProcessId: "c8-sdk-fourth",
                            variables: {
                                patientId: "p-100",
                                humanTaskStatus: "not done"
                            }
                        })];
                case 5:
                    p = _a.sent();
                    log("Process creation p = ".concat(JSON.stringify(p, null, 2)));
                    return [4 /*yield*/, operate.getProcessDefinitionXML(parseInt(p.processDefinitionKey, 10))];
                case 6:
                    bpmn = _a.sent();
                    log(chalk_1["default"].redBright("\n[Operate] BPMN XML:", bpmn));
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    log("Process creation failed :  ".concat(JSON.stringify(err_2, null, 2)));
                    return [3 /*break*/, 8];
                case 8:
                    // ---------------------------------------------------------------------------------------
                    //claim human task
                    console.log("Starting human task poller...");
                    //long polling with interval 3000 to get task list
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var log, taskListRes, taskClaimed, err_3;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    log = getLogger("Tasklist", chalk_1["default"].yellowBright);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, tasklist.getTasks({
                                            state: camunda_8_sdk_1.Tasklist.TaskState.CREATED
                                        })];
                                case 2:
                                    taskListRes = _a.sent();
                                    log("tasklist full ".concat(JSON.stringify(taskListRes, null, 2)));
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_3 = _a.sent();
                                    log("getTasks error ".concat(JSON.stringify(err_3, null, 2)));
                                    return [3 /*break*/, 4];
                                case 4:
                                    //do this if tasks were present
                                    if (taskListRes && taskListRes.tasks.length > 0) {
                                        log("fetched ".concat(taskListRes.tasks.length, " human tasks"));
                                        //looping tasklist
                                        taskListRes.tasks.forEach(function (task) { return __awaiter(_this, void 0, void 0, function () {
                                            var claimTask, err_4, error_1;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        log("tasklist each ".concat(JSON.stringify(task, null, 2)));
                                                        log("claiming task ".concat(task.id, " from process ").concat(task.processInstanceId));
                                                        _a.label = 1;
                                                    case 1:
                                                        _a.trys.push([1, 3, , 4]);
                                                        return [4 /*yield*/, tasklist.claimTask(task.id, "demo-bot human-task-completer", true)];
                                                    case 2:
                                                        claimTask = (_a.sent()).claimTask;
                                                        taskClaimed = claimTask;
                                                        taskClaimed &&
                                                            log("servicing human task ".concat(JSON.stringify(taskClaimed, null, 2)));
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        err_4 = _a.sent();
                                                        log("claimTask error ".concat(JSON.stringify(err_4, null, 2)));
                                                        console.log(err_4);
                                                        return [3 /*break*/, 4];
                                                    case 4:
                                                        _a.trys.push([4, 6, , 7]);
                                                        return [4 /*yield*/, taskClaimed];
                                                    case 5:
                                                        // console.log(`completing task for ${JSON.stringify(taskClaimed, null, 2)}`);
                                                        (_a.sent()) &&
                                                            tasklist.completeTask(taskClaimed.id, {
                                                                humanTaskStatus: "Got done",
                                                                hasCovid: "yes",
                                                                isAdult: "yes",
                                                                // hasBeenQuarantined : "no" //output will be has covid
                                                                hasBeenQuarantined: "yes" //output will be does not have covid
                                                            });
                                                        return [3 /*break*/, 7];
                                                    case 6:
                                                        error_1 = _a.sent();
                                                        log("error while checking task list complete ".concat(JSON.stringify(error_1, null, 2)));
                                                        return [3 /*break*/, 7];
                                                    case 7: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                    else {
                                        log("No human tasks found");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 3000);
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=fourth.js.map