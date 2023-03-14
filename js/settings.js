import settingsRepo from "./settings-repo.js";
document.getElementById("save-settings").addEventListener("click", saveSettings); 
document.getElementById("daily-settings").append(...createInputs(settingsRepo.getDailySettings()));
document.getElementById("weekly-settings").append(...createInputs(settingsRepo.getWeeklySettings()));

function createInputs(settings) {
  const inputs = [];
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
        max="5000"
        step="${sObj.step}"
        value="${sObj.servings}"
      />
      <input type="color" name="" id="${sObj.htmlID}-color" value="${sObj.color}"/>
    </div>
    `;
    inputs.push(div)
  });
  return inputs;
}
// Save the number of servings currently in the form to localStorage
function saveSettings() {
  const modSettings = settingsRepo.defaultSettings;
  modSettings.forEach(sObj => {
    sObj.servings = document.getElementById(`${sObj.htmlID}-servings`).value;
    sObj.color = document.getElementById(`${sObj.htmlID}-color`).value; 
  })
 
  localStorage.setItem("settings", JSON.stringify(modSettings));
  alert("Settings saved")
}
