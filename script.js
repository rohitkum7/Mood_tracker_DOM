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
  let html = `<h1 data-mood="${value}">I ${
    needDate === date ? "feel" : `felt`
  } <img src="${
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
  return false;
};

// Function to display all history
const displayHistory = function () {
  // Clear the container first
  moodContainer.innerHTML = "";

  // Display all moods from history
  moodData.forEach((data) => {
    let date = data.split("-")[1];
    let mood = data.split("-")[0];
    displayMood(mood, date);
  });
};

// Function to set up click listeners
const setupMoodListeners = function () {
  moodsArray.forEach((mood) =>
    mood.addEventListener("click", (e) => {
      // Get the selected mood
      const selectedMood = e.target.alt;

      // Store in localStorage
      let storageData = `${selectedMood}-${date}`;
      moodData.push(storageData);
      localStorage.setItem("data", JSON.stringify(moodData));

      // Update the display
      displayHistory();

      // Disable further selections for today
      disableMoodSelection();
    })
  );
};

// Function to disable mood selection
const disableMoodSelection = function () {
  moodsArray.forEach((mood) => {
    // Remove click event listeners by cloning and replacing the element
    const newMood = mood.cloneNode(true);
    mood.parentNode.replaceChild(newMood, mood);

    // Add visual indication that selections are disabled
    newMood.style.opacity = "0.5";
    newMood.style.cursor = "default";

    // Optional: Added a tooltip to make it's disabled
    newMood.setAttribute(
      "title",
      "You've already selected your mood for today"
    );
  });
};

// Initial page setup
const initializePage = function () {
  const isMoodSelected = checkMoodSelected();

  // Display history
  displayHistory();

  // If mood already selected for today, disable selection
  if (isMoodSelected) {
    disableMoodSelection();
  } else {
    setupMoodListeners();
  }
};

// Initialize the page
initializePage();
