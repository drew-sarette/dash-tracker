import datesRepo from "./dates-repo.js";
import dataRepo from "./data-repo.js";
import settingsRepo from "./settings-repo.js";

const settings = settingsRepo.getSettings();

const yearInput = document.getElementById("select-year");
const monthInput = document.getElementById("select-month");
const detailsDisplay = document.getElementById("show-details");
const closeButton = document.getElementById("close-details");

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
  const days = loadData(selectedYear, selectedMonth) ? loadData(selectedYear, selectedMonth)  : [];
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
  detailsDisplay.classList.remove("display-none");

}

function loadData(year, month) {
  const allData = dataRepo.getDays();
  const selectedMonth = allData?.filter(
    (d) => d.date[0] === year && d.date[1] === month
  );
  return selectedMonth;
}

document.getElementById("clear-history").addEventListener("click", () => {
  if(confirm("Would you like to clear all data?")) {
    localStorage.removeItem("days");
    location.reload();
  }
})