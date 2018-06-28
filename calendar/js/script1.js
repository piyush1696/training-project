
var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wedneday', 'Thrusday', 'Friday', 'Saturday'];
var monthName = ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var dateRangeList = "";
var startDate = null;
var endDate = null;
var count = 0;
var todayDate = new Date();
var currentYear = todayDate.getFullYear();
var currentMonth = todayDate.getMonth();

function Birthday(name, date) {
    this.name = name;
    this.date = date;
}

var birthdDates = [
     new Birthday ("Shubham Katariya", new Date(1995,0,3)),
     new Birthday ("Vipin Joshi", new Date(1946,0,15)),
     new Birthday ("Shikha Shakarwar", new Date(1994,0,15)),
     new Birthday ("Darshan", new Date(1997,0,15)),
     new Birthday ("Gurpreet Chhabra", new Date(1995,3,2)),
     new Birthday ("Sonam Ravi Gupta", new Date(1987,3,22)),
     new Birthday ("Siyaram Patidar", new Date(1985,4,3)),
     new Birthday ("Shubham Choubey", new Date(1993,4,8)),
     new Birthday ("Mayur Vaidya", new Date(1994,4,9)),
     new Birthday ("Amit Nagar", new Date(1986,4,10)),
     new Birthday ("Deepak Patidar", new Date(1990,4,10)),
     new Birthday ("Rahul Kulmi", new Date(1988,4,28)),
     new Birthday ("Vishal Patidar", new Date(1994,5,20)),
     new Birthday ("Awanish Tiwari", new Date(1974,6,6)),
     new Birthday ("Surendra Patidar", new Date(1988,6,21)),
     new Birthday ("Anjana Singh", new Date(1992,6,24)),
     new Birthday ("Aditiya Paliwal", new Date(1994,7,8)),
     new Birthday ("Varsha Tyagi", new Date(1992,9,13)),
     new Birthday ("Rashmi Soni", new Date(1993,9,19)),
     new Birthday ("Priyanshi Asawara", new Date(1993,10,19)),
     new Birthday ("Shashank Saxena", new Date(1990,11,11)),
     new Birthday ("Nitesh Thakhur", new Date(1990,11,12)),
     new Birthday ("Satya Naryan Patidar", new Date(1983,11,12)),

 ];

//By default Method
setCalendar();
setBirthday();

function setCalendar() {
    var presentMonthFirstDate = new Date(currentYear, currentMonth, 1);
    var presentMonthLastDate = new Date(currentYear, currentMonth + 1, 0);
    var previousMonthLastDate = new Date(currentYear, currentMonth, 0);
    var totalBlock = 0;
    var tempCalculation = 0;
    var presentMonthStartDay = 0;
    var dateLocal = null;
    var tempBlockElement = "";
    var weekNumber = getWeekCount(presentMonthFirstDate);
    totalBlock = (presentMonthLastDate.getDate() - presentMonthFirstDate.getDate() + 1) + (6 - presentMonthLastDate.getDay());
    totalBlock = (previousMonthLastDate.getDay() != 6) ? totalBlock + (previousMonthLastDate.getDay() + 1) : totalBlock;
    for (var i = 0; i < totalBlock; i++) {
            if(i % 7 == 0) {
                tempBlockElement += "<div class='date-container '> " +
                                    "<div class='week'> " +
                                        weekNumber++ +
                                    "</div>" +
                                "</div>";
            }
            presentMonthStartDay = (presentMonthFirstDate.getDay() != 0) ?  presentMonthFirstDate.getDay() : 0;  // check whether month start from sunday
            if(i <= previousMonthLastDate.getDay() && presentMonthFirstDate.getDay() != 0) {   // Display previous month dates
                tempCalculation = previousMonthLastDate.getDate() - previousMonthLastDate.getDay() + i; //Previous Month number dates to print
                dateLocal = new Date(currentYear, currentMonth - 1, tempCalculation); //Previous Month Date Object
                tempBlockElement += "<div title='" + dateLocal.toDateString() + "' class='date-container hidden-month'> " +
                                    "<div class='date'> " + dateLocal.getDate() + "</div>" +
                                    "</div>";
            } else if(i < ((presentMonthLastDate.getDate() - presentMonthFirstDate.getDate() + 1) + presentMonthStartDay)) {  //Display current month dates
                tempCalculation = (presentMonthFirstDate.getDay() == 0) ? (i + 1) : (i - previousMonthLastDate.getDay());
                dateLocal = new Date(currentYear, currentMonth, tempCalculation);   //Present Month Date Object
                var className = (dateLocal.getDate() == new Date().getDate() && dateLocal.getMonth() == new Date().getMonth()
                                  && dateLocal.getFullYear() == new Date().getFullYear()) ? 'date current-date' : 'date';
                var tempIdName = dateLocal.getDate() + "-" + dateLocal.getMonth() + "-" + dateLocal.getFullYear();
                var extraData = "onclick='selectDateRange(" + dateLocal.getDate() + ")'" ;
                tempBlockElement +=  "<div title='" + dateLocal.toDateString()+ "' "+ "class='date-container' " + extraData + ">" +
                                     "<div class='" + className + "' id='date-" + tempIdName + "'> " + dateLocal.getDate() + "</div>" +
                                     "</div>";
            } else if(presentMonthLastDate.getDay() != 6) {    //Display next month dates
                tempCalculation = i - presentMonthLastDate.getDate() - presentMonthFirstDate.getDay() + 1;
                dateLocal = new Date(currentYear, currentMonth + 1, tempCalculation);   //Next Month Date Object
                tempBlockElement += "<div title='" + dateLocal.toDateString()+ "' " +"class='date-container hidden-month'> " +
                                    "<div class='date'> " + dateLocal.getDate() + "</div>" +
                                    "</div>";
            }
            document.getElementById("display-dates").innerHTML = tempBlockElement;
    }
    document.getElementById("year").innerHTML = currentYear;
    document.getElementById("month").innerHTML = monthName[currentMonth];
 }

