
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

var birthdates = {
    "January" : [{"name" : "Shubham Katariya" , "date" : "3-1-1995"},
                 {"name" : "Vipin Joshi" , "date" : "15-1-1946"},
                 {"name" : "Shikha Shakarwar" , "date" : "15-1-1994"},
                 {"name" : "Darshana" , "date" : "15-1-1997"} ],
    "Febraury" : [],
    "March" : [],
    "April" : [{"name" : "Gurpreet Chhabra", "date" : "2-4-1995"},
               {"name" : "Sonam Ravi Gupta", "date" : "22-4-1987"} ],
    "May" : [{"name" : "Siyaram Patidar", "date" : "3-5-1985"},
             {"name" : "Shubham Choubey", "date" : "9-5-1993"},
             {"name" : "Mayur Vaidya", "date" : "9-5-1994"},
             {"name" : "Amit Nagar", "date" : "10-5-1986"},
             {"name" : "Deepak Patidar", "date" : "10-5-1990"},
             {"name" : "Rahul Kulmi", "date" : "28-5-1988"} ],
    "June" : [{"name" : "Vishal Patidar", "date" : "20-6-1994"} ],
    "July" : [ {"name" : "Awanish Tiwari", "date" : "6-7-1974"},
               {"name" : "Surendra Patidar", "date" : "21-7-1988"},
               {"name" : "Anjana Singh", "date" : "24-7-1992"} ],
    "August" : [{"name" : "Aditiya Paliwal", "date" : "8-7-1994"} ],
    "September" : [{"name" : "Varsha Tyagi", "date" : "13-9-1992"} ,
                   {"name" : "Rashmi Soni", "date" : "19-9-1993"},
                   {"name" : "Rupak", "date" : "22-9-1995"} ],
    "October" : [{"name" : "Priyanshi Asawara", "date" : "19-10-1993"} ,
                 {"name" : "Piyush ", "date" : "16-10-1996"} ],
    "November" : [],
    "December" : [{"name" : "Shashank Saxena", "date" : "11-12-1990"} ,
                  {"name" : "Nitesh Thakhur", "date" : "12-12-1990"} ,
                  {"name" : "Satya Naryan Patidar", "date" : "12-12-1983"} ]
};

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
                                    "<div class='week'> " + weekNumber++ + "</div>" +
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
            //    tempDate = new Date(startDate.getFullYear(),startDate.getMonth(),i);
            //    dateRangeList += "<li>" + tempDate.getDate() + " " + monthName[tempDate.getMonth()] + " " + tempDate.getFullYear() + " - " + dayName[tempDate.getDay()] + "</li>";
                setColor(new Date(currentYear, currentMonth, i));
            }
            dateRangeList = startDate.getDate() + " " + monthName[startDate.getMonth()] + " - " + endDate.getDate() + " " + monthName[startDate.getMonth()];
        }
    } else {
        startDate = null;
        endDate = null;
        setCalendar();
        setBirthday();
        selectDateRange(date);
        dateRangeList = "";
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

function getWeekCount(selectedDate) {
    var totalDays = 0;
    for (i = 0; i < selectedDate.getMonth(); i++) {
        var lastDate = new Date(selectedDate.getFullYear(), i+1, 0);
        totalDays += lastDate.getDate();
    }
    totalDays += selectedDate.getDate();
    totalDays = Math.floor(totalDays / 7) + 1 ;
    return  totalDays;
}

function setBirthday() {
    for(var i = 0; i < birthdates[monthName[currentMonth]].length; i++) {
        var str = birthdates[monthName[currentMonth]][i].date;
        var tempIdName = str.substring(0,str.indexOf('-')) + "-" + currentMonth + "-" + currentYear;
        var element = document.getElementById("date-" + tempIdName);
        element.innerHTML += "<div class='circle color' onclick='showBirthday(event," + str.substring(0,str.indexOf('-')) + ")'> </div>" ;  //
    }
}

function showBirthday(event, date) {
    event.stopPropagation();
    var personNames = "";
    var birthDate = new Date(currentYear, currentMonth, date);
    for(var i = 0; i < birthdates[monthName[currentMonth]].length; i++) {
        var str = birthdates[monthName[currentMonth]][i].date;
        if (str.substring(0,str.indexOf('-')) == birthDate.getDate()) {
            personNames += birthdates[monthName[currentMonth]][i].name + "\n";
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
