const defaultSettings = [
  { name:"grains", jsVariable: "grains", htmlID: "grains", timeFrame: "daily", servings: 8, step: 1, color: "#996633" },
  { name:"vegetables", jsVariable: "vegetables", htmlID: "vegetables", timeFrame: "daily", servings: 5, step: 1, color: "#00cc00" },
  { name:"fruits", jsVariable: "fruits", htmlID: "fruits", timeFrame: "daily", servings: 5, step: 1, color: "#ffff00" },
  { name:"meat", jsVariable: "meat", htmlID: "meat", timeFrame: "daily", servings: 6, step: 1, color: "#cc0000" },
  { name:"dairy", jsVariable: "dairy", htmlID: "dairy", timeFrame: "daily", servings: 3, step: 1, color: "#ffffcc" },
  { name:"fats & oils", jsVariable: "fatsOils", htmlID: "fats-oils", timeFrame: "daily", servings: 3, step: 1, color: "#ff66ff" },
  { name:"sodium", jsVariable: "sodium", htmlID: "sodium", timeFrame: "daily", servings: 2300, step: 100, color: "#00ffff" },
  { name:"caffeine", jsVariable: "caffeine", htmlID: "caffeine", timeFrame: "daily", servings: 200, step: 20, color: "#ff6666" },
  { name:"sweets", jsVariable: "sweets", htmlID: "sweets", timeFrame: "weekly", servings: 4, step: 1, color: "#993366" },
  { name:"nuts & legumes", jsVariable: "nutsSeedsLegumes", htmlID: "nuts-seeds-legumes", timeFrame: "weekly", servings: 4, step: 1, color: "#006699" },
  { name:"alcohol", jsVariable: "alcohol", htmlID: "alcohol", timeFrame: "weekly", servings: 4, step: 1, color: "#ff6666" }
];

// window.addEventListener("beforeunload", function() {
//   document.localStorage.setItem("test", "hi");
// });

(function () {
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) {settings = defaultSettings};
  displayServingCounters(settings);
  loadTodayData(settings);
})();

function displayServingCounters(settings) {
  settings = settings.filter(s => s.servings != 0);
  const dailyCounters = settings.filter(s => s.timeFrame === "daily").map(createCounter);
  document.getElementById("daily-counters").append(...dailyCounters);

  const weeklyCounters = settings.filter(s => s.timeFrame === "weekly").map(createCounter);
  document.getElementById("weekly-counters").append(...weeklyCounters);
}

function createCounter(sObj) {
  const counter = document.createElement("custom-counter");
  counter.counts = sObj.jsVariable;
  counter.max = sObj.servings;
  counter.step = sObj.step;
  counter.color = sObj.color;
  counter.name = sObj.name;
  counter.id = sObj.htmlID;
  const icon = document.createElement("img");
  icon.src = `img/${sObj.jsVariable}.png`;
  icon.slot = "icon";
  counter.appendChild(icon);
  counter.addEventListener("click", saveData);
  return counter;
}

function loadTodayData(settings) {

}

function saveData(ev) {
  const startFromZero = {grains: 0, fruits: 0, vegetables: 0, meat: 0, dairy: 0, fatsOils: 0, sodium: 0, caffeine: 0, nutsSeedsLegumes: 0, sweets: 0, alcohol: 0}
  const today = JSON.parse(localStorage.getItem("today")) ?? startFromZero;
  today[ev.target.counts] = ev.target.current;
  localStorage.setItem("today", JSON.stringify(today));
}