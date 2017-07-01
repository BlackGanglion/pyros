"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FILE_ERROR = 1;
exports.FILE_ERROR = FILE_ERROR;
var INSTALL_ERROR = 2;
exports.INSTALL_ERROR = INSTALL_ERROR;
var codeMap = (_a = {},
    _a[FILE_ERROR] = 'file error',
    _a[INSTALL_ERROR] = 'install error',
    _a);
function errorLog(code, codeContent) {
    var errorMsg = codeMap[code] + ": " + codeContent;
    console.error(errorMsg);
    throw new Error(errorMsg);
}
exports.errorLog = errorLog;
var _a;
