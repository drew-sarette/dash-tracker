(function () {
  const defaultSettings = {
    grains: { servings: 8, step: 1, color: "#ff0000" },
    vegetables: { servings: 5, step: 1, color: "#ff0000" },
    fruits: { servings: 5, step: 1, color: "#ff0000" },
    meat: { servings: 6, step: 1, color: "#ff0000" },
    dairy: { servings: 3, step: 1, color: "#ff0000" },
    fatsOils: { servings: 3, step: 1, color: "#ff0000" },
    sodium: { servings: 2300, step: 100, color: "#ff0000" },
    caffeine: { servings: 200, step: 20, color: "#ff0000" },
    alcohol: { servings: 1, step: 1, color: "#ff0000" },
  };

  const testToday = {
    grains: 4,
    vegetables: 4,
    fruits: 4,
    meat: 3,
    dairy: 0,
    fatsOils: 0,
    sodium: 0,
    caffeine: 0,
    alcohol: 0,
  };

  const zeroToday = {
    grains: 0,
    vegetables: 0,
    fruits: 0,
    meat: 0,
    dairy: 0,
    fatsOils: 0,
    sodium: 0,
    caffeine: 0,
    alcohol: 0,
  };

  let settings = JSON.parse(localStorage.getItem("settings"));
  settings ? convertStringsToNumbers(settings) : defaultSettings;

  let today = JSON.parse(localStorage.getItem("today"));
  today ? convertStringsToNumbers(today) : zeroToday;

  displayServingCounters(defaultSettings, testToday);
})();

function convertStringsToNumbers(obj) {
  for (let key in obj) {
    obj[key] = Number(obj[key]);
  }
  return obj;
}

function displayServingCounters(settings, today) {
  for (let key in settings) {
    if (settings[key] !== 0) {
      const foodGroup = document.createElement("custom-counter");
      foodGroup.counts = key;
      foodGroup.max = settings[key].servings;
      foodGroup.step = settings[key].step;
      foodGroup.color = settings[key].color;
      foodGroup.current = today[key];
      const icon = document.createElement("img");
      icon.src = `img/${key}.png`;
      icon.slot = "icon";
      foodGroup.appendChild(icon);

      document.getElementById("input-container").appendChild(foodGroup);
      foodGroup.shadowRoot
        .querySelector(".increment")
        .addEventListener("click", (ev) => increment(ev, foodGroup));
      foodGroup.shadowRoot
        .querySelector(".decrement")
        .addEventListener("click", (ev) => decrement(ev, foodGroup));
    }
  }
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
