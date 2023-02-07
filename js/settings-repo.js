const settingsRepo = {
  defaultSettings: [
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
  ],

  getSettings: function (){
    try {
        const foundSettings = JSON.parse(localStorage.getItem("settings"));
        if (!foundSettings){ throw new Error("Settings not found, using defaults.")};
        return foundSettings;
      } catch (error) {
        console.log(error.message);
        return defaultSettings;
      }
  },

  getDailySettings: function () {
    return this.getSettings().filter( s => s.timeFrame === "daily");
  },

  getWeeklySettings: function () {
    return this.getSettings().filter( s => s.timeFrame === "weekly")
  }

}

export { settingsRepo }