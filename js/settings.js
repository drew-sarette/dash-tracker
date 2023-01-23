document.getElementById("save-settings").addEventListener("click", saveSettings); 

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
]



//Check if settings are saved in localStorage, if so then display them in the form.
try {
  const foundSettings = JSON.parse(localStorage.getItem("settings"));
  if (!foundSettings) throw new Error("Settings not found");
  displaySettings(foundSettings)
} catch (error) {
  console.log(error.message);
  displaySettings(defaultSettings);
}

function displaySettings(settings) {
  settings.forEach(sObj => {
    const div = document.createElement("div");
    div.classList.add("form-field-container");
    div.innerHTML = `
    <div class="form-field-container">
      <label for="${sObj.htmlID}">${sObj.name}</label>
      <input
        type="number"
        name=""
        id="${sObj.htmlID}-servings"
        min="0"
        max="16"
        value="${sObj.servings}"
      />
      <input type="color" name="" id="${sObj.htmlID}-color" value="${sObj.color}"/>
    </div>
    `;
    if (sObj.timeFrame === "daily") {
      document.getElementById("daily-settings").appendChild(div);
    }
    else {
      document.getElementById("weekly-settings").appendChild(div);
    }
  });
}
// Save the number of servings currently in the form to localStorage
function saveSettings() {
  const modSettings = defaultSettings;
  modSettings.forEach(sObj => {
    sObj.servings = document.getElementById(`${sObj.htmlID}-servings`).value;
    sObj.color = document.getElementById(`${sObj.htmlID}-color`).value; 
  })
 
  localStorage.setItem("settings", JSON.stringify(modSettings));
}
