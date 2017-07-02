"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
var program = require("commander");
var inquirer = require("inquirer");
var error_1 = require("./utils/error");
var package_json_1 = require("../package.json");
var utils_1 = require("./utils/utils");
var INPUTLIST = [
    {
        type: "list",
        name: "projectType",
        message: "please select the type of project",
        choices: [
            { name: "baseReact", value: "baseReact" },
            { name: "baseAngular", value: "baseAngular" }
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
        name: "author",
        message: "input your name",
        default: "author"
    },
    {
        type: "input",
        name: "projectName",
        message: "input the name of your project",
        default: "pyrosProject"
    },
    {
        type: "input",
        name: "port",
        message: "input the port of your project",
        default: 8080
    }
];
function packageInstall(method) {
    return new Promise(function (resolve, reject) {
        // 是否是 npm 构建
        var isNpm = /npm/.test(method);
        var args = isNpm ? ["install"] : [];
        var cmd = child_process_1.spawn(method, args, { stdio: "inherit" });
        var errorMsg = "install by " + method + " is failed";
        cmd.on("close", function (code) {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(errorMsg));
            }
        });
        cmd.on("error", function (err) {
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
function copyTemplate(target, src, options) {
    if (options === void 0) { options = {}; }
    // 判断 src 是否存在
    var isSrcExist = fs.existsSync(src);
    if (!isSrcExist) {
        error_1.errorLog(error_1.FILE_ERROR, src + " is not exist!");
    }
    // 判断 src 是文件还是文件夹
    var isSrcDirectory = fs.statSync(src).isDirectory();
    if (isSrcDirectory) {
        // 创建文件夹
        if (!fs.existsSync(target))
            fs.mkdirSync(target);
        return Promise.all(fs.readdirSync(src).map(function (childPath) {
            return copyTemplate(path.join(target, childPath), path.join(src, childPath), options);
        }));
    }
    return new Promise(function (resolve, reject) {
        fs.readFile(src, "utf8", function (err, data) {
            if (err)
                reject(err);
            var fileContent = utils_1.templateEngine(data, options);
            fs.writeFile(target, fileContent, function (err) {
                if (err)
                    reject(err);
                resolve();
            });
        });
    });
}
function getWebpackCmd(projectPath) {
    return child_process_1.execSync(projectPath + "/node_modules/webpack-dev-server/bin/webpack-dev-server.js --config webpack.config.dev.js", { stdio: "inherit" });
}
function runProject() {
    return __awaiter(this, void 0, void 0, function () {
        var projectPath, pyrosConfigFile, res, projectType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectPath = ROOT;
                    pyrosConfigFile = path.join(projectPath, "pyros.json");
                    if (!fs.existsSync(pyrosConfigFile)) {
                        error_1.errorLog(error_1.FILE_ERROR, pyrosConfigFile + " config file is not exist");
                        process.exit(1);
                    }
                    return [4 /*yield*/, utils_1.readJSONFile(pyrosConfigFile)];
                case 1:
                    res = _a.sent();
                    projectType = res.projectType;
                    switch (projectType) {
                        case "baseReact": {
                            getWebpackCmd(projectPath);
                            break;
                        }
                        case "baseAngular": {
                            getWebpackCmd(projectPath);
                            break;
                        }
                        default:
                            break;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// 命令所执行的目录
var ROOT = process.cwd();
program.version(package_json_1.version);
program
    .command("create")
    .description("init your project")
    .action(function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectType, installMethod, projectName, port, author, installNode, projectPath, templatePath, pyrosJSONConfig, templateConfig, pyrosConfigFile, err_1, err_2, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer.prompt(INPUTLIST)];
                case 1:
                    _a = _b.sent(), projectType = _a.projectType, installMethod = _a.installMethod, projectName = _a.projectName, port = _a.port, author = _a.author, installNode = _a.installNode;
                    projectPath = path.join(ROOT, projectName);
                    templatePath = path.join(__dirname, "../templates/" + projectType);
                    pyrosJSONConfig = {
                        projectType: projectType,
                        installMethod: installMethod
                    };
                    templateConfig = {
                        projectName: projectName,
                        port: port,
                        author: author,
                        installNode: installNode
                    };
                    console.log("current project: " + projectName + ", path: " + projectPath + ", init running...");
                    // 创建项目文件夹，并切换路径
                    if (!fs.existsSync(projectPath)) {
                        fs.mkdirSync(projectPath);
                    }
                    process.chdir(projectPath);
                    console.log(projectName + ", config creating...");
                    pyrosConfigFile = path.join(projectPath, "pyros.json");
                    if (!!fs.existsSync(pyrosConfigFile)) return [3 /*break*/, 5];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, utils_1.writeJSONFile(pyrosConfigFile, pyrosJSONConfig)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _b.sent();
                    error_1.errorLog(error_1.FILE_ERROR, err_1);
                    return [3 /*break*/, 5];
                case 5:
                    console.log(projectName + ", template creating...");
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, copyTemplate(projectPath, templatePath, templateConfig)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    err_2 = _b.sent();
                    error_1.errorLog(error_1.FILE_ERROR, err_2);
                    return [3 /*break*/, 9];
                case 9:
                    console.log(projectName + "\uFF0Cpackage installing...");
                    _b.label = 10;
                case 10:
                    _b.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, packageInstall(installMethod)];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 12:
                    err_3 = _b.sent();
                    error_1.errorLog(error_1.INSTALL_ERROR, err_3);
                    return [3 /*break*/, 13];
                case 13:
                    console.log(projectName + "\uFF0Cproject create success and you can start project by: pyros");
                    return [2 /*return*/];
            }
        });
    });
});
if (process.argv.length === 2) {
    runProject();
}
program.parse(process.argv);
