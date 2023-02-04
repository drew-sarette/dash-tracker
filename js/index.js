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
  const icon = document.createElement("img");
  icon.src = `img/${sObj.jsVariable}.png`;
  icon.slot = "icon";
  counter.appendChild(icon);
  counter.addEventListener("click", (ev) => updateCounts(ev));
  return counter;
}

function loadData() {
  let today = JSON.parse(localStorage.getItem("today")) ?? createNewDay();
  let weeks = JSON.parse(localStorage.getItem("weeks")) ?? [createNewWeek(today)];
  if (dayHasPassed(today.date)) { storeOldDay(today) }
  if (weekHasPassed(weeks[0])) { weeks.unshift(createNewWeek(today)) }
  const currentDate = datesRepo.justDate(new Date());
  const currentDay = weeks[0].days.find(day => datesRepo.compareDateArrs(day.date, currentDate) === 0);
  const dayData = currentDay.data;
  const weekData = weeks[0].data;
  const allData = {...dayData, ...weekData};
  for (const key in allData) {
    document.getElementById(key).current = allData[key];
  }
  localStorage.setItem("today", JSON.stringify(today));
  localStorage.setItem("weeks", JSON.stringify(weeks));
}

function updateCounts(ev) {
  // Check if today is present in Weeks, create new week starting today if not.
  let today = JSON.parse(localStorage.getItem("today")) ?? createNewDay();
  let weeks = JSON.parse(localStorage.getItem("weeks")) ?? [createNewWeek(today)];
  if (dayHasPassed(today.date)) {
    today = createNewDay();
    if (weeks[0].days.some(d => datesRepo.compareDateArrs(today.date, d.date)) === false) {
      weeks.unshift(createNewWeek(today))
      document.querySelectorAll("#weekly-counters custom-counter").forEach((counter) => (counter.current = 0));
    }
    document.querySelectorAll("#daily-counters custom-counter").forEach((counter) => (counter.current = 0));
    alert("Stored old data and reset counters for today.");
    return;
  }
  else {
    if (!ev) { return }
    if (ev.target.timeFrame = "daily"){
      today.data[ev.target.counts] = ev.target.current;
      weeks[0].days.forEach( d => { 
        if (datesRepo.compareDateArrs(d.date, today.date) === 0 ) {
          d = today;
        }
      })
    }
    if (ev.target.timeFrame = "weekly"){
      weeks[0].data[ev.target.counts] = ev.target.current;
    }
    
  }
  localStorage.setItem("today", JSON.stringify(today));
  localStorage.setItem("weeks", JSON.stringify(weeks));
}

function createNewDay(date) {
  date ??= datesRepo.justDate(new Date());
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
  const newWeek = {
    date: startDay.date,
    days: [startDay],
    data: {}
  };
  for (let i = 1; i<6; i++){
    newWeek.days.push({ date: datesRepo.addDaysToDate(startDay.date, i), data: {} });
  }
  return newWeek;
}
