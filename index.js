
function init(data) {
  let table = document.getElementById("stock");
  for (let [length, ab, ru] of data) {
    let row = table.tBodies[0].insertRow(-1);
    row.dataset["length"] = `${length}`;
    row.insertCell().innerHTML = `${length}`;
    row.insertCell().innerHTML = `<input id="ab:${length}" value="${ab}" type="number"/>`;
    row.insertCell().innerHTML = `<input id="ru:${length}" value="${ru}" type="number" />`;
  }
}

function select() {
  let items = [];
  let weights = [];
  for (let row of document.getElementById("stock").tBodies[0].rows) {
    let length = row.dataset["length"];

    items.push(["ab", length]);
    weights.push(parseInt(document.getElementById(`ab:${length}`).value));

    items.push(["ru", length]);
    weights.push(parseInt(document.getElementById(`ru:${length}`).value));
  }

  let i;

  for (i = 1; i < weights.length; i++) {
    weights[i] += weights[i - 1];
  }

  let rand = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++) {
    if (weights[i] > rand) {
      break;
    }
  }

  let [type, length] = items[i];
  document.getElementById("type").value = type;
  document.getElementById("length").value = length;
}

function accept(event) {
  let type = document.getElementById("type").value;
  let length = document.getElementById("length").value;
  let input = document.getElementById(`${type}:${length}`);
  input.value = (parseInt(input.value) - 1).toString();
  select();
}

function reject(event) {
  select();
}

init([
  [350, 10, 0],
  [400, 10, 0],
  [450, 20, 0],
  [500, 30, 0],
  [550, 100, 90],
  [600, 0, 50],
  [750, 10, 0],
  [800, 10, 0],
  [950, 40, 0],
  [1000, 0, 50],
  [1050, 0, 30],
]);

select();