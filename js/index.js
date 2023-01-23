
(function () {
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
    { name:"nuts, seeds & legumes", jsVariable: "nutsSeedsLegumes", htmlID: "nuts-seeds-legumes", timeFrame: "weekly", servings: 4, step: 1, color: "#006699" },
    { name:"alcohol", jsVariable: "alcohol", htmlID: "alcohol", timeFrame: "weekly", servings: 4, step: 1, color: "#ff6666" }
  ]
  let settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) {settings = defaultSettings};
  console.log(settings);
  displayServingCounters(settings);
})();

function displayServingCounters(settings) {
  const dailyCounters = settings
    .filter(s => s.timeFrame === "daily")
    .map(createFoodGroup);
  document.getElementById("daily-counters").append(...dailyCounters);

  const weeklyCounters = settings
    .filter(s => s.timeFrame === "weekly")
    .map(createFoodGroup);
  document.getElementById("weekly-counters").append(...weeklyCounters);
}

function createFoodGroup(sObj) {
  const foodGroup = document.createElement("custom-counter");
  foodGroup.counts = sObj.jsVariable;
  foodGroup.max = sObj.servings;
  foodGroup.step = sObj.step;
  foodGroup.color = sObj.color;
  const icon = document.createElement("img");
  icon.src = `img/${sObj.jsVariable}.png`;
  icon.slot = "icon";
  foodGroup.appendChild(icon);
  foodGroup.shadowRoot
    .querySelector(".increment")
    .addEventListener("click", (ev) => increment(ev, foodGroup));
  foodGroup.shadowRoot
    .querySelector(".decrement")
    .addEventListener("click", (ev) => decrement(ev, foodGroup));
  return foodGroup;
}


function increment(ev, foodGroup) {
  foodGroup.current = foodGroup.current + foodGroup.step;
}

function decrement(ev, foodGroup) {
  let result = Number(foodGroup.current) - Number(foodGroup.step);
  if (result <= 0) {
    foodGroup.current = 0;
  } else {
    foodGroup.current = Number(foodGroup.current) - Number(foodGroup.step);
  }
}
