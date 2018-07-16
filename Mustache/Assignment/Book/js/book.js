var _subjects = {
    "subjects" : ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "Android", "Python", "SQL", "Node JS"]
};
var _selectedSubject = _subjects["subjects"][0];
var _currentPage = 1;
var _initialPageNumber = 1;
var _totalPages = 0;
var _URL_API = "http://it-ebooks-api.info/v1/";
var _NUMBER_OF_PAGES = 10;
var _storeResponse = {};
var _tilesToShow = 4;

$(document).ready(function() {
    $("#search-button").on("click", searchBook);
    $("#search-field").on("keypress", searchBook);
    setBookCategory();
    var winWidth = $(window).width();
    _tilesToShow = (winWidth > 769) ? 4 : (winWidth < 769 && winWidth > 468) ? 3 : 1;
    _NUMBER_OF_PAGES = (winWidth < 468) ? 5 : 10;
    loadBooks();
});

function setBookCategory() {
    var list  = $("#subjects").html();
    $("#subjects").html(Mustache.to_html(list, _subjects));
    $("#subjects .category").on("click", getBookName);
    $(".category").eq(0).addClass("active");
};

function getBookName() {
    if($(this).children().text() != _selectedSubject) {
        $(this).siblings().removeClass("active");
        _selectedSubject = $(this).addClass("active").children().text();
        _initialPageNumber = 1;
        _currentPage = 1;
        loadBooks();
    }
};

function searchBook() {
    if (event.keyCode == 13 || event.button == 0 ) {
        var searchFor = $("#search-field").val();
        if(searchFor.length != 0 && searchFor != _selectedSubject) {
            _selectedSubject = $("#search-field").val();
            _initialPageNumber = 1;
            _currentPage = 1;
            $(".book-category").children().removeClass("active");
            loadBooks();
        }
    }
};

function loadBooks() {
    var xhr = $.ajax({
        method: "GET",
        url: _URL_API + "search/" + _selectedSubject + "/page/" + _currentPage,
        dataType: 'json',
        success: displayBook,
        beforeSend : function(){
                $("#book-collection").children().remove();
                $(".loader").fadeIn() }
    });
};

function displayBook(response) {
    var bookCollection = [];
    if(parseInt(response.Error)) {
        $(".loader").fadeOut(100,function() {
            $("#book-collection").append($("<div/>").addClass("error").text("Opps!!! Something went Wrong :("));
        });
    }
    else if(!parseInt(response.Total)) {
        bookCollection.push($("<div/>").addClass("error").text("Opps!!! Books not Found :("));
    } else {
        _storeResponse = response;
        var bookInfo = {};
        _totalPages = Math.floor(response.Total / 10) + 1;
        var book = $("#book-data");
        var row = "";
        for(var i = 0; i < _storeResponse.Books.length; i++) {
            bookInfo = _storeResponse.Books[i];
            var title = _storeResponse.Books[i].Title;
            bookInfo["shortTitle"] = (title.length > 50) ? title.substring(0,50) + "..." : title;
            var description = _storeResponse.Books[i].Description;
            bookInfo["shortDescription"] = (description.length > 120) ? description.substring(0, 120) + "..." : description;
             if(i % _tilesToShow == 0) {
                 row = $("<div/>").addClass("row");
             }
            row.append(Mustache.render(book.html(), bookInfo));
            bookCollection.push(row);
        }
        bookCollection.push(setPagination());
        $(".loader").fadeOut(100,function() {
            $("#book-collection").append(bookCollection);
            for(var i = 0; i < _storeResponse.Books.length; i++) {
                originalImage($(".book-image")[i], _storeResponse.Books[i].Image);
            }
        });
    }
};

function originalImage(bookImage, imgRef) {
    var downloadImage = $("<img/>");
    downloadImage.on("load", function() {
        bookImage.src = $(this).attr("src");
    });
    downloadImage.attr("src", imgRef);
};

function setRatingBar(event) {
    var clickStar = $(event.target);
    if(!clickStar.hasClass("star-checked")) {
        clickStar.parent().siblings().children().removeClass("star-checked fa-star").addClass("star-unchecked fa-star-o");
        clickStar.removeClass("star-unchecked fa-star-o").addClass("star-checked fa-star");
        clickStar.parent().prevAll().children().removeClass("star-unchecked fa-star-o").addClass("star-checked fa-star");
    } else {
        clickStar.parent().siblings().children().removeClass("star-checked fa-star").addClass("star-unchecked fa-star-o");
        clickStar.removeClass("star-checked fa-star").addClass("star-unchecked fa-star-o");
    }

};

function setFavourite(event) {
    $(event.target).toggleClass("heart-checked fa-heart heart-unchecked fa-heart-o");
};

function setPagination() {
    var pageNumber = _initialPageNumber;
    var paginationWrapper = $("<div/>").addClass("page-navigation");
    var pagination = $("<ul>").addClass("pagination");

    var previousClass = (_initialPageNumber < _NUMBER_OF_PAGES) ? "previous disabled" : "previous";
    pagination.append("<li class='" + previousClass + "' onclick='pageNavigate(\"previous\")' ><a>&laquo;</a></li>");

    for(var i = 0; i < _NUMBER_OF_PAGES && pageNumber <= _totalPages; i++) {
        var pageClass = (pageNumber == _currentPage) ? "page active" : "page";
        pagination.append("<li class='" + pageClass + "' onclick='pageNavigate(" + pageNumber + ")'><a>" + pageNumber++ + "</a></li>");
    }
    var nextClass = (pageNumber > _totalPages) ? "next disabled" : "next";
    pagination.append("<li class='" + nextClass + "' onclick='pageNavigate(\"next\")'><a>&raquo;</a></li>");
    return paginationWrapper.append(pagination);
};

function pageNavigate(direction) {
    if(direction === "next") {
        if(_initialPageNumber + _NUMBER_OF_PAGES <= _totalPages) {
            _initialPageNumber += _NUMBER_OF_PAGES;
            _currentPage = _initialPageNumber;
            loadBooks();
        }
    } else if(direction === "previous") {
        if(_initialPageNumber - _NUMBER_OF_PAGES > 0) {
            _initialPageNumber -= _NUMBER_OF_PAGES;
            _currentPage = _initialPageNumber;
            loadBooks();
        }
    } else {
        _currentPage = direction;
        loadBooks();
    }
};

function showBookDetail(bookId) {
    var bookInfo = {};
    for(var i = 0; i < _storeResponse.Books.length; i++) {
        if(bookId == _storeResponse.Books[i].ID) {
            bookInfo = _storeResponse.Books[i];
            break;
        }
    }
    var buttonRef = event.target;
    var modal = $("#modal-body");
    $(".modal-content").html(Mustache.to_html(modal.html(), bookInfo));
    $("#book-modal").on('hidden.bs.modal', function (e) {
        console.log(buttonRef);
        $(buttonRef).html("Detail <i class='fa fa-check'></i>");
    });
};
