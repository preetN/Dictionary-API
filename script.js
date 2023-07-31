const apiEP = "https://opentdb.com/api.php?amount=50";
let meaningList = [];
let count = 1;
const fetchUser = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    meaningList = data.results;
    console.log("Api here");
    display(meaningList);
  } catch (error) {
    console.log(error);
  }
};

const display = (list) => {
  var str = "";
  console.log(meaningList);
  list.map((item) => {
    var a = item.correct_answer;
    str += `Question ${count++}:${item.type}<h1>${item.question}</h1>
    <div class="d-flex justify-content-between"><span>${
      item.category
    }</span><span>${item.difficulty}</span></div>
    <button onclick="correct_answer(${item.type})">Show Answer</button>
    <p id="show_answer"></p>
    <p>${a}</p>
    <hr>`;
  });
  document.getElementById("show").innerHTML = str;
};
const correct_answer = (type) => {
  document.getElementById("show_answer").innerHTML = type;
};
fetchUser(apiEP);
