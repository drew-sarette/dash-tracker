import datesRepo from "./dates-repo.js";

const dataRepo = {
    getDays: function () {
        const days = JSON.parse(localStorage.getItem("days"));
        return days ? days : null;      
    },

    saveDays: function (days) {
        localStorage.setItem("days", JSON.stringify(days));
    },

    getLastWeek: function () {
        let days = this.getDays() ? this.getDays() : [];
        const last7entries = days.slice(0, 7);
        //startDate is the day six days ago
        const startDate = datesRepo.addDaysToDate(datesRepo.justDate(), -5);
        return last7entries.filter( entry => {
            return datesRepo.compareDateArrs(startDate, entry.date) >= 0;
        });
    },
}

export default dataRepo;