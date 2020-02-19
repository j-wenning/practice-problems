
function sumArray(arr){
	return arr.reduce((a, b) => a + b);
}

function fitWithinVal(arr, val){
  const nums = [];
  let total = 0;
  for(let i = 0; i < arr.length; ++i)
    if(arr[i] + total <= val) {
      nums.push(arr[i]);
      total += arr[i];
    }
  return nums;
}

function getAllNamesShorterThan(arr, val){
  return arr.filter(a=> a.length < val);
}

function makeLabel(obj){
  const {
    familyName,
    givenName,
    greeting,
    "home address":{
      streetNumber,
      streetName,
      state,
      zip,
      city
    }
  } = obj;
  return `${greeting} ${givenName} ${familyName}\n${streetNumber} ${streetName}\n${city}, ${state} ${zip}`;
}
