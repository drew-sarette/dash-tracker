import { datesRepo } from "./dates-repo.js";
import { settingsRepo } from "./settings-repo.js";

const mainContent = document.querySelector("main");
let weeks = JSON.parse(localStorage.getItem("weeks"));
if (weeks) {
  weeks.forEach(w => {
    const weekComponent = createWeekComponent(w);
    mainContent.appendChild(weekComponent);
  })
}
else {
  mainContent.textContent = "No data found";
}

function createWeekComponent(w) {
  const h3 = document.createElement("h3");
  h3.textContent = `Week of ${w.date[1]}-${w.date[2]}-${w.date[0]}`;
  h3.slot = "heading";
  const weekData = [];
  for (const key in w.data) {weekData.push(makeDataItem(key, w.data))}
  //start here next time
  const dayComponents = [];
  w.days.forEach(d => dayComponents.push(createDayComponent(d)));
  const weekComponent = document.createElement("week-component");
  weekComponent.append(h3,...weekData, ...dayComponents)
  return weekComponent;
}
function makeDataItem(key, dataObj) {
  const s = settingsRepo.getSettings();
  const si = s.find( item => item.jsVariable === key);
  const p = document.createElement("p");
  p.textContent = `${si.name}: ${dataObj[key]} of ${si.servings}`;
  p.slot = "week-data";
  return p;
}

function createDayComponent(d) {
  const h4 = document.createElement("h4");
  h4.textContent = `${d.date[1]}-${d.date[2]}-${d.date[0]}`;
  h4.slot = "day-date"
  
}
