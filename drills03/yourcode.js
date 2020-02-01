

function getPath(str){
  return str.split("/");
}

function getPathParts(str){
  const newStr = str.split(/\/+/);
  return {
    protocol : newStr[1].split(":").shift(),
    host : newStr[1].split(":").shift(),
    port : newStr[1].split(":").pop(),
    path : "",
    file : newStr.pop(),
  };
}

function getCapitalCount(){

}

function correctCalcChecker(){

}

function doMath(){

}
