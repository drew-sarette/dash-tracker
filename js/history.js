import { datesRepo } from "./dates-repo.js";
import { settingsRepo } from "./settings-repo.js";

const settings = settingsRepo.getSettings();

const historyDatafgInfo = document.getElementById("history-data");

// Load and display history data
let weeks = JSON.parse(localStorage.getItem("weeks"));
let today = JSON.parse(localStorage.getItem("today"));
if (today && weeks) {
  weeks[0].days.find(
    (d) => datesRepo.compareDateArrs(d.date, today.date) === 0
  ).data = today.data;
  weeks.forEach((w) => {
    const weekComponent = createWeekComponent(w);
    historyDatafgInfo.appendChild(weekComponent);
  });
} else {
  historyDatafgInfo.textContent = "No data found";
}

function createWeekComponent(w) {
  const h3 = document.createElement("h3");
  h3.textContent = `Week of ${w.date[1]}-${w.date[2]}-${w.date[0]}`;
  h3.slot = "heading";
  const weekData = [];
  for (const key in w.data) {
    weekData.push(makeDataItem(key, w.data));
  }
  const dayComponents = [];
  w.days.forEach((d) => dayComponents.push(createDayComponent(d)));
  const weekComponent = document.createElement("week-component");
  weekComponent.append(h3, ...weekData, ...dayComponents);
  return weekComponent;
}

function makeDataItem(key, dataObj) {
  const s = settingsRepo.getSettings();
  const si = s.find((item) => item.jsVariable === key);
  const p = document.createElement("p");
  p.textContent = `${si.name}: ${dataObj[key]} of ${si.servings}`;
  p.slot = "week-data";
  return p;
}

function createDayComponent(d) {
  const dayComponent = document.createElement("day-component");
  dayComponent.slot = "days";
  const h4 = document.createElement("h4");
  h4.slot = "day-date";
  h4.textContent = `${d.date[1]}-${d.date[2]}`;
  const fgs = [];
  for (const foodGroup in d.data) {
    const setting = settingsRepo.findSetting(foodGroup);
    const icon = document.createElement("img");
    icon.src = `/img/${foodGroup}.png`;
    if (Math.abs(d.data[foodGroup] - setting.servings) <= 1) {
      icon.style.backgroundColor = setting.color;
    }
    const info = document.createElement("p");
    info.textContent = `${setting.name}: ${d.data[foodGroup]} of ${setting.servings}`;
    [icon.slot, info.slot] = ["icon", "info"];
    const fgInfo = document.createElement("fg-info");
    fgInfo.slot = "day-data";
    fgInfo.expanded = "false";
    fgInfo.append(icon, info);
    fgs.push(fgInfo);
  }
  dayComponent.append(h4, ...fgs);
  return dayComponent;
}

//Clear History Function 
document.getElementById("clear-history").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all data?")){
    localStorage.removeItem("weeks");
    localStorage.removeItem("today");
    location.reload();
  }
})