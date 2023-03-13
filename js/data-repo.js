import datesRepo from "./dates-repo.js";
const dataRepo = {
    getToday: function () {
        const today = JSON.parse(localStorage.getItem("today"));
        return today ? today : null;
    },

    saveToday: function (today) {
        localStorage.setItem("today", JSON.stringify(today));
    },

    getDays: function () {
        const days = JSON.parse(localStorage.getItem("days"));
        return days ? days : null;      
    },

    saveDays: function (days) {
        localStorage.setItem("days", JSON.stringify(days));
    },

    getLastWeek: function () {
        const days = this.getDays() ? this.getDays() : [];
        const week = [];
        const day1ofWeek = datesRepo.addDaysToDate(datesRepo.justDate, -7);
        for (let i = 0; i < 7; i++) {
            if (datesRepo.compareDateArrs(day1ofWeek, days[i].date) >= 0) {
                week.push(days[i]);
            }
        }
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