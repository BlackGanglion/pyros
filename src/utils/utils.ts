/**
 * 工具函数
 */
import * as jsonfile from 'jsonfile';

/**
 * 写入 json 文件
 * @param path 
 * @param content 
 */
function writeJSONFile(path, content) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(path, content, {spaces: 2}, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

/**
 * 读取 json 文件
 * @param path 
 */
function readJSONFile(path) {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(path, function (err, obj) {
      if (err) reject(err);
      resolve(obj);
    });
  });
}

/**
 * 基于 nano 的模板引擎
 * @param template 
 * @param data 
 */
function templateEngine(template: string, data: any) {
  return template.replace(/\$\{([\w\.]*)\}/g, function (str, key) {
    const keys = key.split(".");
    let v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return typeof v !== "undefined" && v !== null ? v : "";
  });
}

export {
  writeJSONFile,
  readJSONFile,
  templateEngine,
}