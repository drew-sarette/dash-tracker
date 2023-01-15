// document.getElementById("save-settings").addEventListener("click", saveSettings); would like to use this instead of inline, but getElementById returns null?
(function () {
    try {
        const foundSettings = JSON.parse(localStorage.getItem("settings"));
        if (!foundSettings) throw new Error("Settings not found")
        for (let key in foundSettings) {
            foundSettings[key] = Number(foundSettings[key]);
        }
            document.getElementById("grains").value = foundSettings.grains;
            document.getElementById("vegetables").value = foundSettings.vegetables;
            document.getElementById("fruits").value = foundSettings.fruits;
            document.getElementById("dairy").value = foundSettings.dairy;
            document.getElementById("meat").value = foundSettings.meat;
            document.getElementById("nuts-seeds-legumes").value = foundSettings.nutsSeedsLegumes;
            document.getElementById("fats-oils").value = foundSettings.fatsOils;
            document.getElementById("sodium").value = foundSettings.sodium;
            document.getElementById("sweets").value = foundSettings.sweets;
            document.getElementById("caffeine").value = foundSettings.caffeine;
            document.getElementById("alcohol").value = foundSettings.alcohol;
    } catch (error) {
        console.log(error.message);
    }
})();
function saveSettings() {
  const s = {};
  s.grains = document.getElementById("grains").value;
  s.vegetables = document.getElementById("vegetables").value;
  s.fruits = document.getElementById("fruits").value;
  s.dairy = document.getElementById("dairy").value;
  s.meat = document.getElementById("meat").value;
  s.nutsSeedsLegumes = document.getElementById("nuts-seeds-legumes").value;
  s.fatsOils = document.getElementById("fats-oils").value;
  s.sodium = document.getElementById("sodium").value;
  s.sweets = document.getElementById("sweets").value;
  s.caffeine = document.getElementById("caffeine").value;
  s.alcohol = document.getElementById("alcohol").value;
  localStorage.setItem("settings", JSON.stringify(s));
}
