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
console.log(settings, dailySettings, weeklySettings);


// DISPLAY SERVING COUNTERS
const dailyCounters = settingsRepo.getDailySettings().map(createCounter);
const weeklyCounters = settingsRepo.getWeeklySettings().map(createCounter);
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
  let today = dataRepo.getToday();
  if (dayHasPassed(today.date)) {
    resetDayCounters(today); 
    today = createNewDay();
  }
  document.querySelectorAll("custom-counter").forEach( (counter) => {
    counter.current = allData[counter.counts];
  })
  localStorage.setItem("today", JSON.stringify(today));
}


function dayHasPassed(checkDate) {
  const currentDate = datesRepo.justDate();
  return (datesRepo.compareDateArrs(checkDate, currentDate) === 1);
}

function resetDayCounters(passedDay) {
  document.querySelectorAll("#daily-counters custom-counter").forEach((counter) => (counter.current = 0));
}

function loadWeeklyData() {

}

// UPDATE TODAY'S DATA
function updateCounts(ev) {
  // Check if today is present in Weeks, create new week starting today if not.
  let today = JSON.parse(localStorage.getItem("today")) ?? createNewDay();
  let weeks = JSON.parse(localStorage.getItem("weeks")) ?? [createNewWeek(today)];
  if (dayHasPassed(today.date)) {
    if (weekHasPassed(weeks)) {
      resetWeekCounters(weeks);
      weeks.unshift(createNewWeek(today));
    }
    weeks[0] = saveDayinWeek0(today, weeks[0]);
    resetDayCounters(today); 
    today = createNewDay();
  }
  else {
    if (!ev) { return }
    if (ev.target.timeframe=== "daily"){
      today.data[ev.target.counts] = ev.target.current;
    }
    if (ev.target.timeframe === "weekly"){
      weeks[0].data[ev.target.counts] = ev.target.current;
    }
  }
  localStorage.setItem("today", JSON.stringify(today));
  localStorage.setItem("weeks", JSON.stringify(weeks));
}

function createNewDay(date) {
  date ??= datesRepo.justDate();
  const data = {};
  settingsRepo.getDailySettings().forEach( (s) => data[s.jsVariable] = 0 );
  return {
    date: date,
    data: data
  };
}

function createNewWeek(startDay) {
  //Creates a new week object given the first day object
  const newWeek = {
    date: startDay.date,
    days: [],
    data: {}
  };
  settingsRepo.getWeeklySettings().forEach( (s) => newWeek.data[s.jsVariable] = 0 );
  for (let i = 0; i<7; i++){
    const nextDate = datesRepo.addDaysToDate(newWeek.date, i)
    newWeek.days.push(createNewDay(nextDate));
  };
  console.log(newWeek);
  return newWeek;
}
