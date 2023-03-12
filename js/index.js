import datesRepo from "./dates-repo.js";
import settingsRepo from "./settings-repo.js";

try {
  localStorage.setItem("test", "");
  localStorage.removeItem("test");
}
catch {
  alert("LocalStorage is required for full functionality");
}

const settings = settingsRepo.getSettings();


// DISPLAY SERVING COUNTERS
const dailyCounters = settingsRepo.getDailySettings().map(createCounter);
const weeklyCounters = settingsRepo.getWeeklySettings().map(createCounter);
document.getElementById("daily-counters").append(...dailyCounters);
document.getElementById("weekly-counters").append(...weeklyCounters);
loadData();

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
function loadData() {
  let today = JSON.parse(localStorage.getItem("today")) ?? createNewDay();
  let weeks = JSON.parse(localStorage.getItem("weeks")) ?? [createNewWeek(createNewDay())]; 
  if (dayHasPassed(today.date)) {
    if (weekHasPassed(weeks)) {
      resetWeekCounters(weeks);
      weeks.unshift(createNewWeek(today));
    }
    weeks[0] = saveDayinWeek0(today, weeks[0]);
    resetDayCounters(today); 
    today = createNewDay();
  }
  const dayData = today.data;
  const weekData = weeks[0].data;
  const allData = {...dayData, ...weekData};
  document.querySelectorAll("custom-counter").forEach( (counter) => {
    counter.current = allData[counter.counts];
  })
  if (weeks[0] === null) {
    console.trace();
    alert("Weeks[0] set to null. Check logs");
    weeks.unshift();
  }
  localStorage.setItem("today", JSON.stringify(today));
  localStorage.setItem("weeks", JSON.stringify(weeks));
}


function dayHasPassed(checkDate) {
  const currentDate = datesRepo.justDate();
  return (datesRepo.compareDateArrs(checkDate, currentDate) === 1);
}

function weekHasPassed(weeks) {
  const currentDate = datesRepo.justDate();
  weeks[0].days.forEach(d => {
    if (datesRepo.compareDateArrs(d.date, currentDate) === 0) {
      return false;
    }
  })
  return true;
}

function resetDayCounters(passedDay) {
  document.querySelectorAll("#daily-counters custom-counter").forEach((counter) => (counter.current = 0));
}

function resetWeekCounters() {
  document.querySelectorAll("#weekly-counters custom-counter").forEach((counter) => (counter.current = 0));
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
  if (weeks[0] === null) {
    console.trace();
    alert("Weeks[0] set to null. Check logs");
    weeks.unshift();
  }
  localStorage.setItem("today", JSON.stringify(today));
  localStorage.setItem("weeks", JSON.stringify(weeks));
}

function saveDayinWeek0(day, week0) {
  week0.days.forEach(d => {
    if (datesRepo.compareDateArrs(d.date, day.date) === 0){
      d = day;
      return week0;
    }
  })
  console.log(`Error saving data. day ${day.date} not found in current week ${week0.date}`);
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
  return newWeek;
}
