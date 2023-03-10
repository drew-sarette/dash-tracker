import settingsRepo from "./settings-repo.js";
import dataRepo from "./data-repo.js";
import datesRepo from "./dates-repo.js";

try {
  localStorage.setItem("test", "");
  localStorage.removeItem("test");
}
catch {
  alert("LocalStorage is required for full functionality");
}

const settings = settingsRepo.getSettings();
const dailySettings = settings.filter(s => s.timeFrame === "daily");
const weeklySettings = settings.filter(s => s.timeFrame === "weekly");

// DISPLAY SERVING COUNTERS
const dailyCounters = dailySettings.map(createCounter);
const weeklyCounters = weeklySettings.map(createCounter);
document.getElementById("daily-counters").append(...dailyCounters);
document.getElementById("weekly-counters").append(...weeklyCounters);
loadDailyData();
loadWeeklyData();

function createCounter(sObj) {
  const counter = document.createElement("custom-counter");
  counter.counts = sObj.jsVariable;
  counter.max = sObj.servings;
  counter.step = sObj.step;
  counter.color = sObj.color;
  counter.name = sObj.name;
  counter.id = sObj.jsVariable;
  counter.timeframe = sObj.timeFrame;
  const icon = document.createElement("img");
  icon.src = `img/${sObj.jsVariable}.png`;
  icon.slot = "icon";
  counter.appendChild(icon);
  counter.addEventListener("click", (ev) => updateCounts(ev));
  return counter;
}

// LOAD TODAY'S DATA
function loadDailyData() {
  let days = dataRepo.getDays() ? dataRepo.getDays() : [createNewDay()];
  if (dayHasPassed(days[0].date)) {
    dailyCounters.forEach(counter => counter.current = 0);
    days.unshift(createNewDay()); 
    dataRepo.saveDays(days);
  }
  dailyCounters.forEach( (counter) => {
    counter.current = days[0].data[counter.counts];
  })
  dataRepo.saveDays(days);
}

function dayHasPassed(checkDate) {
  const currentDate = datesRepo.justDate();
  return (datesRepo.compareDateArrs(checkDate, currentDate) === 1);
}

function loadWeeklyData() {
  let lastWeek = dataRepo.getLastWeek();
  //lastWeek is an array of day objects.
  //Each day object contains a date and a data property
  //Each weeklyCounter's counts property matches a property in day.data
  weeklyCounters.forEach(counter => {
    counter.current = lastWeek.reduce((accumulator, day) => {
      return day.data[counter.counts] + accumulator;
    }, 0)
  })
}

// UPDATE TODAY'S DATA
function updateCounts(ev) {
  // Check if today is present in Weeks, create new week starting today if not.
  const days = dataRepo.getDays() ? dataRepo.getDays() : [createNewDay()];
  if (dayHasPassed(days[0].date)) {
    dailyCounters.forEach(counter => counter.current = 0);
    days.unshift(createNewDay());
    dataRepo.saveDays(days);
    loadWeeklyData();
    alert("The date has been updated. Please enter your changes again.");
    return;
  }
  else if (ev.target.timeframe){
    console.log(ev.target.timeframe);
    if (ev.target.timeframe === "daily") {
      days[0].data[ev.target.counts] = ev.target.current;
    }
    else if (ev.target.timeframe === "weekly") {
      // oldVal counts the total number of servings in the last week
      // need a cleaner way to handle updating the seving data for each day
      const oldVal = dataRepo.getLastWeek().reduce((accumulator, day) => {
        return day.data[ev.target.counts] + accumulator;
      }, 0)
      const difference = ev.target.current - oldVal;
      // Avoid lowering the counter when the number of servings recorded today is already 0
      if (difference === -1 && days[0].data[ev.target.counts] < 1) {
        ev.target.current++;
        return;
      }
      days[0].data[ev.target.counts] += difference;
    }
    dataRepo.saveDays(days);
  }
}

function createNewDay(date) {
  date ??= datesRepo.justDate();
  const data = {};
  settings.forEach( (s) => data[s.jsVariable] = 0 );
  return {
    date: date,
    data: data
  };
}
