import datesRepo from "./dates-repo";
import settingsRepo from "./settings-repo";

const settings = settingsRepo.getSettings();

const historyDataArea = document.getElementById("history-data");

// Load and display history data
let today = JSON.parse(localStorage.getItem("today")) ?? createNewDay();
let weeks = JSON.parse(localStorage.getItem("weeks")) ?? [createNewWeek(createNewDay())]; 
if (today && weeks) {
  const isWeekCurrent = weeks[0].days.some(d => datesRepo.compareDateArrs(d.date, datesRepo.justDate()) === 0);
  if (!isWeekCurrent) {
    today = createNewDay();
    weeks.unshift(createNewWeek(createNewDay(today.date)));
  }
  weeks[0].days.find(
    (d) => datesRepo.compareDateArrs(d.date, datesRepo.justDate()) === 0
  ).data = today.data;
  weeks.forEach((w) => {
    const weekDisplay = createWeekDisplay(w);
    historyDataArea.appendChild(weekDisplay);
  });
} else {
  historyDataArea.textContent = "No data found";
}
if (weeks[0] === null) {
  console.trace();
  alert("Weeks[0] set to null. Check logs");
  weeks.unshift();
}
localStorage.setItem("today", JSON.stringify(today));
localStorage.setItem("weeks", JSON.stringify(weeks));

function createWeekDisplay(w) {
  const weekContainer = document.createElement("div");
  weekContainer.classList.add("week-display");
  const weekExpList = makeExpList(`Week of ${w.date[2]}-${w.date[1]}-${w.date[0]}`, w.data);
  const daysContainer = document.createElement("div")
  w.days.forEach(d => {
    const dayExpList = makeExpList(`${d.date[2]}-${d.date[1]}-${d.date[0]}`, d.data)
    daysContainer.appendChild(dayExpList);
  })
  weekContainer.append(weekExpList, daysContainer);
  return weekContainer;
}

function makeExpList (infoString, listData) {
    const expList = document.createElement("expandable-list");
    const info = document.createElement("h4");
    info.slot = "info";
    info.textContent = infoString;
    const lis = [];
    for (const fg in listData) {
        const li = makeLi(fg, listData[fg]);
        lis.push(li);
    }
    expList.append(info, ...lis);
    return expList;
}

function makeLi(fg, servingsCount) {
    const setting = settingsRepo.findSetting(fg);
    const li = document.createElement("li");
    const icon = document.createElement("img");
    const desc = document.createElement("p");
    li.slot = "expandable";
    icon.src = `img/${fg}.png`;
    desc.textContent = `${setting.name}: ${servingsCount} of ${setting.servings}`;
    li.append(icon, desc);
    return li;
  }

  document.getElementById("clear-history").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all stored data?")){
      localStorage.removeItem("today");
      localStorage.removeItem("weeks");
    }
    location.reload();
  })

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
  
