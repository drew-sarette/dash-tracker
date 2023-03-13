import datesRepo from "./dates-repo.js";
import testDays from "./testDays.js";

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
        days = testDays.reverse();
        const last7entries = days.slice(0, 7);
        //startDate is the day six days ago
        const startDate = datesRepo.addDaysToDate(datesRepo.justDate(), -5);
        const week = [];
        last7entries.forEach(entry => {
            if (datesRepo.compareDateArrs(startDate, entry.date) >= 0) {
                week.push(entry);
            }
        })
        console.log(week);
        return week;
    },

    getAllWeeks: function() {
        const weeks = [];
        const days = this.getDays() ? this.getDay() : [];
        for (let i = 0; i<7; i++){
            const nextDate = datesRepo.addDaysToDate(newWeek.date, i)
            newWeek.days.push(createNewDay(nextDate));
        };

    }
}

export default dataRepo;