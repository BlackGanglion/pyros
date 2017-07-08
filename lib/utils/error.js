"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FILE_ERROR = 1;
exports.FILE_ERROR = FILE_ERROR;
var INSTALL_ERROR = 2;
exports.INSTALL_ERROR = INSTALL_ERROR;
var RUN_ERROR = 3;
exports.RUN_ERROR = RUN_ERROR;
var codeMap = (_a = {},
    _a[FILE_ERROR] = 'file error',
    _a[INSTALL_ERROR] = 'install error',
    _a[RUN_ERROR] = 'run error',
    _a);
function errorLog(code, codeContent) {
    var errorMsg = codeMap[code] + ": " + codeContent;
    console.error(errorMsg);
}
exports.errorLog = errorLog;
var _a;
