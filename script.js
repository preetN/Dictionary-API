const apiEP = "https://opentdb.com/api.php?amount=10";
let meaningList = [];
let url = "";
// to fetch data from api
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
// adding event listener on welcome form to get questions of choosen category.
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
//This function is responsible for displaying the quiz questions
const display = (list) => {
  var str = "";
  document.getElementById("quiz").style.display = "block";
  const form = document.getElementById("main-cont");
  form.style.visibility = "hidden";
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
      <input type="radio" id="ans1${index}" name="ans${index}" value="True">
      <label for="ans1${index}">True</label><br> 
      <input type="radio" id="ans2${index}" name="ans${index}" value="False">
      <label for="ans2${index}">False</label><br> 
      <p name="check"></p>
      <button class="btn btn-dark" onclick="show_Ans('${
        item.correct_answer
      }', ${index})" ondblclick="hide_Ans(${index})">Show answer</button>
      <hr/> `;
    } else {
      var arr = item.incorrect_answers;
      var arr = [...arr, item.correct_answer];
      var len = arr.length;
      // This loop is to shuffle the options
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
      <input type="radio" id="ans1${index}" name="ans${index}" value="${
        arr[0]
      }">
      <label for="ans1${index}">${arr[0]}</label><br> 
      <input type="radio" id="ans2${index}" name="ans${index}" value="${
        arr[1]
      }}">
      <label for="ans2${index}">${arr[1]}</label><br>  
      <input type="radio" id="ans3${index}" name="ans${index}" value="${
        arr[2]
      }">
      <label for="ans3${index}">${arr[2]}</label><br>
      <input type="radio" id="ans4${index}" name="ans${index}" value="${
        arr[3]
      }">
      <label for="ans4${index}">${arr[3]}</label><br>
      <p name="check"></p>
      <button class="btn btn-dark" onclick='show_Ans("${
        item.correct_answer
      }", ${index})' ondblclick="hide_Ans(${index})">Show answer</button>
      <hr/>`;
    }
  });
  document.getElementById("show").innerHTML = str;
};
//This function is responsible for displaying correct answer
const show_Ans = (a, index) => {
  document.getElementsByName("check")[index].style.display = "block";
  document.getElementsByName("check")[index].innerHTML = a;
};
//This function is responsible for hiding the correct answer
const hide_Ans = (index) => {
  document.getElementsByName("check")[index].style.display = "none";
};
//This function is responsible for checking answers wether correct or incorrect.
document.getElementById("check_answers").addEventListener("submit", (e) => {
  e.preventDefault();
  var choosen_Ans = [];
  var sel_Ans = [];
  let count = 1;
  //taking out the selected answer from the radio type input
  for (let i = 0; i < 10; i++) {
    choosen_Ans[i] = document.getElementsByName(`ans${i}`);
    const a = choosen_Ans[i];
    for (let j = 0; j < a.length; j++) {
      if (a[j].checked) {
        sel_Ans[i] = a[j].value;
      }
    }
  }
  //compairing the selected and correct answers if they match or not
  meaningList.map((item, index) => {
    if (item.correct_answer === sel_Ans[index]) {
      count++;
    }
  });
  const form = document.getElementById("check_answers");
  form.style.display = "none";
  var score = `<div style="height:80vh" class="d-flex flex-column justify-content-center align-items-center"><h1>Your scores are ${count}</h1>
  <h4>Correct answers: ${count}</h4>
  <h4>Incorrect answers: ${10 - count}</h4>
 <a href="./index.html"><button class="btn btn-dark">Start new quiz</button></a>
 </div>
  `;
  document.getElementById("score").innerHTML = score;
});
