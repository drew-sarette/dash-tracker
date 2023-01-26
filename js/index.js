const defaultSettings = [
  { name:"grains", jsVariable: "grains", timeFrame: "daily", servings: 8, step: 1, color: "#996633" },
  { name:"vegetables", jsVariable: "vegetables", htmlID: "vegetables", timeFrame: "daily", servings: 5, step: 1, color: "#00cc00" },
  { name:"fruits", jsVariable: "fruits", timeFrame: "daily", servings: 5, step: 1, color: "#ffff00" },
  { name:"meat", jsVariable: "meat", timeFrame: "daily", servings: 6, step: 1, color: "#cc0000" },
  { name:"dairy", jsVariable: "dairy", timeFrame: "daily", servings: 3, step: 1, color: "#ffffcc" },
  { name:"fats & oils", jsVariable: "fatsOils", timeFrame: "daily", servings: 3, step: 1, color: "#ff66ff" },
  { name:"sodium", jsVariable: "sodium", timeFrame: "daily", servings: 2300, step: 100, color: "#00ffff" },
  { name:"caffeine", jsVariable: "caffeine", timeFrame: "daily", servings: 200, step: 20, color: "#ff6666" },
  { name:"sweets", jsVariable: "sweets", timeFrame: "weekly", servings: 4, step: 1, color: "#993366" },
  { name:"nuts & legumes", jsVariable: "nutsSeedsLegumes", timeFrame: "weekly", servings: 4, step: 1, color: "#006699" },
  { name:"alcohol", jsVariable: "alcohol", timeFrame: "weekly", servings: 4, step: 1, color: "#ff6666" }
];

(function () {
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) {settings = defaultSettings};
  displayServingCounters(settings);
  loadData("today", "thisWeek");
})();

function displayServingCounters(settings) {
  settings = settings.filter(s => s.servings != 0);
  const dailyCounters = settings.filter(s => s.timeFrame === "daily").map(createCounter);
  document.getElementById("daily-counters").append(...dailyCounters);

  const weeklyCounters = settings.filter(s => s.timeFrame === "weekly").map(createCounter);
  document.getElementById("weekly-counters").append(...weeklyCounters);
}

function createCounter(sObj) {
  const counter = document.createElement("custom-counter");
  counter.counts = sObj.jsVariable;
  counter.max = sObj.servings;
  counter.step = sObj.step;
  counter.color = sObj.color;
  counter.name = sObj.name;
  counter.id = sObj.jsVariable;
  const icon = document.createElement("img");
  icon.src = `img/${sObj.jsVariable}.png`;
  icon.slot = "icon";
  counter.appendChild(icon);
  if (sObj.timeFrame === "daily") {
    counter.addEventListener("click", ev => saveToday(ev));
  }
  else {
    counter.addEventListener("click", ev => saveThisWeek(ev));
  }

  return counter;
}

function loadData(...storedItems) {
  // For each item retrieved from localStorage, update the current property/attribute of the corresponding custom-counter.
  for (const item of storedItems) {
    const data = JSON.parse(localStorage.getItem(item));
    if (data) {
    for (const key in data) {
      if (key === "date") { break; }
      document.getElementById(key).current = data[key];
    }
  }
  }
}

function saveToday(ev) {
  const freshStart = {grains: 0, fruits: 0, vegetables: 0, meat: 0, dairy: 0, fatsOils: 0, sodium: 0, caffeine: 0, date: new Date()};
  let today = JSON.parse(localStorage.getItem("today")) ?? freshStart;
  if (dayHasPassed(new Date("January 1, 2023"))) {
    storeOldDay(today);
    document.querySelectorAll("#daily-counters custom-counter").forEach(counter => counter.current = 0);
    today = freshStart;
  }
  else {
    today[ev.target.counts] = ev.target.current;
    localStorage.setItem("today", JSON.stringify(today));
  }
}



function saveThisWeek(ev) {
  
  const thisWeek = JSON.parse(localStorage.getItem("thisWeek")) ?? {nutsSeedsLegumes: 0, sweets: 0, alcohol: 0, startDate: new Date()};
  if (weekHasPassed(thisWeek.startDate)) {
    startNewWeek(thisWeek);
  }
  else {
    thisWeek[ev.target.counts] = ev.target.current;
    thisWeek.startDate = new Date();
    localStorage.setItem("thisWeek", JSON.stringify(thisWeek));
  }
}

function dayHasPassed(today) {
  //return true if today object's date is not current day
  const checkDate = new Date(today); //Rehydrate the date object. Comes back as a string :-(
  const currentDate = new Date();
  const torf = (checkDate.toDateString() !==  currentDate.toDateString());
  return torf;
}

function weekHasPassed(startDate) {
  //Determines if at least seven  calendar days passed after startDate
  const today = new Date();
  passedMS = today.getTime() - startDate.getTime()
  if (passedMS < 518400000) { // Under 6 days
    return false;
  }
  else if (passedMS < 604800000 && (today.getDay() === startDate.getDay())) { // Between 6 and 7 24h days, but the day of week is the same
    return true;
  }
  else {
    return true;
  }
}

function storeOldDay(oldDay) {
  // Add old day to the localstorage days item, 
  let days = JSON.parse(localStorage.getItem("days"));
  if (days){
    days.push(oldDay);
  }
  else {
    days = [oldDay];
  }
  localStorage.setItem("days", JSON.stringify(days));
}

function startNewWeek() {
  console.log("Start new week");
}