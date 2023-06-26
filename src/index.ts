import { C8, Tasklist } from "camunda-8-sdk";

import chalk from "chalk";
import * as path from "path";
import { config } from "dotenv";
config();

const zbc = new C8.ZBClient();
const operate = new C8.OperateApiClient();
const optimize = new C8.OptimizeApiClient(); // unused
const tasklist = new C8.TasklistApiClient();
import { join } from "path";

const getLogger = (prefix: string, color: chalk.Chalk) => (msg: string) =>
  console.log(color(`[${prefix}] ${msg}`));

async function main() {
  const log = getLogger("Zeebe", chalk.greenBright);

  // deploy a process with  a bpmn
  // try{
  //   const res = await zbc.deployProcess(
  //     path.join(process.cwd(), 'bpmn', 'c8-sdk-third.bpmn')
  //   );
  //   log(`Deployed process ${JSON.stringify(res, null, 2)}`);

  // }catch(err){
  //   log(`Deploy failed: ${err}`);
  // }

  // start a new process
  try {
    const p = await zbc.createProcessInstance({
      bpmnProcessId: "c8-sdk-third",
      variables: {
        patientId: "p-100",
      },
    });

    log(`Process creation p = ${JSON.stringify(p, null, 2)}`);

    //get XML file
    const bpmn = await operate.getProcessDefinitionXML(
      parseInt(p.processDefinitionKey, 10)
    );
    log(chalk.redBright("\n[Operate] BPMN XML:", bpmn));
  } catch (err) {
    log(`Process creation failed :  ${JSON.stringify(err, null, 2)}`);
  }
}

main();
