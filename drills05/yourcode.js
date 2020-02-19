function populateRecords(arr){
  const [...recs] = arr;
  const testArea = document.querySelector("#testArea");
  const testOutput = testArea.appendChild(document.createElement("div"));
  testOutput.classList.add("testOutput");
  displayChAdv({type:"type", source:"source", amount:"amount"});
  return recs.reduce((a, b) => getChAdv(a, b));
}

function getChAdv(acc, val) {
  let { type, amount, charge, "cash advance":advance } = acc;
  let obj;
  if(type) {
    if(type === "charge") {
      charge = Number(amount);
      advance = 0;
    }
    else {
      charge = 0
      advance = Number(amount);
    }
    displayChAdv(acc);
  }
  ({ type, amount} = val);
  if(type === "charge")
    obj = { charge:charge += Number(amount), "cash advance":advance};
  else
    obj = { charge: charge, "cash advance": advance += Number(amount) };
  displayChAdv(val);
  return obj;
}

function displayChAdv(obj) {
  const {type, amount, source} = obj;
  const output = document.querySelectorAll(".testOutput")
  let currentElem;

  currentElem = output[output.length - 1].appendChild(document.createElement("div"));
  currentElem.classList.add("transactionRecord");
  currentElem = currentElem.appendChild(document.createElement("div"));
  currentElem.classList.add("transactionType");
  currentElem.textContent = type;
  currentElem = currentElem.parentElement.appendChild(document.createElement("div"));
  currentElem.classList.add("transactionLocation");
  currentElem.textContent = source;
  currentElem = currentElem.parentElement.appendChild(document.createElement("div"));
  currentElem.classList.add("transactionAmount");
  currentElem.textContent = amount;
}
