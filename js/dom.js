/* Kriteria 1: Mampu Menambahkan Data Buku
{
    isbn: number,
    title: string,
    author: string,
    year: number,
    date: date,
    isCompleted: boolean,
  }
*/

const UNCOMPLETED_LIST_BOOK_ID = "unreadBooks";
const COMPLETED_LIST_BOOK_ID = "readBooks";
const TODO_ITEMID = "itemId";

// Menampilkan Item Buku dan Menandai Buku Selesai
function makeBooks(inputISBN, inputTitle, inputAuthor, inputYear, inputDate, isCompleted) {

    const textInputISBN = document.createElement("h1");
    textInputISBN.innerText = `${inputISBN}`;

    const textInputTitle = document.createElement("h2");
    textInputTitle.innerText = `${inputTitle}`;

    const textInputAuthor = document.createElement("h3");
    textInputAuthor.innerText = `${inputAuthor}`;

    const textInputYear = document.createElement("h4");
    textInputYear.innerText = `${inputYear}`;

    const textInputDate = document.createElement("p");
    textInputDate.innerText = `${inputDate}`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textInputISBN, textInputTitle, textInputAuthor, textInputYear, textInputDate);


    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);

    if (isCompleted) {
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

/*
Kriteria 2: Memiliki Dua Rak Buku
Bookshelf Apps harus memiliki 2 Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
Rak buku Belum selesai dibaca hanya menyimpan buku yang properti isCompleted nya bernilai false.
Rak buku Selesai dibaca hanya menyimpan buku yang properti isCompleted nya bernilai true.
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
function createUndoButton() {
    return createButton("undo-button", function(event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addBooks() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const inputISBN = document.getElementById("isbn").value;
    const inputTitle = document.getElementById("title").value;
    const inputAuthor = document.getElementById("author").value;
    const inputYear = document.getElementById("year").value;
    const inputDate = document.getElementById("date").value;

    const todo = makeBooks(inputISBN, inputTitle, inputAuthor, inputYear, inputDate, false);
    const todoObject = composeTodoObject(inputISBN, inputTitle, inputAuthor, inputYear, inputDate, false);

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);

    uncompletedBOOKList.append(todo);
    updateDataToStorage();
}


function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const taskISBN = taskElement.querySelector(".inner > h1").innerText;
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskYear = taskElement.querySelector(".inner > h4").innerText;
    const taskDate = taskElement.querySelector(".inner > p").innerText;


    const newTodo = makeBooks(taskISBN, taskTitle, taskAuthor, taskYear, taskDate, true);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {

    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

    const taskISBN = taskElement.querySelector(".inner > h1").innerText;
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskYear = taskElement.querySelector(".inner > h4").innerText;
    const taskDate = taskElement.querySelector(".inner > p").innerText;


    const newTodo = makeBooks(taskISBN, taskTitle, taskAuthor, taskYear, taskDate, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();

}


/*
Kriteria 5: Manfaatkan localStorage dalam Menyimpan Data Buku
Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.
Dengan begitu, Anda harus menyimpan data buku pada localStorage.
*/

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for (todo of todos) {
        const newTodo = makeBooks(todo.isbn, todo.title, todo.author, todo.year, todo.date, todo.isCompleted);


        newTodo[TODO_ITEMID] = todo.id;

        if (todo.isCompleted) {
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}