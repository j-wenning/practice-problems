

function countOccurences(arr, val){
  var count = 0;
  for(var i = 0; i < arr.length; ++i) {
    if(arr[i] === val) {
      ++count;
    }
  }
  return count;
}

function wordLengths(arr){
  var lengths = [];
  for(var i in arr) {
    lengths.push(arr[i].length);
  }
  return lengths;
}

function getMinMaxMean(arr){
  var min, max, total = 0;
  if(arr.length > 0) {
    min = max = arr[0];
  }
  for(var i in arr) {
    if(arr[i] < min) {
      min = arr[i];
    } else if(arr[i] > max) {
      max = arr[i];
    }
    total += arr[i];
  }
  return {"min": min, "max": max, "mean": total / arr.length};
}

function findMode(arr){
  var numCheck = [[], []];
  for(var i in arr){
    if(numCheck[0].includes(arr[i])){
      numCheck[1][numCheck[0].indexOf(arr[i])]++;
    } else {
      numCheck[0].push(arr[i]);
      numCheck[1].push(1);
    }
  }
  console.log(numCheck);
  var largestCount = numCheck[1][0];
  var largestVal = numCheck[0][0];
  for(var x in numCheck[0]){
    if(numCheck[1][x] >= largestCount) {
      largestCount = numCheck[1][x];
      largestVal = numCheck[0][x];
    }
  }
  return largestVal;
}
