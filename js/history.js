import { datesRepo } from "./dates-repo.js";
import { getSettings } from "./get-settings.js";
console.log(getSettings());
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
  const dayComponents = [];
  w.days.forEach(d => dayComponents.push(createDayComponent(d)));
  const weekComponent = document.createElement("week-component");
  weekComponent.append(h3,...weekData, ...dayComponents)
  return weekComponent;
}
function makeDataItem(item) {
  const p = document.createElement("p");
  p.textContent = ``
}

function createDayComponent(d) {

}
