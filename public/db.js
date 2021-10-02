
const indexedDB =

    window.indexedDB ||
    window.msIndexedDB ||
    window.mozIndexedDB ||
    window.shimIndexedDB ||
    window.webkitIndexedDB
    ;

window.IDBTransaction =

    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction ||
    { READ_WRITE: "readwrite" };


window.IDBKeyRange =

    window.IDBKeyRange ||
    window.webkitIDBKeyRange ||
    window.msIDBKeyRange;


let db;
const request = window.indexedDB.open("budget", 1);
request.onupgradeneeded = (event) => {

    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }

};

request.onerror = function (event) {
    console.log("Please try again! " + event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(["pending"], "readwrite");
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();
    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })