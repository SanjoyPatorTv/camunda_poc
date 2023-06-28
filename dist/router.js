"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var service_1 = require("./handlers/service");
var process_1 = require("./handlers/process");
var task_1 = require("./handlers/task");
var router = (0, express_1.Router)();
/**
 * health check
 */
router.get("/health", service_1.healthCheck);
/**
 * process
 */
//deploy a process model with  a bpmn -  (POST) - {bpmnFileName}
router.post("/process/deploy", (0, express_validator_1.body)("bpmnFileName").exists().isString(), middleware_1.handleInputErrors, process_1.deployProcess);
// Create a new process instance - (POST) - {bpmnProcessId, optional:  initialVariables }
router.post("/process/create", (0, express_validator_1.body)("bpmnProcessId").exists().isString(), (0, express_validator_1.body)("initialVariables").exists().isObject(), (0, express_validator_1.body)("versionId").optional().isString(), middleware_1.handleInputErrors, process_1.createProcess);
// get the XML diagram of the process - (POST) -  { processDefinitionKey }
router.get("/process/xml/:processDefinitionKey", middleware_1.handleInputErrors, process_1.getProcessDefinitionXML);
/**
 * tasks
 */
//get all task list (GET) - no params,
router.get("/task", task_1.getAllTasks);
//get a task by id (GET) - id params,
router.get("/task/:id", task_1.getAllTasks);
// claim a task with task id (POST) - { taskId, assigneeName }
router.post("/task/claim", (0, express_validator_1.body)("taskId").exists().isString(), (0, express_validator_1.body)("assigneeName").exists().isString(), middleware_1.handleInputErrors, task_1.claimTask);
// complete a task and provide variables (POST) - { taskId, taskVariables : optional }
router.post("/task/complete", (0, express_validator_1.body)("taskId").exists().isString(), (0, express_validator_1.body)("taskVariables").exists().isObject(), middleware_1.handleInputErrors, task_1.completeTask);
/**
 * service
 */
router.post("/service/restapi", (0, express_validator_1.body)("resVariables").exists().isObject(), middleware_1.handleInputErrors, service_1.serviceRestApiPost);
/**
 * Update
 */
// router.get("/update", getUpdates);
// router.get("/update/:id", getOneUpdate);
// //isIn for enum validation
// router.put('/update/:id', 
//   body('title').optional(),
//   body('body').optional(),
//   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
//   body('version').optional(),
//   updateUpdate
// )
// router.post(
//   "/update",
//   body("title").exists().isString(),
//   body("body").exists().isString(),
//   body('productId').exists().isString(),
//   createUpdate
// );
// router.delete("/update/:id", deleteUpdate);
// /**
//  * UpdatePoint
//  */
// router.get("/updatepoint", (req, res) => {});
// router.get("/updatepoint/:id", (req, res) => {});
// router.put(
//   "/updatepoint/:id",
//   body("name").optional().isString(),
//   body("description").optional().isString(),
//   (req, res) => {}
// );
// router.post(
//   "/updatepoint",
//   body("name").isString(),
//   body("description").isString(),
//   body("updateId").exists().isString(),
//   (req, res) => {}
// );
// router.delete("/updatepoint/:id", (req, res) => {});
router.use(function (err, req, res, next) {
    console.log(err);
    res.json({ message: 'error in router handler' });
});
exports["default"] = router;
//# sourceMappingURL=router.js.map