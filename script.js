const apiEP = "https://api.dictionaryapi.dev/api/v2/entries/en";
let meaningList = [];
const fetchUser = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    meaningList = data;
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("cl").addEventListener("click", (e) => {
  e.preventDefault();
  var word = document.getElementById("word").value;
  const url = `${apiEP}/${word}`;
  fetchUser(url);
  display(meaningList);
});
let c = 1;
const display = (list) => {
  console.log(c++);
  list.map((item) => {
    console.log("i will return");
    console.log(item.word);
    console.log(item.meanings[0].partOfSpeech);
  });
  var str = "";
  str += `<div>
  <h3>Word</h3>
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
