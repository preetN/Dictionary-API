const apiEP = "https://favicongrabber.com/api/grab/all";
let meaningList = [];
const fetchUser = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    meaningList = data;
    console.log("Api here");
    console.log(meaningList);
  } catch (error) {
    console.log(error);
  }
};
fetchUser(apiEP);
// document.getElementById("cl").addEventListener("click", (e) => {
//   e.preventDefault();
// //   var word = document.getElementById("word").value;
//   //   const url = `${apiEP}/${word}`;
//   const url = apiEP;
//   fetchUser(url);
//   display(meaningList);
// });
const display = (list) => {
  console.log(list);
  var str = "";
  str += `<div>
  <h3></h3>
  <h5
    onclick="playsound('https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3')"
  >
    Audio
  </h5>
  <ul>
    <li>meaning1</li>
    <ul>
      <li>partofSpeech</li>
      <li>definitions</li>
    </ul>
    <li>meaning2</li>
    <ul>
      <li>partofSpeech</li>
      <li>definitions</li>
    </ul>
  </ul>
</div>`;
  document.getElementById("show").innerHTML = str;
};
const playsound = (url) => {
  const audio = new Audio(url);
  audio.play();
};
