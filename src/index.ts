import * as fs from "fs";
import * as path from "path";
import { spawn, execSync } from "child_process";

import * as program from "commander";
import * as inquirer from "inquirer";
import * as chalk from "chalk";

import { errorLog, FILE_ERROR, INSTALL_ERROR, RUN_ERROR } from "./utils/error";
import { version } from "../package.json";
import { writeJSONFile, readJSONFile, templateEngine } from "./utils/utils";

interface pyrosJSONConfig {
  projectType: string;
  installMethod: string;
  port: number;
}

interface templateConfig {
  projectName: string;
  port: number;
  author: string;
  installNode: string;
}

const BASE_INFO_LIST = [
  {
    type: "input",
    name: "projectName",
    message: "input the name of your project",
    default: "pyrosProject"
  },
  {
    type: "input",
    name: "author",
    message: "input your name",
    default: "author"
  },
  {
    type: "list",
    name: "projectType",
    message: "please select the type of project",
    choices: [
      { name: "baseHtml", value: "baseHtml" },
      { name: "baseReact", value: "baseReact" },
      { name: "baseAngular", value: "baseAngular" },
    ]
  },
  {
    type: "list",
    name: "installMethod",
    message: "please select the method of package install",
    choices: [
      { name: "npm", value: "npm" },
      { name: "tnpm", value: "tnpm" },
      { name: "cnpm", value: "cnpm" },
      { name: "yarn", value: "yarn" },
      { name: "ayarn", value: "ayarn" }
    ]
  },
  {
    type: "input",
    name: "installNode",
    message: "please input the version of install Node",
    default: "6.9.4"
  },
  {
    type: "input",
    name: "port",
    message: "input the port of your project",
    default: 8080
  }
];

function packageInstall(method: string) {
  return new Promise((resolve, reject) => {
    // 是否是 npm 构建
    const isNpm = /npm/.test(method);
    const args = isNpm ? ["install"] : [];
    const cmd = spawn(method, args, { stdio: "inherit" });

    const errorMsg = `install by ${method} is failed`;

    cmd.on("close", code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(errorMsg));
      }
    });

    cmd.on("error", err => {
      reject(new Error(errorMsg));
    });
  });
}

/**
 * 复制模板
 * @param target 目标文件
 * @param src 源文件
 * @param options 模板选项
 */
function copyTemplate(target: string, src: string, options = {} as any) {
  // 判断 src 是否存在
  const isSrcExist = fs.existsSync(src);
  if (!isSrcExist) {
    errorLog(FILE_ERROR, `${src} is not exist!`);
  }
  // 判断 src 是文件还是文件夹
  const isSrcDirectory = fs.statSync(src).isDirectory();

  if (isSrcDirectory) {
    // 创建文件夹
    if (!fs.existsSync(target)) fs.mkdirSync(target);

    return Promise.all(
      fs.readdirSync(src).map(childPath => {
        return copyTemplate(
          path.join(target, childPath),
          path.join(src, childPath),
          options
        );
      })
    );
  }

  return new Promise((resolve, reject) => {
    fs.readFile(src, "utf8", (err, data) => {
      if (err) reject(err);
      const fileContent = templateEngine(data, options);
      fs.writeFile(target, fileContent, err => {
        if (err) reject(err);
        resolve();
      });
    });
  });
}

function getWebpackCmd(projectPath) {
  return execSync(
    `${projectPath}/node_modules/webpack-dev-server/bin/webpack-dev-server.js --config webpack.config.dev.js`,
    { stdio: "inherit" }
  );
}

function getHttpCmd(projectPath, port) {
  return execSync(
    `${projectPath}/node_modules/http-server/bin/http-server -p ${port}`,
    { stdio: "inherit" }
  );
}

async function runProject() {
  const projectPath = ROOT;
  const pyrosConfigFile = path.join(projectPath, "pyros.json");

  if (!fs.existsSync(pyrosConfigFile)) {
    errorLog(FILE_ERROR, `${pyrosConfigFile} config file is not exist`);
    process.exit(1);
  }

  const res = await readJSONFile(pyrosConfigFile);

  const { projectType, port } = res as pyrosJSONConfig;

  switch (projectType) {
    case "baseReact": {
      getWebpackCmd(projectPath);
      break;
    }
    case "baseAngular": {
      getWebpackCmd(projectPath);
      break;
    }
    case "baseHtml": {
      getHttpCmd(projectPath, port);
      break;
    }
    default:
      break;
  }
}

// 命令所执行的目录
const ROOT = process.cwd();

program.version(version);

program
  .command("create")
  .description("init your project")
  .action(async function () {
    // 基本信息
    const {
      projectType,
      installMethod,
      projectName,
      port,
      author,
      installNode
    } = await inquirer.prompt(BASE_INFO_LIST);

    const projectPath = path.join(ROOT, projectName);
    const templatePath = path.join(__dirname, `../templates/${projectType}`);
    const pyrosJSONConfig = {
      projectType,
      installMethod,
      port
    } as pyrosJSONConfig;
    const templateConfig = {
      projectName,
      port,
      author,
      installNode
    } as templateConfig;

    console.log(
      `current project: ${projectName}, path: ${projectPath}, init running...`
    );

    // 创建项目文件夹，并切换路径
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath);
    }
    process.chdir(projectPath);

    console.log(`${projectName}, config creating...`);

    const pyrosConfigFile = path.join(projectPath, "pyros.json");
    // 创建 json 配置文件
    if (!fs.existsSync(pyrosConfigFile)) {
      try {
        await writeJSONFile(pyrosConfigFile, pyrosJSONConfig);
      } catch (err) {
        errorLog(FILE_ERROR, err);
      }
    }

    console.log(`${projectName}, template creating...`);

    try {
      await copyTemplate(projectPath, templatePath, templateConfig);
    } catch (err) {
      errorLog(FILE_ERROR, err);
    }

    console.log(`${projectName}，package installing...`);

    try {
      await packageInstall(installMethod);
    } catch (err) {
      errorLog(INSTALL_ERROR, err);
    }

    console.log(
      `${projectName}，project create success and you can start project by: pyros`
    );
  });

if (process.argv.length === 2) {
  runProject();
}

program.parse(process.argv);
