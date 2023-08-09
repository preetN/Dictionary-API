const apiEP = "https://opentdb.com/api.php?amount=10";
let meaningList = [];
let url = "";
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
//This function is responsible for displaying the test mode quiz questions
const display = (list) => {
  var str = "";
  document.getElementById("quiz").style.display = "block";

  const form = document.getElementById("main-cont");
  form.style.visibility = "hidden";
  list.map((item, index) => {
    if (item.type === "boolean") {
      str += `<p style="font-weight:bold"><span>Question ${index + 1}: </span>${
        item.question
      }</p>`;
      str += diff_level(item.difficulty);
      str += `
      <p> Choose correct answer:</p>
      <input type="radio" id="ans1${index}" name="ans${index}" value="True">
      <label for="ans1${index}">True</label><br> 
      <input type="radio" id="ans2${index}" name="ans${index}" value="False">
      <label for="ans2${index}">False</label><br> 
      <hr/> `;
    } else {
      var arr = shuffle_options(item);
      str += `<p style="font-weight:bold"><span>Question ${index + 1}: </span>${
        item.question
      }</p>`;

      str += diff_level(item.difficulty);
      str += `
      <p> Choose correct answer:</p>
      <input type="radio" id="ans1${index}" name="ans${index}" value="${arr[0]}">
      <label for="ans1${index}">${arr[0]}</label><br> 
      <input type="radio" id="ans2${index}" name="ans${index}" value="${arr[1]}">
      <label for="ans2${index}">${arr[1]}</label><br>  
      <input type="radio" id="ans3${index}" name="ans${index}" value="${arr[2]}">
      <label for="ans3${index}">${arr[2]}</label><br>
      <input type="radio" id="ans4${index}" name="ans${index}" value="${arr[3]}">
      <label for="ans4${index}">${arr[3]}</label><br>
      <hr/>`;
    }
  });
  document.getElementById("test_mode").innerHTML = str;
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
// To display practise mode quiz
const display_practise = (list) => {
  var str = "";
  list.map((item, index) => {
    if (item.type === "boolean") {
      str += `<p style="font-weight:bold"><span>Question ${index + 1}: </span>${
        item.question
      }</p>
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
      var arr = shuffle_options(item);

      str += `<p style="font-weight:bold"><span>Question ${index + 1}: </span>${
        item.question
      }</p>
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
  document.getElementById("practise_mode").innerHTML = str;
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
  document.getElementById("start_quiz").style.display = "none";
  document.getElementById("score").style.display = "block";
  e.preventDefault();
  var choosen_Ans = [];
  var sel_Ans = [];
  let count = 0;
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
      ++count;
    }
  });
  const form = document.getElementById("test_quiz");
  form.style.display = "none";
  var score = `<div  class="d-flex flex-column justify-content-center align-items-center p-3"><h3><i class="fa-solid fa-circle-check"></i> You have successfully completed the quiz</h3>
  <p>On the basis of your selection correct answers are <b>${count}</b></p>

 <a href="./index.html"><button class="btn btn-dark">Start new quiz</button></a>
 </div>
  `;
  document.getElementById("score").innerHTML = score;
});
//Show easy medium or hard level on bar.
const diff_level = (level) => {
  if (level === "easy") {
    return `<div class="diff">
  <div class="level">
  </div></div>`;
  } else if (level === "medium") {
    return `<div class="diff">
  <div class="level medium">
  </div></div>`;
  } else if (level === "hard") {
    return `<div class="diff">
    <div class="level hard">
    </div></div>`;
  }
};
const startquiz = () => {
  document.getElementById("test_quiz").style.display = "none";
  document.getElementById("start_quiz").style.display = "block";
};
