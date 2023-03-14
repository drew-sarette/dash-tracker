<<<<<<< HEAD
import datesRepo from "./dates-repo.js";
import dataRepo from "./data-repo.js";
import settingsRepo from "./settings-repo.js";
=======
import datesRepo from "./dates-repo";
import settingsRepo from "./settings-repo";
>>>>>>> main

const settings = settingsRepo.getSettings();

const yearInput = document.getElementById("select-year");
const monthInput = document.getElementById("select-month");
const detailsDisplay = document.getElementById("show-details");
const closeButton = document.getElementById("close-details");

<<<<<<< HEAD
closeButton.addEventListener("click", () => detailsDisplay.classList.add("display-none"));
yearInput.addEventListener("change", updateCalendar);
monthInput.addEventListener("change", updateCalendar);

// Initialize
monthInput.value = new Date().getMonth() + 1;
let startYear = 2023;
while (startYear < new Date().getFullYear()) {
  startYear++;
  const option = document.createElement("option");
  option.value = startYear;
  option.textContent = startYear;
  yearInput.appendChild(option);
}
yearInput.value = startYear;
updateCalendar();

function updateCalendar() {
  const [selectedYear, selectedMonth] = [
    Number(yearInput.value),
    Number(monthInput.value),
  ];
  const days = loadData(selectedYear, selectedMonth);
  const tds = document.querySelectorAll("td");
  tds.forEach((td) => {
    td.innerHTML = null;
    td.classList.remove("has-dot");
  });
  let offset = new Date(selectedYear, selectedMonth - 1).getDay();
  let dayNum = 1;
  while (
    new Date(selectedYear, selectedMonth - 1, dayNum).getMonth() ===
    selectedMonth - 1
  ) {
    const h4 = document.createElement("h4")
    h4.textContent = dayNum;
    tds[dayNum - 1 + offset].appendChild(h4);
    const data = days.find((d) => d.date[2] === dayNum);
    if (data) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      tds[dayNum - 1 + offset].appendChild(dot);
      tds[dayNum - 1 + offset].addEventListener("click", () => showDetail(data));
      tds[dayNum - 1 + offset].classList.add("has-dot");
=======
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
>>>>>>> main
    }
    dayNum++;
  }
}

function showDetail(dayData, ev) {
  detailsDisplay.querySelector("h4").textContent = `${dayData.date[1]}-${dayData.date[2]}`;
  const deets = document.getElementById("details");
  deets.innerHTML = null;
  for (let key in dayData.data){
    const p = document.createElement("p");
    p.textContent = `${key}: ${dayData.data[key]}`
    deets.appendChild(p);
  }
<<<<<<< HEAD
  detailsDisplay.classList.remove("display-none");

}

function loadData(year, month) {
  const allData = dataRepo.getDays();
  const selectedMonth = allData.filter(
    (d) => d.date[0] === year && d.date[1] === month
  );
  return selectedMonth;
}
=======

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
  
>>>>>>> main
