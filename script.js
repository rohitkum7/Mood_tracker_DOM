const today = new Date();
let data = localStorage.getItem("data");
let moodData = data ? JSON.parse(data) : [];
let todayMood;

//Todays date using moment
const date = `${moment(new Date()).format("D/M/YYYY")}`;

//Access The element
document.querySelector("[data-currentDate]").textContent = date;
const moodContainer = document.querySelector("[data-display-mood]");

// getting all the moods as an array
const moods = document.getElementById("mood").children;
const moodsArray = [...moods];

//Function to display the mood

function displayMood(value, needDate) {
  if (!needDate) needDate = date;
  const emoji = moodsArray.filter((mood) => {
    if (mood.childNodes[1].alt === value) return mood;
  });
  let html = `<h1>I ${needDate === date ? "feel" : `felt`} <img src="${
    emoji[0].childNodes[1].attributes[0].nodeValue
  }" width="30px" height="30px"/> ${value} ${
    needDate === date ? "today" : ` on ${needDate}`
  }</h1>`;

  moodContainer.insertAdjacentHTML("beforeend", html);
}

//Function to check today's mood

const checkMoodSelected = function () {
  for (let i = 0; i < moodData.length; i++) {
    if (moodData[i].split("-")[1] === date) {
      todayMood = moodData[i].split("-")[0];
      return true;
    }
  }
};

const isMoodSelected = checkMoodSelected();

//Condition that if you have seleced the todays mood again you cannot select
if (isMoodSelected) {
  moodData.forEach((data) => {
    let date = data.split("-")[1];

    let mood = data.split("-")[0];
    displayMood(mood, date);
  });
} else {
  moodsArray.forEach((mood) =>
    mood.addEventListener("click", (e) => {
      displayMood(e.target.alt);
      let storageData = `${e.target.alt}-${date}`;
      moodData.push(storageData);

      localStorage.setItem("data", JSON.stringify(moodData));
    })
  );
}
