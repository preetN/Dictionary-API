const apiEP = "https://opentdb.com/api.php?amount=10";
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
let url = "";
document.getElementById("formq").addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("type").value;
  if (category === "a") {
    url = `${apiEP}&category=9`;
    fetchUser(url);
  } else if (category === "b") {
    url = `${apiEP}&category=11`;
    fetchUser(url);
  } else if (category === "c") {
    url = `${apiEP}&category=17`;
    fetchUser(url);
  } else if (category === "d") {
    url = `${apiEP}&category=20`;
    fetchUser(url);
  } else if (category === "e") {
    url = `${apiEP}&category=23`;
    fetchUser(url);
  } else if (category === "f") {
    url = `${apiEP}&category=27`;
    fetchUser(url);
  }
});
const display = (list) => {
  var str = "";
  list.map((item, index) => {
    if (item.type === "boolean") {
      str += `<p style="font-weight:bold"><span>Question ${index + 1}: </span>${
        item.question
      }</p>
      <div style="font-size:10px" class="d-flex justify-content-evenly" ><p>${
        item.difficulty
      }</p>
      <p >${item.type}</p></div>
      <p> Choose correct answer:</p>
      <input type="radio" id="ans1" name="ans" value="t">
      <label for="ans1">True</label><br> 
      <input type="radio" id="ans2" name="ans" value="f">
      <label for="ans2">False</label><br> 
      <p name="check"></p>
      <button class="btn btn-dark" onclick="show_Ans('${
        item.correct_answer
      }', ${index})">Show answer</button>
      <hr/> `;
    } else {
      var arr = item.incorrect_answers;
      var arr = [...arr, item.correct_answer];
      var len = arr.length;
      for (let i = len - 1; i > 0; i--) {
        let ranpos = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[ranpos];
        arr[ranpos] = temp;
      }
      str += `<p style="font-weight:bold"><span>Question ${index + 1}: </span>${
        item.question
      }</p>
      <div style="font-size:10px" class="d-flex justify-content-evenly" ><p>${
        item.difficulty
      }</p>
      <p >${item.type}</p></div>
      <p> Choose correct answer:</p>
      <input type="radio" id="ans1" name="ans" value="">
      <label for="ans1">${arr[0]}</label><br> 
      <input type="radio" id="ans2" name="ans" value="">
      <label for="ans2">${arr[1]}</label><br>  
      <input type="radio" id="ans3" name="ans" value="">
      <label for="ans3">${arr[2]}</label><br>
      <input type="radio" id="ans4" name="ans" value="">
      <label for="ans4">${arr[3]}</label><br>
      <p name="check"></p>
      <button class="btn btn-dark" onclick='show_Ans("${
        item.correct_answer
      }", ${index})' ondblclick="hide_Ans(${index})">Show answer</button>
      <hr/>`;
    }
  });
  document.getElementById("show").innerHTML = str;
};
const show_Ans = (a, index) => {
  document.getElementsByName("check")[index].innerHTML = a;
};
const hide_Ans = (index) => {
  document.getElementsByName("check")[index].style.display = "none";
};
