

function getPath(str){
  return str.split("/");
}

function getPathParts(str){
  const [protocol, host, port, ...path] = str.split(/[/:]+/);
  const file = path.pop();
  return {
    protocol : protocol,
    host : host,
    port : Number(port),
    path : path.join("/"),
    file : file,
  };
}

function getCapitalCount(arr){
  return arr.filter(a=>/\b[A-Z]/.test(a)).length;
}

function correctCalcChecker(arr){
  return arr.filter(a=>{
    const {num1, num2, op, result} = a;
    return doMath(num1, num2, op) === result;
  });
}

function doMath(num1, num2, operator){
  switch(operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return "invalid operation";
  }
}
