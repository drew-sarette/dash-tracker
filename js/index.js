(function () {
  let settings = JSON.parse(localStorage.getItem("settings"));
  try {
    if (!settings) {
      throw new Error("No settings found, using defaults.");
    }
    for (let key in settings) {
      settings[key] = Number(settings[key]);
    }
  } catch (error) {
    console.log(error.message);
    settings = {
      grains: 2,
      vegetables: 5,
      fruits: 5,
      dairy: 3,
      meat: 6,
      nutsSeedsLegumes: 1,
      fatsOils: 3,
      sodium: 2300,
      caffeine: 200,
      alcohol: 1,
    };
  }

  for (let key in settings) {
    if (settings[key] !== 0) {
      console.log(typeof settings[key]);
      const foodGroup = document.createElement("food-group");
      const icon = document.createElement("img");
      icon.src = `img/${key}.png`;
      icon.slot = "icon";
      foodGroup.appendChild(icon);
      document.getElementById("input-container").appendChild(foodGroup);
    }
  }
})();
