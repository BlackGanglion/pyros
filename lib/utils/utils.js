"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 工具函数
 */
var jsonfile = require("jsonfile");
/**
 * 写入 JSON 文件
 * @param path
 * @param content
 */
function writeJSONFile(path, content) {
    return new Promise(function (resolve, reject) {
        jsonfile.writeFile(path, content, { spaces: 2 }, function (err) {
            if (err)
                reject(err);
            resolve();
        });
    });
}
exports.writeJSONFile = writeJSONFile;
/**
 * 基于 nano 的模板引擎
 * @param template
 * @param data
 */
function templateEngine(template, data) {
    return template.replace(/\$\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split(".");
        var v = data[keys.shift()];
        for (var i = 0, l = keys.length; i < l; i++)
            v = v[keys[i]];
        return typeof v !== "undefined" && v !== null ? v : "";
    });
}
exports.templateEngine = templateEngine;
