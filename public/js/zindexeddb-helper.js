
/////////////////////////// Lokal Store ///////////////////////////////////////
//contoh pakai
/* 
// Buat instance helper
const dbs = new IndexedDBHelper();

// Simpan data
await dbs.save("user1", { name: "Budi", age: 25 });

// Ambil data berdasarkan key
const user = await db.get("user1");
console.log("Get user1:", user);

// Ambil semua data
const allUsers = await db.getAll();
console.log("Semua data:", allUsers);

// Edit data (pakai save lagi dengan key sama)
await dbs.save("user1", { name: "Budi Update", age: 26 });

// Hapus data per key
await dbs.delete("user1");

// Kosongkan semua data di store
await dbs.clear();

// Hapus seluruh database
await dbs.deleteDatabase();
*/
class IndexedDBHelper {
    constructor(dbName = "higsystemDB", storeName = "higsystemStore") {
        this.dbName = dbName;
        this.storeName = storeName;
    }

    async openDB() {
        return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "key" });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
        });
    }

    async isLoggedIn(key = "username") {
        const user = await this.get(key);
        if (user !== null && user !== "") {
            return user; // return isi username
        }
        return null; // kalau belum login
    }

    async save(key, value) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const request = store.put({ key, value });

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
        });
    }

    async get(key) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result ? request.result.value : null);
        request.onerror = (event) => reject(event.target.error);
        });
    }

    async getAll() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
        });
    }

    async delete(key) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const request = store.delete(key);

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
        });
    }

    async clear() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);
        const request = store.clear();

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
        });
    }

    async deleteDatabase() {
        return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(this.dbName);

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
        request.onblocked = () => console.warn("Delete blocked: close all tabs using the DB first.");
        });
    }
}

var dbs = new IndexedDBHelper(localStorage.getItem('sdb') || 'newhigsystemDB','higsystemStore');
