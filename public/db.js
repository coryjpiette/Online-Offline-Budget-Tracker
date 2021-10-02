
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

    request.onerror = function(event) {
        console.log("Please try again! " + event.target.errorCode);
      };