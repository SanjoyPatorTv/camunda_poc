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
exports.getProcessDefinitionXML = exports.createProcess = exports.deployProcess = void 0;
var camunda_8_sdk_1 = require("camunda-8-sdk");
var chalk_1 = __importDefault(require("chalk"));
var path = __importStar(require("path"));
var zbc = new camunda_8_sdk_1.C8.ZBClient();
var operate = new camunda_8_sdk_1.C8.OperateApiClient();
var optimize = new camunda_8_sdk_1.C8.OptimizeApiClient(); // unused
var tasklist = new camunda_8_sdk_1.C8.TasklistApiClient();
var getLogger = function (prefix, color) { return function (msg) {
    return console.log(color("[".concat(prefix, "] ").concat(msg)));
}; };
var log = getLogger("Process handler : ", chalk_1["default"].greenBright);
// deploy a process model with  a bpmn -  (POST) - {bpmnFileName}
var deployProcess = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bpmnFileName, deployedProcessRes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bpmnFileName = req.body.bpmnFileName;
                log("Deploying process with bpmn : ".concat(bpmnFileName));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, zbc.deployProcess(path.join(process.cwd(), "bpmn", bpmnFileName))];
            case 2:
                deployedProcessRes = _a.sent();
                log("Deployed process successfully ".concat(JSON.stringify(deployedProcessRes, null, 2)));
                //same as res.json({token : token})
                res.json({ deployedProcessRes: deployedProcessRes });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                error_1.type = "process-error";
                log("Deploy failed : ".concat(error_1));
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deployProcess = deployProcess;
// Create a new process instance - (POST) - {bpmnProcessId, optional:  initialVariables }
var createProcess = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bpmnProcessId, initialVariables, createProcessObj, createProcessRes, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bpmnProcessId = req.body.bpmnProcessId;
                initialVariables = req.body.initialVariables;
                createProcessObj = {
                    bpmnProcessId: bpmnProcessId,
                    variables: initialVariables
                };
                // if versionId is present in req.body
                // add it to createProcessObj
                if ("versionId" in req.body) {
                    createProcessObj.version = req.body.versionId;
                }
                log("creating process with ".concat(createProcessObj));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, zbc.createProcessInstance(createProcessObj)];
            case 2:
                createProcessRes = _a.sent();
                log("Create Process Res = ".concat(JSON.stringify(createProcessRes, null, 2)));
                //same as res.json({token : token})
                res.json({ createProcessRes: createProcessRes });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                error_2.type = "process-error";
                log("Create Process failed :  ".concat(JSON.stringify(error_2, null, 2)));
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createProcess = createProcess;
// get the XML diagram of the process - (POST) -  { processDefinitionKey }
var getProcessDefinitionXML = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var processDefinitionKey, processDefinitionXMLRes, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                processDefinitionKey = req.params.processDefinitionKey;
                log("Getting Process Definition XML with ".concat(processDefinitionKey));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, operate.getProcessDefinitionXML(parseInt(processDefinitionKey, 10))];
            case 2:
                processDefinitionXMLRes = _a.sent();
                log(chalk_1["default"].redBright("\n[Operate] BPMN XML:", processDefinitionXMLRes));
                //same as res.json({token : token})
                res.json({ processDefinitionXMLRes: processDefinitionXMLRes });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                error_3.type = "process-error";
                log("Get Process Definition XML failed :  ".concat(JSON.stringify(error_3, null, 2)));
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProcessDefinitionXML = getProcessDefinitionXML;
//# sourceMappingURL=process.js.map