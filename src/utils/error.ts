const FILE_ERROR = 1;
const INSTALL_ERROR = 2;

const codeMap = {
  [FILE_ERROR]: 'file error', // 文件不存在，创建失败，复制失败
  [INSTALL_ERROR]: 'install error', // 安装失败
}

function errorLog(code, codeContent) {
  const errorMsg = `${codeMap[code]}: ${codeContent}`;
  console.error(errorMsg);
}

export {
  errorLog,
  FILE_ERROR,
  INSTALL_ERROR,
}