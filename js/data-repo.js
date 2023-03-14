import datesRepo from "./dates-repo.js";
import testDays from "./testDays.js";

const dataRepo = {
    getDays: function () {
        let days = JSON.parse(localStorage.getItem("days"));
        // days = testDays.reverse();
        return days ? days : null;      
    },

    saveDays: function (days) {
        localStorage.setItem("days", JSON.stringify(days));
    },

    getLastWeek: function () {
        let days = this.getDays() ? this.getDays() : [];
        // days = testDays.reverse();
        const last7entries = days.slice(0, 7);
        //startDate is the day six days ago
        const startDate = datesRepo.addDaysToDate(datesRepo.justDate(), -5);
        return last7entries.filter( entry => {
            return datesRepo.compareDateArrs(startDate, entry.date) >= 0;
        });
    },
}

export default dataRepo;