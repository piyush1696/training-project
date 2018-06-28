
var dayString = ['Sunday', 'Monday', 'Tuesday', 'Wedneday', 'Thrusday', 'Friday', 'Saturday'];
var monthString = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var tempString = "";
var list = "";

var startDate = null;
var endDate = null;


var totalDays = 0;

var todayDate = new Date();
var currentYear = todayDate.getFullYear();
var currentMonth = todayDate.getMonth();

//By default Method
setCalendar();

document.getElementById("year").addEventListener("click", function(){
    alert("hello")
});

function setCalendar() {
    document.getElementById("date-range").innerHTML = "";
    var thisMonth = new Date(currentYear, currentMonth, 1);
    var thisMonthLastDate = new Date(currentYear, currentMonth + 1, 0);
    var lastMonth = new Date(currentYear, currentMonth, 0);
    var counter;
    tempString = "<tr>";

    if(lastMonth.getDay() != 6){
        counter = (lastMonth.getDay() + 1) + (thisMonthLastDate.getDate() - thisMonth.getDate() + 1) + (6 - thisMonthLastDate.getDay());
    }
    else {
        counter = (thisMonthLastDate.getDate() - thisMonth.getDate() + 1) + (6 - thisMonthLastDate.getDay());
    }
    var local ;
    var shouldAdd = 0;
    var dateLocal ;
    var weekMonth = week(thisMonth) ;
    for(var i = 0; i < counter; i++ )
    {
            if(i % 7 == 0) {
                tempString += "</tr><tr><td class='week'>" + weekMonth++ + "</td>"
            }
            shouldAdd = (thisMonth.getDay != 0) ?  thisMonth.getDay() : 0 ;  // check whether month start is from sunday

            if(i <= lastMonth.getDay() && thisMonth.getDay() !=0) {
                local = lastMonth.getDate() - lastMonth.getDay() + i; //Previous Month number date
                dateLocal = new Date(currentYear,currentMonth - 1, local); //Previous Month Date Object
                tempString += "<td title ='" + dateLocal.toDateString() + "' class='hidden-month' >" + "<div class='date'>" +
                    dateLocal.getDate() +
                        "</div> " +
                        "<div class='events'> " +
                            "<div class='circle red'></div>" +
                            "<div class='circle yellow'></div>" +
                            "<div class='circle green'></div>" +
                        "</div>  </td>";
            }

            else if(i < ( (thisMonthLastDate.getDate() - thisMonth.getDate() + 1) + shouldAdd )) {

                local = (thisMonth.getDay() == 0) ? (i + 1) : (i - lastMonth.getDay());
                dateLocal = new Date(currentYear,currentMonth,local);

                var className = (dateLocal.getDate() == new Date().getDate() && dateLocal.getMonth() == new Date().getMonth()
                                && dateLocal.getFullYear() == new Date().getFullYear()) ? 'date current-date' : 'date';
                var extraData = "id = 'date-" + dateLocal.getDate() + "-" + dateLocal.getMonth() + "-" + dateLocal.getFullYear() + "' onclick='select(" + dateLocal.getDate() + ")'" ;
            //    tempString += "<td title ='" + dateLocal.toDateString()+ "' " + extraData + "' class='" + className + "' >" + dateLocal.getDate() + "</td>";

                tempString += "<td title ='" + dateLocal.toDateString() + "' class='" + className + "' " + extraData + " >" + "<div class='date'>" +
                    dateLocal.getDate() +
                        "</div> " +
                        "<div class='events'> " +
                            "<div class='circle red'></div>" +
                            "<div class='circle yellow'></div>" +
                            "<div class='circle green'></div>" +
                        "</div>  </td>";

            }

            else if(thisMonthLastDate.getDay() != 6) {
                local = i - thisMonthLastDate.getDate() - thisMonth.getDay() + 1;
                dateLocal = new Date(currentYear, currentMonth + 1 ,local);
                tempString += "<td title ='" + dateLocal.toDateString() + "' class='hidden-month' >" + "<div class='date'>" +
                    dateLocal.getDate() +
                        "</div> " +
                        "<div class='events'> " +
                            "<div class='circle red'></div>" +
                            "<div class='circle yellow'></div>" +
                            "<div class='circle green'></div>" +
                        "</div>  </td>";
            }
    }

    document.getElementById("year").innerHTML = currentYear;
    document.getElementById("month").innerHTML = monthString[currentMonth];
    document.getElementById("display-dates").innerHTML = tempString;
 }

function previousYear() {
    currentYear--;
    todayDate.setFullYear(currentYear);
    setCalendar();
}

function nextYear() {
    currentYear++;
    todayDate.setFullYear(currentYear);
    setCalendar();
}

function previousMonth() {
    currentMonth--;
    if(currentMonth < 0) {
        currentYear--;
        currentMonth = 11;
    }
    todayDate.setMonth(currentMonth);
    setCalendar();
}

function nextMonth() {
    currentMonth++;
    if(currentMonth >= 12) {
        currentMonth = 0;
        currentYear++;
    }
    todayDate.setMonth(currentMonth);
    setCalendar();
}

function select(date) {
    if(startDate == null) {
        list = "";
        setCalendar();
        startDate = new Date(currentYear, currentMonth, date);
        setColor(startDate);
    }
    else if(endDate == null) {
        endDate = new Date(currentYear, currentMonth, date);

        if(startDate.getDate() > endDate.getDate()) {
            var tempDate = startDate;
            startDate = endDate;
            endDate = tempDate;
        }

        for(i = startDate.getDate(); i <= endDate.getDate(); i++) {
            tempDate = new Date(startDate.getFullYear(),startDate.getMonth(),i);
            list += "<li>" + tempDate.getDate() + " " + monthString[tempDate.getMonth()] + " " + tempDate.getFullYear() + " - " + dayString[tempDate.getDay()] + "</li>";
            setColor(tempDate);
        }
    }
    if(startDate != null && endDate != null){
        startDate = null;
        endDate = null;
    }

    document.getElementById("date-range").innerHTML = list;
}

function setColor(selectedDate) {

    var temp = selectedDate.getDate() + "-" + selectedDate.getMonth() + "-" + selectedDate.getFullYear();
    document.getElementById("date-" + temp ).style.backgroundColor = "#64B5F6";
    document.getElementById("date-" + temp ).style.color = "#FFFFFF";

    if(selectedDate.getDate() == new Date().getDate() && selectedDate.getMonth() == new Date().getMonth()
            && selectedDate.getFullYear() == new Date().getFullYear()) {
            document.getElementById("date-" + temp ).style.backgroundColor = "#01579B";
        }





}

function week(weekDate) {
    totalDays = 0;
    for( i = 0; i < weekDate.getMonth(); i++) {
        firstDate = new Date(weekDate.getFullYear(), i, 1);
        lastDate = new Date(weekDate.getFullYear(), i+1, 0);
        totalDays += (lastDate.getDate()-firstDate.getDate()) + 1;
    }
    totalDays += weekDate.getDate()
    totalDays = Math.floor(totalDays / 7) + 1 ;
    return  totalDays ;
}
