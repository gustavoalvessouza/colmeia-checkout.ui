const STORES = [
    {
        name: "users",
        options: { keyPath: "id", autoIncrement: true },
        indexes: [
            { name: "email", keyPath: "email", options: { unique: true } },
        ],
    },
    { name: "session", options: { keyPath: "key" } },
    { name: "cart", options: { keyPath: "id", autoIncrement: true } },
];

export async function openDB(
    name = "colmeia-checkout-db",
    version = 1
): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version);

        request.onupgradeneeded = () => {
            const db = request.result;

            for (const storeConfig of STORES) {
                if (!db.objectStoreNames.contains(storeConfig.name)) {
                    const store = db.createObjectStore(
                        storeConfig.name,
                        storeConfig.options
                    );
                    if (storeConfig.indexes) {
                        storeConfig.indexes.forEach((idx) =>
                            store.createIndex(
                                idx.name,
                                idx.keyPath,
                                idx.options
                            )
                        );
                    }
                }
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function withStore<T>(
    storeName: string,
    mode: IDBTransactionMode,
    cb: (
        store: IDBObjectStore,
        resolve: (value: T) => void,
        reject: (reason?: any) => void
    ) => void
): Promise<T> {
    const dbInstance = await openDB();
    return new Promise<T>((resolve, reject) => {
        const tx = dbInstance.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        cb(store, resolve, reject);
        tx.onerror = () => reject(tx.error);
    });
}

export const db = {
    async add<T>(storeName: string, value: T): Promise<number> {
        return withStore<number>(
            storeName,
            "readwrite",
            (store, resolve, reject) => {
                const req = store.add(value);
                req.onsuccess = () => resolve(req.result as number);
                req.onerror = () => reject(req.error);
            }
        );
    },
    async put(storeName: string, value: any) {
        return withStore(storeName, "readwrite", (store) => store.put(value));
    },
    async get(storeName: string, key: IDBValidKey) {
        return new Promise<any>(async (resolve, reject) => {
            const dbInstance = await openDB();
            const tx = dbInstance.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },
    async getAll(storeName: string) {
        return new Promise<any[]>(async (resolve, reject) => {
            const dbInstance = await openDB();
            const tx = dbInstance.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },
    async delete(storeName: string, key: IDBValidKey) {
        return withStore(storeName, "readwrite", (store) => store.delete(key));
    },
    async clear(storeName: string) {
        return withStore(storeName, "readwrite", (store) => store.clear());
    },
};
