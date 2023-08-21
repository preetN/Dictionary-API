const apiEP = "https://opentdb.com/api.php?amount=10";
let meaningList = [];
let url = "";
let intervalId;
//Timer seconds
var count = 100;
// to fetch data from api
const fetchUser = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    meaningList = data.results;
    display(meaningList);
    display_practise(meaningList);
  } catch (error) {
    console.log(error);
  }
};
// adding event listener on welcome form to get questions of choosen category.
document.getElementById("formq").addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("type").value;
  const difficulty = document.getElementById("level").value;
  if (category === "a") {
    url = `${apiEP}&category=9`;
  } else if (category === "b") {
    url = `${apiEP}&category=11`;
  } else if (category === "c") {
    url = `${apiEP}&category=17`;
  } else if (category === "d") {
    url = `${apiEP}&category=20`;
  } else if (category === "e") {
    url = `${apiEP}&category=23`;
  } else if (category === "f") {
    url = `${apiEP}&category=27`;
  }
  if (difficulty === "hard") {
    url = `${url}&difficulty=hard`;
  } else if (difficulty === "medium") {
    url = `${url}&difficulty=medium`;
  } else {
    url = `${url}&difficulty=easy`;
  }
  fetchUser(url);
});
//To display questions
const disp_questions = (item, index) => {
  var str = "";
  if (item.type === "boolean") {
    str += `<div  style="font-weight:bold"><span>Question ${
      index + 1
    }: </span>${item.question}</div>
  <p class="mt-2"> Choose correct answer:</p>
  <label > <input type="radio"  name="ans${index}" value="True">
  True</label><br> 
  <label > <input type="radio"  name="ans${index}" value="False">
  False</label><br> 
  <hr/> `;
  } else {
    var arr = shuffle_options(item);
    str += `<div style="font-weight:bold"><span>Question ${index + 1}: </span>${
      item.question
    }</div>
  <p class="mt-2"> Choose correct answer:</p>
  <label > <input type="radio"  name="ans${index}" value="${arr[0]}">
${arr[0]}</label><br> 
  
  <label > <input type="radio"  name="ans${index}" value="${arr[1]}"> ${
      arr[1]
    }</label><br>  
  <label > <input type="radio" name="ans${index}" value="${arr[2]}">
${arr[2]}</label><br>
  <label > <input type="radio"  name="ans${index}" value="${arr[3]}">
  ${arr[3]}</label><br>
  <hr/>`;
  }
  return str;
};
// This loop is to shuffle the options
const shuffle_options = (option) => {
  var ar = option.incorrect_answers;
  var ar = [...ar, option.correct_answer];
  var len = ar.length;
  for (let i = len - 1; i > 0; i--) {
    let ranpos = Math.floor(Math.random() * (i + 1));
    var temp = ar[i];
    ar[i] = ar[ranpos];
    ar[ranpos] = temp;
  }
  return ar;
};
//This function is responsible for displaying the test mode quiz questions
const display = (list) => {
  var str = "";
  document.getElementById("quiz").style.display = "block";
  const form = document.getElementById("main-cont");
  form.style.visibility = "hidden";
  list.map((item, index) => {
    str += disp_questions(item, index);
  });
  document.getElementById("test_mode").innerHTML = str;
};

