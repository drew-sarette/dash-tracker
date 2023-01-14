(function () {

  try {
    const settings = JSON.parse(localStorage.getItem("settings"));
  } catch {
    const settings = {
      grains: 8,
      vegetables: 5,
      fruits: 5,
      dairy: 3,
      meat: 6,
      nutsSeedsLegumes: 1,
      fatsOils: 3,
      sweets: 1,
      sodium: 2300,
      caffeine: 200
    };
    console.log("Using default settings.");
  }
  const settings = {
    grains: 8,
    vegetables: 5,
    fruits: 5,
    dairy: 3,
    meat: 1,
    nutsSeedsLegumes: 1,
    fatsOils: 3,
    sweets: 1,
    sodium: 2300,
    alcohol: 1,
    caffeine: 200
  };

  for (let key in settings) {
    if (settings[key]) {
        const foodGroup = document.createElement('food-group');
        const icon = document.createElement('img');
        icon.src = `img/${key}.png`;
        icon.slot = 'icon';
        foodGroup.appendChild(icon);
        document.getElementById('input-container').appendChild(foodGroup);
    }
  }
})();

