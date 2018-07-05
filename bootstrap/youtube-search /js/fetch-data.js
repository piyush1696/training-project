
var KEY = "AIzaSyC0ZaRAqM08978begDEZF7Qm5L0pA1Njlo";
var MAX_RESULT = 12;
var count = 1;
var pageToken = "";
var nextPageToken = "";
var searchFor = "";
var videoBox = "";
var activeButton = 1;
var listOfPages = {};

document.getElementById("search-btn").addEventListener('click', searchVideo);
document.getElementById("search-text").addEventListener('keypress', searchVideo, false);

var list = document.getElementsByTagName("li");
for(let i = 1; i < list.length - 1; i++) {
    list[i].addEventListener('click',tabPageNumber);
}
//Default Call
loadOnSearch(searchFor, activeButton);

function loadOnSearch(searchQuery, pageNumber) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            displayList(response);
            nextPageToken = response.nextPageToken;
        }
    }
    var key = "p"+ pageNumber;
    if(listOfPages[key] == undefined) {
         pageToken = nextPageToken;
         listOfPages[[key]] = { "pageToken" :  pageToken }
    }
     else {
         pageToken = listOfPages[key]["pageToken"];
     }

    var REQUEST_LINK = "https://www.googleapis.com/youtube/v3/search?key=" + KEY + "&part=snippet&q=" + searchQuery + "&maxResults=" + MAX_RESULT + "&pageToken=" + pageToken;
    xmlhttp.open("GET", REQUEST_LINK);
    xmlhttp.send();
};

function displayList(responseData) {
    var imageURL = "images/default.png";
    var row;
    for(var  i = 0; i < responseData.items.length; i++) {
        var downloadImage = new Image();
        if(screen.width < 469) {
            //For Mobile
            if(i % 1 == 0){
                row = document.createElement("div");
                row.setAttribute("class","row");
            }
        }
        else if (screen.width >= 469 && screen.width < 769) {
            //For Tab View
            if(i % 3 == 0){
                row = document.createElement("div");
                row.setAttribute("class","row");
            }
        }
        else {
            //For Desktop view
            if(i % 4 == 0){
                row = document.createElement("div");
                row.setAttribute("class","row");
            }
        }

        imageURL = responseData.items[i].snippet.thumbnails.medium.url;

        var col = document.createElement("div");
        col.setAttribute("class","col-xs-12 col-sm-4 col-md-3");

        var thumbnail = document.createElement("div");
        thumbnail.setAttribute("class", "video thumbnail");
        thumbnail.setAttribute("title", responseData.items[i].snippet.title);

        var image = document.createElement("img");
        image.setAttribute("src", imageURL);
        image.setAttribute("class", "image img-responsive");
        image.setAttribute("alt", responseData.items[i].snippet.title);

        var contentWrapper = document.createElement("div");
        contentWrapper.setAttribute("class", "content-wrapper");

        var title = document.createElement("p");
        title.setAttribute("class", "title");
        title.appendChild(document.createTextNode(responseData.items[i].snippet.title));

        var description = document.createElement("p");
        description.setAttribute("class", "description");
        description.appendChild(document.createTextNode(responseData.items[i].snippet.description));

        contentWrapper.appendChild(title);
        contentWrapper.appendChild(description);

        thumbnail.appendChild(image);
        thumbnail.appendChild(contentWrapper);

        col.appendChild(thumbnail);

        row.appendChild(col)

        document.getElementById("content").appendChild(row);

    }
}

function searchVideo() {
    if (event.keyCode == 13 || event.button == 0 ) {
        searchFor = document.getElementById("search-text").value;
        count = 1;
        listOfPages = {};
        unselectPage(activeButton);
        activeButton = 1;
        selectPage(activeButton);
        document.getElementById("content").innerHTML = "";
        if(searchFor.length != 0) {
            loadOnSearch(searchFor, activeButton);
        }
        console.log(listOfPages);
    }
}

function tabPageNumber(event) {
    var nextActiveButton = parseInt(event.path[0].innerHTML);
    if(activeButton != nextActiveButton) {
        console.log(listOfPages);
        unselectPage(activeButton);
        activeButton = nextActiveButton;
        selectPage(activeButton);
        loadOnSearch(searchFor, activeButton);
        document.getElementById("content").innerHTML = "";
    }
}

function unselectPage (pageNumber) {
    list[pageNumber].setAttribute("class","");
}

function selectPage (pageNumber) {
    list[pageNumber].setAttribute("class","active");
}

setInterval(function() {
    var online = navigator.onLine;
    if(online) {
        document.getElementById("offline-state").style.display = "none";
    }
    else {
        document.getElementById("offline-state").style.display = "block";
    }
}, 1000);