function selectDateRange(date) {
    if (startDate == null) {
        startDate = new Date(currentYear, currentMonth, date);
        setColor(startDate);
    } else if (endDate == null) {
        endDate = new Date(currentYear, currentMonth, date);
        if (startDate.getDate() > endDate.getDate()) {
            tempDate = startDate;
            startDate = endDate;
            endDate = tempDate;
        }
        if (startDate.getMonth() == endDate.getMonth()) {
            for (i = startDate.getDate(); i <= endDate.getDate(); i++) {
                tempDate = new Date(startDate.getFullYear(),startDate.getMonth(),i);
                dateRangeList += "<li>" + tempDate.getDate() + " " + monthName[tempDate.getMonth()] + " " + tempDate.getFullYear() + " - " + dayName[tempDate.getDay()] + "</li>";
                setColor(new Date(currentYear, currentMonth, i));
            }
        }
    } else {
        startDate = null;
        endDate = null;
        setCalendar();
        setBirthday();
        selectDateRange(date);
    }

    document.getElementById("date-range").innerHTML = dateRangeList;
}

function setColor(selectedDate) {
    var tempIdName = selectedDate.getDate() + "-" + selectedDate.getMonth() + "-" + selectedDate.getFullYear();
    document.getElementById("date-" + tempIdName ).style.backgroundColor = "#64B5F6";
    document.getElementById("date-" + tempIdName ).style.color = "#FFFFFF";
    document.getElementById("date-" + tempIdName ).style.opacity = ".5";
    if (selectedDate.getDate() == new Date().getDate() && selectedDate.getMonth() == new Date().getMonth()
       && selectedDate.getFullYear() == new Date().getFullYear()) {
           document.getElementById("date-" + tempIdName ).style.opacity = "1";
    }
}

function getWeekCount(firstDate) {
    var totalDays = 0;
    for (i = 0; i < firstDate.getMonth(); i++) {
        var firstDate = new Date(firstDate.getFullYear(), i, 1);
        var lastDate = new Date(firstDate.getFullYear(), i+1, 0);
        totalDays += (lastDate.getDate()-firstDate.getDate()) + 1;
    }
    totalDays += firstDate.getDate()
    totalDays = Math.floor(totalDays / 7) + 1 ;
    return  totalDays;
}

function setBirthday() {
    for (var i = 0; i < birthdDates.length; i++) {
        if (birthdDates[i].date.getMonth() == currentMonth) {
             var tempIdName = birthdDates[i].date.getDate() + "-" + currentMonth + "-" + currentYear;
             var element = document.getElementById("date-" + tempIdName);
             element.innerHTML += "<div class='circle color' onclick='showBirthday(event," + birthdDates[i].date.getDate() + ")'> </div>" ;  //
         }
    }
}

function showBirthday(event, date) {
    event.stopPropagation();
    var personNames = "";
    var birthDate = new Date(currentYear, currentMonth, date);
    for (var i = 0; i < birthdDates.length; i++){
        if (birthdDates[i].date.getMonth() == birthDate.getMonth() && birthdDates[i].date.getDate() == birthDate.getDate()) {
            personNames += birthdDates[x].name + "\n";
        }
    }
    alert(personNames);
}

function previousYear() {
    currentYear--;
    todayDate.setFullYear(currentYear);
    setCalendar();
    setBirthday();
}

function nextYear() {
    currentYear++;
    todayDate.setFullYear(currentYear);
    setCalendar();
    setBirthday();
}

function previousMonth() {
    currentMonth--;
    if(currentMonth < 0) {
        currentYear--;
        currentMonth = 11;
    }
    todayDate.setMonth(currentMonth);
    setCalendar();
    setBirthday();
}

function nextMonth() {
    currentMonth++;
    if(currentMonth >= 12) {
        currentMonth = 0;
        currentYear++;
    }
    todayDate.setMonth(currentMonth);
    setCalendar();
    setBirthday();
}
