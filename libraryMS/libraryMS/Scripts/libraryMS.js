/**
 * @author Junior
 */
//current selection
var dropDownSelection = "";

//Helpers
var isbnIndex = 5; //TODO delete me...
var checkedCount = 0;
var head_class = "head";
var isbn_class = "isbn";
var checkbox_class = "checkbox";
/**
 * Attach listeners when the DOM gets fully loaded.
 */
$("document").ready(function () {
    //react on drop down list selection
    $("select").change(function () {
        var selection = $("select").val();
        $.ajax({
            url:  '/LMS/GetData',
            type: 'GET',
            dataType: 'json',
            cache: false,
            data: {param: selection},
            success: function(response){
                processResult(response);
            },   
        });
        dropDownSelection = selection;
        updateToolBar(selection);
    });
    //react when user click the add button
    $("#add_btn").click(function () {
        handleAddClicked();
    });

    //react when user click the borrow button
    $("#borrow_btn").click(function () {
        handleBorrowClicked();
    });

    //react when user click the return button
    $("#return_btn").click(function () {
        handleReturnCicked();
    });
});

/**
 * Update the tool bar.
 * Show or hide some buttons depending
 * on the user selection.
 */
function updateToolBar(param) {
   if (param == "AvailableBook") {
        $("#borrow_btn").show();
        $("#return_btn").hide();

    } else if (param == "BorrowedBook") {
        $("#borrow_btn").hide();
        $("#return_btn").show();

    } else {
        $("#borrow_btn").hide();
        $("#return_btn").hide();
    }
}
/*
 * Update the status bar based on the dropdown list selection.
 */
function updateStatus(param,itemCount) {
    if(param == "AllBook"){
        $("#status_bar").text("All books: " + itemCount + " elements shown");
    }else if(param == "AvailableBook"){
        $("#status_bar").text("All available books: "+ itemCount + " elements shown");
    } else if (param == "BorrowedBook") {
        $("#status_bar").text("Borrowed books: " + itemCount + " elements shown");
    } else if (param == "Categogry") {
        $("#status_bar").text("All categories: " + itemCount + " elements shown");
    } else if (param == "History") {
        $("#status_bar").text("Your current history");
    } else {
        $("#status_bar").text("");
    }
}

function processResult(response) {
    if(response == null || response.length <= 0){
        $("#content_table").hide();
        $("#output_pane").show();
        $("#output_pane").text("Sorry,there is no data to display");
        updateStatus(dropDownSelection,"");
    } else {
        $("#output_pane").hide();
        $("#content_table").show();
        if (dropDownSelection.indexOf("Book") != -1) {
            doShowBook(response);
        } else if (dropDownSelection.indexOf("Categogry") != -1) {
            doShowCategory(response);
        } else if (dropDownSelection.indexOf("History") != -1) {
            doShowHistory(response);
        }
        updateStatus(dropDownSelection, response.length);
    }
    
}

function doShowBook(response) {
    $("#content_table").empty();
    $("#content_table").last().append("<thead><tr class=\""+ head_class +"\"><th></th><th>Author</th><th>Title</th><th>Subtitle</th><th>Publisher</th><th>ISBN</th><th>Category</th></tr></thead>");
    var book;
    for (var i = 0; i < response.length; i++) {
        book = response[i];
        $("#content_table").last()
            .append("<tr><td class=\"" + checkbox_class +"\"><input type=\"checkbox\"></input></td>" +
            "<td>" + book.Author + "</td><td>" + book.Title + "</td>" +
            "<td>" + book.SubTitle + "</td><td> "+ book.Publisher + "</td><td class=\""+ isbn_class +"\">" + book.ISBN + "</td><td>"+ book.Name +"</td></tr>");
    }
}

function doShowCategory(response) {
    $("#content_table").empty();
    $("#content_table").last().append("<thead><tr><th>Name</th><th>Item count</th></tr></thead>");
    var category;
    for (var i = 0; i < response.length; i++) {
        category = response[i];
        $("#content_table").last().append("<tr><td>" + category.Name + "</td><td>" + category.ItemCount + "</td></tr>");
    }
}

function doShowHistory(response) {
    $("#content_table").empty();
    $("#content_table").last().append("<thead><tr><th>Type</th><th>Date</th><th>ISBN</th></tr></thead>");
    var item;
    for (var i = 0; i < response.length; i++) {
        item = response[i];
        $("#content_table").last().append("<tr><td>" + item.Type + "</td><td>" + item.Date + "</td>" +
            "<td>" + item.BookISBN + "<td></tr>");
    }
}


function handleAddClicked() {
    $("#status_bar").text("Sorry: Not supported for the moment...");
}

/**
 * Retrieve the ISBN of selected books.
 * ISBN is used to uniquely identify a book.
 */
function getIsbns() {

    var rows = $("#content_table").find("tr");
    var row;
    var length = rows.length;
    var result = [];
    var condition;
    for (var i = 0; i < length; i++){
        row = rows[i];
        if (!row.classList.contains(head_class)) {
            if(isSelected(row)){
              result[result.length] = doGetIsbn(row);
            }
        }
       
    }
    return result;
}

function isSelected(row) {
    var cells = row.cells;
    var cell;
    var checkbox;
    var result = false;
    for (var i = 0; i < cells.length ; i++){
        cell = cells[i];
        if (cell.classList.contains(checkbox_class)) {
            result = cell.firstChild.checked;
            break;
        }
    }
    return result;
}
function doGetIsbn(row) {
    var result = "";
    var cells = row.cells;
    var cell;
    for (var i = 0; i < cells.length ; i++) {
        cell = cells[i];
        if (cell.classList.contains(isbn_class)) {
            result = cell.innerText;
            break;
        }
    }
    return result;
}
function handleBorrowClicked() {
    $("#status_bar").text("");
    if (dropDownSelection == "AvailableBook") {
        var tmp = getIsbns();
        $.ajax({
            url: "/LMS/Borrow/",
            type: 'POST',
            dataType: 'json',
            traditional: true,
            cache: false,
            data: {isbns: tmp},
            success: function (response) {
                GetStartPage()
            },
        });
    } else {
        $("#status_bar").text("An error occured");
    }
}

function handleReturnCicked() {
    $("#status_bar").text("");
    if (dropDownSelection == "BorrowedBook") {
        var tmp = getIsbns();
        $.ajax({
            url: '/LMS/Return',
            type: 'POST',
            dataType: 'json',
            traditional:true,
            cache: false,
            data: {isbns:tmp},
            success: function (response) {
                GetStartPage();
            }
        });
    } else {
        $("#status_bar").text("An error occured");
    }
}

function GetStartPage() {
    location.reload(true);
}