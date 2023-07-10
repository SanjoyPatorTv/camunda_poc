import { C8, Tasklist } from "camunda-8-sdk";
import { createProcessObjModel } from "../models/bpmnModel";
import chalk from "chalk";
import * as path from "path";
const zbc = new C8.ZBClient();
const operate = new C8.OperateApiClient();
const optimize = new C8.OptimizeApiClient(); // unused
const tasklist = new C8.TasklistApiClient();
import { join } from "path";

const getLogger = (prefix: string, color: chalk.Chalk) => (msg: string) =>
  console.log(color(`[${prefix}] ${msg}`));
const log = getLogger("Process handler : ", chalk.greenBright);

// get the XML diagram of the process - (GET) -  { processDefinitionKey }
export const getProcessDefinitionXML = async (req, res, next) => {
  const processDefinitionKey = req.params.processDefinitionKey;

  log(`Getting Process Definition XML with ${processDefinitionKey}`);

  try {
    const processDefinitionXMLRes = await operate.getProcessDefinitionXML(
      parseInt(processDefinitionKey, 10)
    );
    log(chalk.redBright("\n[Operate] BPMN XML:", processDefinitionXMLRes));
    //same as res.json({token : token})
    res.json({ processDefinitionXMLRes });
  } catch (error: any) {
    error.type = "operate-error";
    log(
      `Get Process Definition XML failed :  ${JSON.stringify(error, null, 2)}`
    );
    next(error);
  }
};

// get the process instances details- (GET) -  { processDefinitionKey }
export const getAllProcessInstancesDetails = async (req, res, next) => {

  log(`Getting all Process Instances details`);

  try {
    const processInstancesRes = await operate.searchProcessInstances({
      filter: {
        state: "ACTIVE",
      },
      size: 50,
    });
    log(chalk.redBright("\n[Operate] BPMN XML:", processInstancesRes));
    //same as res.json({token : token})
    res.json({ processInstancesRes });
  } catch (error: any) {
    error.type = "operate-error";
    log(
      `Get all Process Instances details failed :  ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
    next(error);
  }
};

// get the process instances details- (GET) -  { key }
export const getProcessInstancesDetails = async (req, res, next) => {
  const key = req.params.key;

  log(`Getting process Instances details with ${key}`);

  try {
    const flowNodeInstance = await operate.getProcessInstance(key);
    log(chalk.redBright("\n[Operate] BPMN XML:", flowNodeInstance));
    //same as res.json({token : token})
    res.json({ flowNodeInstance });
  } catch (error: any) {
    error.type = "operate-error";
    log(
      `Get process Instances details failed :  ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
    next(error);
  }
};

// get the process instance statistics details- (GET) -  { key }
export const getProcessInstanceStatistics = async (req, res, next) => {
  const key = req.params.key;

  log(`Getting process Instance statistics with ${key}`);

  try {
    const result = await operate.getProcessInstanceStatistics(key);
    log(chalk.redBright("\n[Operate] BPMN XML:", result));
    //same as res.json({token : token})
    res.json({ result });
  } catch (error: any) {
    error.type = "operate-error";
    log(
      `Get  process Instance statistics failed :  ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
    next(error);
  }
};

// get Variables for Process- (GET) -  { key }
export const getVariablesForProcess = async (req, res, next) => {
  const key = req.params.key;

  log(`Getting Variables for Process with ${key}`);

  try {
    const result = await operate.getVariablesforProcess(key);
    log(chalk.redBright("\n[Operate] BPMN XML:", result));
    //same as res.json({token : token})
    res.json({ result });
  } catch (error: any) {
    error.type = "operate-error";
    log(
      `Get Variables for Process failed :  ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
    next(error);
  }
};

// get Process Instance Sequence Flows- (GET) -  { key }
export const getProcessInstanceSequenceFlows = async (req, res, next) => {
  const key = req.params.key;

  log(`Getting Process Instance Sequence with ${key}`);

  try {
    const result = await operate.getProcessInstanceSequenceFlows(key);
    log(chalk.redBright("\n[Operate] BPMN XML:", result));
    //same as res.json({token : token})
    res.json({ result });
  } catch (error: any) {
    error.type = "operate-error";
    log(
      `Get Process Instance Sequence failed :  ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
    next(error);
  }
};

// get the flow node instances details- (GET) -  { key }
export const getFlowNodeInstance = async (req, res, next) => {
  const key = req.params.key;

  log(`Getting flow node Instances details with ${key}`);

  try {
    const flowNodeInstance = await operate.getFlownodeInstance(key);
    log(chalk.redBright("\n[Operate] BPMN XML:", flowNodeInstance));
    //same as res.json({token : token})
    res.json({ flowNodeInstance });
  } catch (error: any) {
    error.type = "operate-error";
    log(
      `Get Flow node Instances details failed :  ${JSON.stringify(
        error,
        null,
        2
      )}`
    );
    next(error);
  }
};
