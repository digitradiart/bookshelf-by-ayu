/* Kriteria 1: Mampu Menambahkan Data Buku
{
    isbn: number,
    title: string,
    author: string,
    year: number,
    date: date,
    isComplete: boolean,
  }
*/
const UNCOMPLETED_LIST_BOOK_ID = "unreadBooks";
const COMPLETED_LIST_BOOK_ID = "readBooks";
const BOOK_ITEMID = "itemId";

// Menampilkan Item Buku dan Menandai Buku Selesai
function makeBooks(inputISBN, inputTitle, inputAuthor, inputYear, inputDate, isComplete) {

    const textInputISBN = document.createElement("h1");
    textInputISBN.innerText = `ISBN: ${inputISBN}`;

    const textInputTitle = document.createElement("h2");
    textInputTitle.innerText = `Title: ${inputTitle}`;

    const textInputAuthor = document.createElement("h3");
    textInputAuthor.innerText = `Author: ${inputAuthor}`;

    const textInputYear = document.createElement("h4");
    textInputYear.innerText = `Book's Year: ${inputYear}`;

    const textInputDate = document.createElement("p");
    textInputDate.innerText = `Date: ${inputDate}`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textInputISBN, textInputTitle, textInputAuthor, textInputYear, textInputDate);


    const container = document.createElement("div");
    container.classList.add("item", "shadow");

    container.append(textContainer);

    if (isComplete) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton()
        );
    }
    return container;
}

function addBooks() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const inputISBN = document.getElementById("isbn").value;
    const inputTitle = document.getElementById("title").value;
    const inputAuthor = document.getElementById("author").value;
    const inputYear = document.getElementById("year").value;
    const inputDate = document.getElementById("date").value;

    const book = makeBooks(inputISBN, inputTitle, inputAuthor, inputYear, inputDate, false);
    const bookObject = composeTodoObject(inputISBN, inputTitle, inputAuthor, inputYear, inputDate, false);
    book[BOOK_ITEMID] = bookObject.id;
    todos.push(bookObject);

    uncompletedBOOKList.append(book);
    updateDataToStorage();
}

/*
Kriteria 2: Memiliki Dua Rak Buku
Bookshelf Apps harus memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
Rak buku Belum selesai dibaca hanya menyimpan buku yang properti isComplete nya bernilai false.
Rak buku Selesai dibaca hanya menyimpan buku yang properti isComplete nya bernilai true.
*/

/*
Kriteria 3: Dapat Memindahkan Buku antar Rak
Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.
*/

/*
Kriteria 4: Dapat Menghapus Data Buku
Buku yang ditampilkan pada rak baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.
*/

// createButton

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    // const taskISBN = taskElement.querySelectorAll(".inner > h2").innerText;
    // const taskTitle = taskElement.querySelectorAll(".inner:nth-child(1)").innerText;
    // const taskAuthor = taskElement.querySelectorAll(".inner:nth-child(2)").innerText;
    // const taskYear = taskElement.querySelectorAll(".inner:nth-child(3)").innerText;
    // const taskDate = taskElement.querySelectorAll(".inner:nth-child(4)").innerText;
    const taskISBN = taskElement.querySelectorAll(".inner > h1").innerText;
    const taskTitle = taskElement.querySelectorAll(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelectorAll(".inner > h3").innerText;
    const taskYear = taskElement.querySelectorAll(".inner > h4").innerText;
    const taskDate = taskElement.querySelectorAll(".inner > p").innerText;


    const newBook = makeBooks(taskISBN, taskTitle, taskAuthor, taskYear, taskDate, true);
    listCompleted.append(newBook);
    taskElement.remove();
}

function createCheckButton() {
    return createButton("check-button", function(event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function removeTaskFromCompleted(taskElement) {
    taskElement.remove();
}

function createTrashButton() {
    return createButton("trash-button", function(event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}


function undoTaskFromCompleted(taskElement) {
    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const taskISBN = taskElement.querySelectorAll(".inner > h1").innerText;
    const taskTitle = taskElement.querySelectorAll(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelectorAll(".inner > h3").innerText;
    const taskYear = taskElement.querySelectorAll(".inner > h4").innerText;
    const taskDate = taskElement.querySelectorAll(".inner > p").innerText;


    const newBook = makeBooks(taskISBN, taskTitle, taskAuthor, taskYear, taskDate, false);
    listUnCompleted.append(newBook);
    taskElement.remove();
}

function createUndoButton() {
    return createButton("undo-button", function(event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

/*
Kriteria 5: Manfaatkan localStorage dalam Menyimpan Data Buku
Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.
Dengan begitu, Anda harus menyimpan data buku pada localStorage.
*/