const defaultSettings = [
  { name:"grains", jsVariable: "grains", timeFrame: "daily", servings: 8, step: 1, color: "#996633" },
  { name:"vegetables", jsVariable: "vegetables", htmlID: "vegetables", timeFrame: "daily", servings: 5, step: 1, color: "#00cc00" },
  { name:"fruits", jsVariable: "fruits", timeFrame: "daily", servings: 5, step: 1, color: "#ffff00" },
  { name:"meat", jsVariable: "meat", timeFrame: "daily", servings: 6, step: 1, color: "#cc0000" },
  { name:"dairy", jsVariable: "dairy", timeFrame: "daily", servings: 3, step: 1, color: "#ffffcc" },
  { name:"fats & oils", jsVariable: "fatsOils", timeFrame: "daily", servings: 3, step: 1, color: "#ff66ff" },
  { name:"sodium (mg)", jsVariable: "sodium", timeFrame: "daily", servings: 2300, step: 100, color: "#00ffff" },
  { name:"caffeine (mg)", jsVariable: "caffeine", timeFrame: "daily", servings: 200, step: 20, color: "#ff6666" },
  { name:"sweets", jsVariable: "sweets", timeFrame: "weekly", servings: 4, step: 1, color: "#993366" },
  { name:"nuts & legumes", jsVariable: "nutsSeedsLegumes", timeFrame: "weekly", servings: 4, step: 1, color: "#006699" },
  { name:"alcohol", jsVariable: "alcohol", timeFrame: "weekly", servings: 4, step: 1, color: "#ff6666" }
];

(function () {
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) {settings = defaultSettings};
  displayServingCounters(settings);
  updateToday(null);
  updateWeek(null);
  loadData("today");
  loadData("thisWeek");
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
    counter.addEventListener("click", ev => updateToday(ev));
  }
  else {
    counter.addEventListener("click", ev => updateWeek(ev));
  }

  return counter;
}

function loadData(timeFrame) {
    const data = JSON.parse(localStorage.getItem(timeFrame));
    if (data) {
    for (const key in data) {
      if (key === "date") { break; }
      document.getElementById(key).current = data[key];
    }
  }
}

function updateToday(ev) {
  // Save user input to today object in localstorage, or store old day and start new day if day has changed
  const freshStart = {grains: 0, fruits: 0, vegetables: 0, meat: 0, dairy: 0, fatsOils: 0, sodium: 0, caffeine: 0, date: new Date()};
  let today = JSON.parse(localStorage.getItem("today")) ?? freshStart;
  if (dayHasPassed(today.date)) {
    storeOldDay(today);
    document.querySelectorAll("#daily-counters custom-counter").forEach(counter => counter.current = 0);
    today = freshStart;
  }
  else {
    if (ev) {
      today[ev.target.counts] = ev.target.current;
    } 
  }
  localStorage.setItem("today", JSON.stringify(today));
}

function updateWeek(ev) {
  const freshStart = {nutsSeedsLegumes: 0, sweets: 0, alcohol: 0, date: new Date()};
  let thisWeek = JSON.parse(localStorage.getItem("thisWeek")) ?? freshStart;
  if (weekHasPassed(thisWeek.date)) {
    storeOldWeek(thisWeek);
    document.querySelectorAll("#weekly-counters custom-counter").forEach(counter => counter.current = 0);
    thisWeek = freshStart;
  }
  else {
    if (ev) {
      thisWeek[ev.target.counts] = ev.target.current;
    }
  }
  localStorage.setItem("thisWeek", JSON.stringify(thisWeek));

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
  const checkDate = new Date(startDate);
  const currentDate = new Date("February 14, 2023");
  const passedMS = currentDate.getTime() - checkDate.getTime();
  console.log(`Start: ${checkDate.getTime()} Now: ${currentDate.getTime()} Diff: ${passedMS}`);
  if (passedMS < 518400000) { // Under 6 days
    return false;
  }
  else if (passedMS < 604800000 && (today.getDay() === checkDate.getDay())) { // Between 6 and 7 24h days, but the day of week is the same
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

function storeOldWeek(oldWeek) {
  let weeks = JSON.parse(localStorage.getItem("weeks"));
  if (weeks) {
    weeks.push(oldWeek);
  }
  else {
    weeks = [oldWeek];
  }
  localStorage.setItem("weeks", JSON.stringify(weeks));
}