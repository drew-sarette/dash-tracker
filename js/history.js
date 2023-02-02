const mainContent = document.querySelector("main");
let days = JSON.parse(localStorage.getItem("days"));
let weeksWithDays = JSON.parse(localStorage.getItem("weeks"));

if (days && weeksWithDays) {

  weeksWithDays.sort(mostRecentFirst);
  days.sort(mostRecentFirst);
  let weekNum = weeksWithDays.length;
  weeksWithDays.forEach(w => {
    w.number = weekNum;
    weekNum--;
    w.days = [{ dayNo: 1, date: null, data: null },
    { dayNo: 2, date: null, data: null },
    { dayNo: 3, date: null, data: null },
    { dayNo: 4, date: null, data: null },
    { dayNo: 5, date: null, data: null },
    { dayNo: 6, date: null, data: null },
    { dayNo: 7, date: null, data: null }];
    w.days.forEach(wd => {
      wd.date = new Date(new Date(w.date).getTime() + (wd.dayNo - 1) * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
      wd.data = days.find(d => Date.getTime(new Date(d.date).setHours(0, 0, 0, 0)) === wd.date.getTime());
      console.log("hi");
      console.log(`Week: ${w.number} dayNo: ${wd.dayNo} data: ${wd.data}`);
    });
  });
}
else {
  mainContent.textContent = "No data found";
}
console.log(weeksWithDays);
function mostRecentFirst(a, b) {
  // sorts biggest (most recent) values first
  let [dateA, dateB] = [new Date(a.date).getTime(), new Date(b.date).getTime()];
  return dateB - dateA;
}

