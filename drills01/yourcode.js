
function sumArray(arr){
  var total = 0;
  for(var i = 0; i < arr.length; ++i) {
    total += arr[i];
  }
  return total;
}

function fitWithinVal(arr, val){
  var indexes = [];
  var total = 0;
  for(var i = 0; i < arr.length; ++i){
    if(total + arr[i] <= val) {
      total += arr[i];
      indexes.push(arr[i]);
    }
  }
  return indexes;
}

function getAllNamesShorterThan(arr, val){
  var indexes = [];
  for(var i = 0; i < arr.length; ++i) {
    if(arr[i].length < val) {
      indexes.push(arr[i]);
    }
  }
  return indexes;
}

function makeLabel(obj){
  return obj.greeting + " " + obj.givenName + " " + obj.familyName
    + "\n" + obj["home address"].streetNumber + " " + obj["home address"].streetName
    + "\n" + obj["home address"].city + ", " + obj["home address"].state + " " + obj["home address"].zip;
}
