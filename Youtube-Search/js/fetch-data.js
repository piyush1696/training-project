
var KEY = "AIzaSyC0ZaRAqM08978begDEZF7Qm5L0pA1Njlo";
var MAX_RESULT = 12;
var count = 1;
var nextPage = "";
var searchFor = "";
var videoBox = "";
document.getElementById("search-btn").addEventListener('click', searchVideo);
document.getElementById("search-text").addEventListener('keypress', keyStroke, false);

loadOnSearch(searchFor);

function keyStroke() {
    var x = event.keyCode;
    if (x == 13) {
        searchVideo();
    }
}

function loadOnSearch(searchQuery) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log(this.readyState);
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.response);
            displayList(response);
            nextPage = response.nextPageToken;
        }
    }
    var REQUEST_LINK = "https://www.googleapis.com/youtube/v3/search?key=" + KEY + "&part=snippet&q=" + searchQuery + "&maxResults=" + MAX_RESULT + "&pageToken=" + nextPage;
    xmlhttp.open("GET", REQUEST_LINK);
    xmlhttp.send();

};

function displayList(responseData) {
    var imageURL = "images/default.png";
    for(var i = 0; i < responseData.items.length; i++) {
        var downloadImage = new Image();
        var videoBox = document.createElement("div");
        videoBox.setAttribute("class", "video-box");
        videoBox.setAttribute("title", responseData.items[i].snippet.title);
        var image = document.createElement("img");
        image.setAttribute("src", imageURL);
        image.setAttribute("class", "video-thumnail-img");
        image.setAttribute("alt", responseData.items[i].snippet.thumbnails.medium.url);
        var data = document.createElement("div");
        data.setAttribute("class", "data");

        var videoTitle = document.createElement("div");
        videoTitle.setAttribute("class", "video-title");
        videoTitle.appendChild(document.createTextNode(responseData.items[i].snippet.title));

        var videoDescription = document.createElement("div");
        videoDescription.setAttribute("class", "video-description");
        videoDescription.appendChild(document.createTextNode(responseData.items[i].snippet.description));

        data.appendChild(videoTitle);
        data.appendChild(videoDescription);
        videoBox.appendChild(image);
        videoBox.appendChild(data);
        document.getElementById("content").appendChild(videoBox);

        downloadImage.onload = function() {
            imageURL = this.src;
            document.getElementsByTagName("img")[count].src = imageURL;
            count++;
        };

        downloadImage.src = responseData.items[i].snippet.thumbnails.medium.url;

    }
}

function searchVideo() {
    searchFor = document.getElementById("search-text").value;
    count = 1;
    if(searchFor.length != 0) {
        loadOnSearch(searchFor);
    }
    document.getElementById("content").innerHTML = "";
}

window.onscroll = function() { screenScroll() };

function screenScroll() {
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        loadOnSearch(searchFor);
    }
}

setInterval(function() {
    var online = navigator.onLine;
    if(online) {
        document.getElementById("offline-stat").style.display = "none";
    }
    else {
        document.getElementById("offline-stat").style.display = "block";
    }

    console.log(navigator.battery);
}, 1000);
