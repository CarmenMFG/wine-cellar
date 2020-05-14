class StorageService {
    KEY = 'wines';

    /* 
    configuration LocalStorage
       id
   */

    /**
     *
     * @param {String} type Tipo de Storage: indexedDB localStorage
     * @param {Object} configuration Objeto de configuracion: { id: string }
     */


    constructor({ type, configuration }) {
        if (type === 'indexedDB') {
            this.db;
        }
        this.type = type;
        this.configuration = configuration;
        this.initialWines = [{
                "id": "1",
                "name": "Murmuron",
                "price": 10.20,
                "isSaleOn": "Hipercor",
                "imgSrc": "../assets/1.png",
                "foodPairing": [{ name: 'Patatas', isVegan: true, isGluten: true, kcal: 15 }, { name: 'Jamon', isVegan: true, isGluten: true, kcal: 23 }]
            },
            {
                "id": "2",
                "name": "Muñarrate",
                "price": 60.60,
                "isSaleOn": "Corte Inglés",
                "imgSrc": "../assets/2.png",
                "foodPairing": []
            },
            {
                "id": "3",
                "name": "Peñafiel",
                "price": 60.60,
                "isSaleOn": "Carrefour",
                "imgSrc": "../assets/3.png",
                "foodPairing": [{ name: 'Pescado', isVegan: true, isGluten: true, kcal: 30 }, { name: 'Ternera', isVegan: true, isGluten: true, kcal: 30 }]
            },
            {
                "id": "4",
                "name": "Excelens",
                "price": 8.35,
                "isSaleOn": "Alcampo",
                "imgSrc": "../assets/4.png",
                "foodPairing": []
            },
            {
                "id": "5",
                "name": "7L",
                "price": 15.20,
                "isSaleOn": "Mercadona",
                "imgSrc": "../assets/6.png",
                "foodPairing": [{ name: 'Pescado', isVegan: true, isGluten: true, kcal: 30 }]
            }
        ];
    }


    /*-----------------------ADD--------------------------------*/

    add = (item) => {
        this.type === 'indexedDB' ? this._addIndexed(item) : this._addLocal(item);
    };

    _addLocal = (item) => {
            this._loadStore().then((items)=>{
            items = [...items, item];
            localStorage.setItem(this.KEY, JSON.stringify(items));
        })
    };

    _addIndexed = (wine) => {
        this._findOneIndexed(wine)
            .then((ejemplo) => {
                console.log(ejemplo);
                console.log('Vino ya existente');
            })
            .catch(() => {
               let transaction = this.db.transaction(['wines'], 'readwrite');
               let objectStore = transaction.objectStore('wines');
               let request = objectStore.add(wine);
               request.onsuccess = () => console.log('Vino añadido');
           

            });
    };
    /*-----------------------REMOVE--------------------------------*/


    remove = (content) => {
        this.type === 'indexedDB' ?
            this._removeIndexed(content) :
            this._removeLocal(content);
    };

    _removeLocal = (item) => {
        const id = this.configuration.key;
        const items = this._loadStore().filter((_item) => _item[id] !== item[id]);
        localStorage.setItem(this.KEY, JSON.stringify(items));
    };
    _removeIndexed = (wine) => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        const request = objectStore.delete(wine.id);
        request.onsuccess = () => console.log('Vino borrado');
    };


    /*-------------------------UPDATE---------------------------------------------------*/
    update = (item) => {
        this.type === 'indexedDB' ?
            this._updateIndexed(item) :
            this._updateLocal(item);
    };

    _updateLocal = (item) => {
        const id = this.configuration.key;
        const items = this._loadStore().map((_item) =>
            item[id] === _item[id] ? item : _item,
        );
        localStorage.setItem(this.KEY, JSON.stringify(items));
    };
    _updateIndexed = (wine) => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        const request = objectStore.put(wine);
    };

    /*---------------------------FINDONE------------------------------------------------------------------ */

    findOne = (item) => {
        return this.type === 'indexedDB' ?
            this._findOneIndexed(item) :
            this._findOneLocal(item);
    };

    _findOneLocal(item) {
        const idToFind = item[this.configuration.key];
        const items = this._loadStore();
        return items.find((item) => item[this.configuration.key] === idToFind);
    }
    _findOneIndexed = (wine) => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        return new Promise((resolve, reject) => {
            const request = objectStore.get(wine.id);
            request.onsuccess = (event) => {
                const result = event.target.result;
                result ? resolve(result) : reject();
            };
        });
    };
    /*---------------------------FIND-----------------------------------------------------------*/

    find = () => {
        return this.type === 'indexedDB' ? this._findIndexed() : this._findLocal();
    };

    _findLocal() {
       
        return this._loadStore();
    }
    _loadStore() {
        return Promise.resolve((JSON.parse(localStorage.getItem(this.KEY)) || []));

    }

    _findIndexed = () => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        const request = objectStore.openCursor();
        return new Promise((resolve, reject) => {
          const wines = [];
    
          request.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
              wines.push(cursor.value);
              cursor.continue();
            } else {
              resolve(wines);
            }
          };
        });
      };
    

    initializeDB = () => {
        return this.type === 'indexedDB'
          ? this._initializeIndexedDB()
          : this._initializeLocalStorage();
      };
    
      _initializeIndexedDB() {
        return this._openIndexedDB().then(() => {
          let transaction = this.db.transaction('wines', 'readwrite');
          let objectStore = transaction.objectStore('wines');
    
          for (const wine of this.initialWines) {
            objectStore.add(wine);
            console.log(wine);
          }
    
          objectStore.onsuccess = function () {
            console.log('objectStore.result', objectStore.result);
          };
    
          objectStore.onerror = function () {
            console.log('Error', objectStore.error);
          };
        });
      }
    
      _initializeLocalStorage() {
        localStorage.setItem(this.KEY, JSON.stringify(this.initialWines));
        return Promise.resolve(true);
      }
    
      _openIndexedDB = () => {
        return new Promise((resolve, reject) => {
          const indexedDB = window.indexedDB;
          if (!indexedDB) {
            reject('IndexedDB not defined');
          }
          if (this.db) {
            resolve({ db: this.db });
          }
    
          //base datos
          const request = indexedDB.open('wineCellar', 2);
    
          request.onsuccess = () => {
            this.db = request.result;
            resolve({ db: request.result });
          };
    
          request.onupgradeneeded = () =>
            request.result.createObjectStore('wines', { keyPath: 'id' });
           
        });
      };
    


}