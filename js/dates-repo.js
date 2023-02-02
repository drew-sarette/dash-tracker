export const datesRepo = {
    justDate: function (date) {
        if (Array.isArray(date) && date.length === 7) { 
            return date.slice(0, 3);
        }
        else {
            console.log("Err: Input was not a valid date array.");
        }
    },

    justTime: function (date) {
        if (Array.isArray(date) && date.length === 7) { 
            return date.slice(3);
        }
        else {
            console.log("Err: Input was not a valid date array.");
        }
    },

    fullDateArray: function (dateObj) {
        return [dateObj.getFullYear(), dateObj.getMonth() + 1 , dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds(), dateObj.getMilliseconds()];
    },

    dateObjFromArray: function (dateArray) {
        let monthAt0 = [...dateArray];
        monthAt0[1]--;
        return new Date(...monthAt0);
    },

    addDaysToDate: function (dateArr, days) {
        const dateArrInMS = this.dateObjFromArray(dateArr).getTime();
        const daysInMS = days * 24 * 60 * 60 * 1000;
        const rInMS = daysInMS + dateArrInMS;
        const rDate = new Date(rInMS);
        return this.fullDateArray(rDate);
    },

    compareDateArrs: function (dateArr1, dateArr2) {
        const [date1, date2] = [this.dateObjFromArray(dateArr1), this.dateObjFromArray(dateArr2)];
        const t = date2.getTime() - date1.getTime();
        if (t > 0) {
            // date 2 is after date 1
            return 1;
        }
        else if (t < 0) {
            return -1;
        }
        else {
            return 0
        }
    }
    
};