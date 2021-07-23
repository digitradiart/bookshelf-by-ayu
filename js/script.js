document.addEventListener("DOMContentLoaded", function() {

    const submitForm /* HTMLFormElement */ = document.getElementById("form");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBooks();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});