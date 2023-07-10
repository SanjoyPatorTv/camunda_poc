import { Router } from "express";
import { body, oneOf } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { healthCheck, serviceRestApiPost } from "./handlers/service";
import { createProcess, deployProcess } from "./handlers/process";
import { claimTask, completeTask, getAllTasks } from "./handlers/task";
import { getAllProcessInstancesDetails, getFlowNodeInstance, getProcessDefinitionXML, getProcessInstanceSequenceFlows, getProcessInstanceStatistics, getProcessInstancesDetails, getVariablesForProcess } from "./handlers/operate";

const router = Router();

/**
 * health check
 */

router.get("/health", healthCheck);

/**
 * process
 */

//deploy a process model with  a bpmn -  (POST) - {bpmnFileName}
router.post(
  "/process/deploy",
  body("bpmnFileName").exists().isString(),
  handleInputErrors,
  deployProcess
);

// Create a new process instance - (POST) - {bpmnProcessId, optional:  initialVariables }
router.post(
  "/process/create",
  body("bpmnProcessId").exists().isString(),
  body("initialVariables").exists().isObject(),
  body("versionId").optional().isString(),
  handleInputErrors,
  createProcess,
);

/**
 * operate
 */

// get the XML diagram of the process - (POST) -  { processDefinitionKey }
router.get(
  "/operate/xml/:processDefinitionKey",
  handleInputErrors,
  getProcessDefinitionXML,
);

// get all process instances details- (GET) -  {  }
router.get(
  "/operate/processes",
  handleInputErrors,
  getAllProcessInstancesDetails,
);

// get the process instances details- (GET) -  { key }
router.get(
  "/operate/process/:key",
  handleInputErrors,
  getProcessInstancesDetails,
);

// get the flow node instances details- (GET) -  { key }
router.get(
  "/operate/nodes/:key",
  handleInputErrors,
  getFlowNodeInstance,
);

// get the process instance statistics details- (GET) -  { key }
router.get(
  "/operate/processstats/:key",
  handleInputErrors,
  getProcessInstanceStatistics,
);

// get Variables for Process- (GET) -  { key }
router.get(
  "/operate/variables/:key",
  handleInputErrors,
  getVariablesForProcess,
);

// get Process Instance Sequence Flows- (GET) -  { key }
router.get(
  "/operate/sequenceflows/:key",
  handleInputErrors,
  getProcessInstanceSequenceFlows,
);



/**
 * tasks
 */

//get all task list (GET) - no params,
router.get("/task", getAllTasks);

//get a task by id (GET) - id params,
router.get("/task/:id", getAllTasks);

// claim a task with task id (POST) - { taskId, assigneeName }
router.post(
  "/task/claim",
  body("taskId").exists().isString(),
  body("assigneeName").exists().isString(),
  handleInputErrors,
  claimTask
);

// complete a task and provide variables (POST) - { taskId, taskVariables : optional }
router.post(
  "/task/complete",
  body("taskId").exists().isString(),
  body("taskVariables").exists().isObject(),
  handleInputErrors,
  completeTask
);

/**
 * service
 */

router.post(
  "/service/restapi",
  // body("resVariables").exists().isObject(),
  // handleInputErrors,
  serviceRestApiPost
);


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

router.use((err, req, res, next)=>{
  console.log(err);
  res.json({message: 'error in router handler'})
})

export default router;