(function () {
  const defaultSettings = {
    grains: 8,
    vegetables: 5,
    fruits: 5,
    meat: 6,
    dairy: 3,
    fatsOils: 3,
    sodium: 2300,
    caffeine: 200,
    alcohol: 1,
  };
  const zero = {
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
  today ? convertStringsToNumbers(today) : zero;

  displayServingCounters(settings, today);
})();

function convertStringsToNumbers(obj) {
  for (let key in obj) {
    obj[key] = Number(obj[key]);
  }
  return obj;
}

function displayServingCounters(settings,today) {
  for (let key in settings) {
    if (settings[key] !== 0) {
      const foodGroup = document.createElement("custom-counter");
      foodGroup.counts = key;
      const icon = document.createElement("img");
      icon.src = `img/${key}.png`;
      icon.slot = "icon";
      foodGroup.appendChild(icon);
      document.getElementById("input-container").appendChild(foodGroup);
    }
  }
}
