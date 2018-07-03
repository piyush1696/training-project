var p=5;
q=10;

alert("hey man");
function sum( a, b) {
    return a + b;
}
var minus = function (num1, num2) {
    return num1 - num2;
}
console.log(sum(20, 10));
console.log(minus(10, 5));

function table(num) {
    for (var i = 1 ; i <= 10 ; i++ ) {
        console.log(num + " x " + i + " = " + num * i );
    }
}

function lessThan( num1, num2) {
    return num1 < num2;
}

function moreThan( num1, num2) {
    return num1 > num2;
}


function equalTo( num1, num2) {
    return num1 == num2;
}

function evenOrodd(num) {
    if(num % 2 == 0 ) {
        console.log(num +" is even. ")
    }
    else {
        console.log(num +" is odd. ")
    }
}

function week( weekNum ) {
    switch( weekNum ){
        case 1: console.log("Monday");
                break;
        case 2: console.log("Tuesday");
                break;
        case 3: console.log("Wednesday");
                break;
        case 4: console.log("Thrusday");
                break;
        case 5: console.log("Friday");
                break;
        case 6: console.log("Saturday");
                break;
        case 7: console.log("Sunday");
                break;
    }
}
