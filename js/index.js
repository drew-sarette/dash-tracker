import { datesRepo } from "./dates-repo.js";

(function () {
  const defaultSettings = [
    {
      name: "grains",
      jsVariable: "grains",
      timeFrame: "daily",
      servings: 8,
      step: 1,
      color: "#996633",
    },
    {
      name: "vegetables",
      jsVariable: "vegetables",
      htmlID: "vegetables",
      timeFrame: "daily",
      servings: 5,
      step: 1,
      color: "#00cc00",
    },
    {
      name: "fruits",
      jsVariable: "fruits",
      timeFrame: "daily",
      servings: 5,
      step: 1,
      color: "#ffff00",
    },
    {
      name: "meat",
      jsVariable: "meat",
      timeFrame: "daily",
      servings: 6,
      step: 1,
      color: "#cc0000",
    },
    {
      name: "dairy",
      jsVariable: "dairy",
      timeFrame: "daily",
      servings: 3,
      step: 1,
      color: "#ffffcc",
    },
    {
      name: "fats & oils",
      jsVariable: "fatsOils",
      timeFrame: "daily",
      servings: 3,
      step: 1,
      color: "#ff66ff",
    },
    {
      name: "sodium (mg)",
      jsVariable: "sodium",
      timeFrame: "daily",
      servings: 2300,
      step: 100,
      color: "#00ffff",
    },
    {
      name: "caffeine (mg)",
      jsVariable: "caffeine",
      timeFrame: "daily",
      servings: 200,
      step: 20,
      color: "#ff6666",
    },
    {
      name: "sweets",
      jsVariable: "sweets",
      timeFrame: "weekly",
      servings: 4,
      step: 1,
      color: "#993366",
    },
    {
      name: "nuts & legumes",
      jsVariable: "nutsSeedsLegumes",
      timeFrame: "weekly",
      servings: 4,
      step: 1,
      color: "#006699",
    },
    {
      name: "alcohol",
      jsVariable: "alcohol",
      timeFrame: "weekly",
      servings: 4,
      step: 1,
      color: "#ff6666",
    },
  ];
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) {
    settings = defaultSettings;
  }
  displayServingCounters(settings);
  loadData();
})();

function displayServingCounters(settings) {
  settings = settings.filter((s) => s.servings != 0);
  const dailyCounters = settings
    .filter((s) => s.timeFrame === "daily")
    .map(createCounter);
  document.getElementById("daily-counters").append(...dailyCounters);

  const weeklyCounters = settings
    .filter((s) => s.timeFrame === "weekly")
    .map(createCounter);
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
  counter.timeFrame = sObj.timeFrame;
  const icon = document.createElement("img");
  icon.src = `img/${sObj.jsVariable}.png`;
  icon.slot = "icon";
  counter.appendChild(icon);
  counter.addEventListener("click", (ev) => updateCounts(ev));
  return counter;
}

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
  for (const key in allData) {
    document.getElementById(key).current = allData[key];
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

function saveDayinWeek0(day, week0) {
  week0.days.forEach(d => {
    if (datesRepo.compareDateArrs(d.date, day.date) === 0){
      d = day;
      return week0;
    }
  })
  console.log(`Error saving data. day ${day.date} not found in current week ${week0.date}`);
}

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
    if (ev.target.timeFrame === "daily"){
      today.data[ev.target.counts] = ev.target.current;
    }
    if (ev.target.timeFrame === "weekly"){
      weeks[0].data[ev.target.counts] = ev.target.current;
    }
  }
  localStorage.setItem("today", JSON.stringify(today));
  localStorage.setItem("weeks", JSON.stringify(weeks));
}

function createNewDay(date) {
  date ??= datesRepo.justDate();
  return {
    date: date,
    data: {
      grains: 0,
      fruits: 0,
      vegetables: 0,
      meat: 0,
      dairy: 0,
      fatsOils: 0,
      sodium: 0,
      caffeine: 0 
    }
  };
}

function createNewWeek(startDay) {
  //Creates a new week object given the first day object
  const days = [];
  const startDate = startDay.date;
  for (let i = 0; i<7; i++){
    const nextDate = datesRepo.addDaysToDate(startDate, i)
    days.push(createNewDay(nextDate));
  }
  
  const newWeek = {
    date: startDay.date,
    days: days,
    data: {
      sweets: 0,
      nutsSeedsLegumes: 0,
      alcohol: 0
    }
  };

  return newWeek;
}