// To display practise mode quiz
const display_practise = (list) => {
  var str = "";
  list.map((item, index) => {
    str += disp_questions(item, index);
    str += ` <p name="check"></p><button class="btn btn-dark" id="show_btn${index}" onclick='show_Ans("${item.correct_answer}", ${index})' ondblclick="hide_Ans(${index})">Show answer</button>
    <hr/>`;
  });
  document.getElementById("practise_mode").innerHTML = str;
};
//This function is responsible for displaying correct answer
const show_Ans = (a, index) => {
  document.getElementsByName("check")[index].style.display = "block";
  document.getElementsByName("check")[index].innerHTML = a;
  document.getElementById(`show_btn${index}`).innerHTML = "Hide answer";
};
//This function is responsible for hiding the correct answer
const hide_Ans = (index) => {
  document.getElementsByName("check")[index].style.display = "none";
  document.getElementById(`show_btn${index}`).innerHTML = "Show answer";
};
//This function is responsible for checking answers wether correct or incorrect.
document.getElementById("check_answers").addEventListener("submit", (e) => {
  clearInterval(intervalId);
  document.getElementById("start_quiz").style.display = "none";
  document.getElementById("score").classList.add("score_show");
  e.preventDefault();
  var choosen_Ans = [];
  var sel_Ans = [];
  let count_score = 0;
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
  var right_wrong = "";
  var r_w = [{}];
  //compairing the selected and correct answers if they match or not
  meaningList.map((item, index) => {
    if (item.correct_answer === sel_Ans[index]) {
      ++count_score;
      right_wrong += disp_questions(item, index);
      right_wrong += `<p style="color:green">${item.correct_answer}</p> <hr>`;
    } else {
      right_wrong += disp_questions(item, index);
      right_wrong += `<p style="color:green">${item.correct_answer}</p> <hr>`;
    }
  });
  let remarks = "";
  if (count_score >= 8) {
    remarks = "Excellent";
  } else if (count_score >= 6) {
    remarks = "Good job";
  } else if (count_score >= 4) {
    remarks = "Try hard";
  } else {
    remarks = "Better luck next time";
  }
  const form = document.getElementById("test_quiz");
  form.style.display = "none";
  var score = `
 <div class="d-flex flex-column align-items-center">
          <h3>Your Result</h3>
          <div class="d-flex flex-column justify-content-center" style="width:10rem; height:10rem; background: linear-gradient(#3c97c3, #c3683c);
          opacity: 60%; border-radius:50%; text-align:center;">
            <h1>${count_score}</h1>
            <p>of 10</p>
          </div>
          <div class="d-flex flex-column align-items-center mt-3">
            <h3>${remarks}</h3>
            <p style="font-size:12px">
            On the basis of your selection you have choosen ${count_score} correct answers and ${
    10 - count_score
  } incorrect answers.
            </p>
          </div>
          <a href="./index.html"><button class="btn btn-dark">Start new quiz</button></a>
          <br>

          <button class="btn btn-dark" style="font-size:10px"  >Click here to check your answers</button>
<p id="correct" >${right_wrong}</p>
        </div>
  `;
  document.getElementById("score").innerHTML = score;
});

const startquiz = () => {
  quiz_timer();
  window.onbeforeunload = function () {
    return;
  };
  document.getElementById("test_quiz").style.display = "none";
  document.getElementById("start_quiz").style.display = "block";
};

const quiz_timer = () => {
  intervalId = setInterval(function () {
    let time = count;
    let time_sec = count;
    if (time >= 60) {
      let time_min = Math.floor(time / 60);
      time_sec = time % 60;

      if (time_min < 10) {
        document.getElementById("count").innerHTML = "0" + time_min;
      } else {
        document.getElementById("count").innerHTML = time_min;
      }
      if (time_sec < 10) {
        document.getElementById("c1").innerHTML = ":0" + time_sec;
      } else {
        document.getElementById("c1").innerHTML = ":" + time_sec;
      }
    } else {
      document.getElementById("timer").classList.remove("bg-dark");
      document.getElementById("timer").classList.add("bg-danger");
      document.getElementById("count").innerHTML = "00";
      if (time_sec < 10) {
        document.getElementById("c1").innerHTML = ":0" + time_sec;
      } else {
        document.getElementById("c1").innerHTML = ":" + time_sec;
      }
    }

    count--;
    if (count === 0) {
      alert("times up");
      clearInterval(intervalId);
      document.getElementById("count").innerHTML = "Times up";
      document.getElementById("submit_btn").click();
    }
  }, 1000);
};
