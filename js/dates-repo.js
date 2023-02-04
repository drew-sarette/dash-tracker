export const datesRepo = {
    
    fullDateArray: function (dateObj) {
        return [dateObj.getFullYear(), dateObj.getMonth() + 1 , dateObj.getDate(), dateObj.getHours(), dateObj.getMinutes(), dateObj.getSeconds(), dateObj.getMilliseconds()];
    },

    justDate: function (date) {
        if (Array.isArray(date) && date.length === 7) { 
            return date.slice(0, 3);
        }
        else if (Object.prototype.toString.call(date) === '[object Date]'){
            const arr = this.fullDateArray(date);
            return arr.slice(0, 3);
        }
        else if (typeof date === "undefined" || date === null) {
            const arr = this.fullDateArray(new Date());
            return arr.slice(0, 3);
        }
        else {
            console.log(`Error: ${date} is not a date object, null, undefined, or a properly formatted date array.`);
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

    dateObjFromArray: function (dateArray) {
        const copy = dateArray;
        // Absent month/day defaults to 1, not 0
        copy[1] = copy[1] ? copy[1] - 1 : 0;
        if (!copy[2] || copy[2] === 0) {copy[2] = 1}
        return new Date(...copy);
    },

    addDaysToDate: function (dateArr, days) {
        const arrLength = dateArr.length;
        const dateArrInMS = this.dateObjFromArray(dateArr).getTime();
        const daysInMS = days * 24 * 60 * 60 * 1000;
        const rInMS = daysInMS + dateArrInMS;
        const rDate = new Date(rInMS);
        if (arrLength === 3) {
            return this.justDate(this.fullDateArray(rDate));
        }
        else {
            return this.fullDateArray(rDate);
        }
    },

    compareDateArrs: function (dateArr1, dateArr2) {
        // Compares two dates, with or without time. dateArr = [YYYY, MM, DD] || [YYYY, MM, DD, h, m, s, ms]
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