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

    dateObjFromArray: function (fullDateArray) {
        fullDateArray[1] -= 1; //convert from month number to 0 index.
        return new Date(...fullDateArray);
    },
    
    countDaysFromDate: function (dateArr, days) {
        const daysInMS = days * 24 * 60 * 60 * 1000;
        const dateObj = this.dateObjFromArray(dateArr);
        const resDateObj = new Date(dateObj.getTime() + daysInMS);
        return this.fullDateArray(resDateObj);
    },

    addDaysToDate: function (dateArr, days) {
        const dateArrInMS = this.dateObjFromArray(dateArr).getTime();
        const daysInMS = days * 24 * 60 * 60 * 1000;
        const rInMS = daysInMS + dateArrInMS;
        const rDate = new Date(rInMS);
        return this.fullDateArray(rDate);
    }
};