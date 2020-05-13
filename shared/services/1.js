class StorageService {
  KEY = 'wines';
  /**
   *
   * @param {String} type Tipo de Storage: indexedDB localStorage
   * @param {Object} configuration Objeto de configuracion: { id: string }
   */
  constructor({ type, configuration }) {
    if (type === 'indexedDB') {
      this.db;
      this._initIndexedDB();
      /* .then((value) => {
          console.log('Indexed iniciada con exito;' + value);
        })
        .catch(() => {
          console.log('Fallo al iniciar');
        }); */
    }
    this.type = type;
    this.configuration = configuration;
  }

  _initIndexedDB = () => {
    return new Promise((resolve, reject) => {
      const indexedDB = window.indexedDB;
      if (!indexedDB) {
        reject();
      }
      //base datos
      const request = indexedDB.open('wineCellar', 1);

      request.onsuccess = () => {
        this.db = request.result;
        //te abre el almacen
        console.log('OPEN', this.db);
      };

      request.onupgradeneeded = () => {
        this.db = request.result;
        //Te crea el almacen
        const objectStore = this.db.createObjectStore('wines', {
          /* keyPath: 'uuid', */
          keyPath: 'id',
        });
        /* for (const wine of this.initialWines) {
          this._addIndexeWine(wine);
        }
        console.log('Create', this.db); */
      };

      request.onerror = (error) => {
        console.log('Error', error);
      };
    });
  };

  add = (item) => {
    this.type === 'indexedDB' ? this._addIndexed(item) : this._addLocal(item);
  };

  remove = (content) => {
    this.type === 'indexedDB'
      ? this._removeIndexed(content)
      : this._removeLocal(content);
  };

  update = (item) => {
    this.type === 'indexedDB'
      ? this._updateIndexed(item)
      : this._updateLocal(item);
  };

  findOne = (item) => {
    return this.type === 'indexedDB'
      ? this._findOneIndexed(item)
      : this._findOneLocal(item);
  };

  find = () => {
    return this.type === 'indexedDB' ? this._findIndexed() : this._findLocal();
  };

  /* ------------------------LOCAL------------------------------- */

  _addLocal = (item) => {
    let items = this._loadStore();
    items = [...items, item];
    localStorage.setItem(this.KEY, JSON.stringify(items));
  };

  _removeLocal = (item) => {
    const id = this.configuration.key;
    const items = this._loadStore().filter((_item) => _item[id] !== item[id]);
    localStorage.setItem(this.KEY, JSON.stringify(items));
  };

  _updateLocal = (item) => {
    const id = this.configuration.key;
    const items = this._loadStore().map((_item) =>
      item[id] === _item[id] ? item : _item
    );
    localStorage.setItem(this.KEY, JSON.stringify(items));
  };

  _findOneLocal(item) {
    const idToFind = item[this.configuration.key];
    const items = this._loadStore();
    return items.find((item) => item[this.configuration.key] === idToFind);
  }

  _findLocal() {
    return this._loadStore();
  }

  _loadStore() {
    return JSON.parse(localStorage.getItem(this.KEY)) || [];
  }

  /* ------------------------INDEXED------------------------------- */

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

  _addIndexed = (wine) => {
    this._findOneIndexed(wine)
      .then((ejemplo) => {
        console.log(ejemplo);
        console.log('Vino ya existente');
      })
      .catch(() => {
        const transaction = this.db.transaction(['wines'], 'readwrite');
        const objectStore = transaction.objectStore('wines');
        const request = objectStore.add(wine);
        request.onsuccess = () => console.log('Vino añadido');
      });
  };

  _updateIndexed = (wine) => {
    const transaction = this.db.transaction(['wines'], 'readwrite');
    const objectStore = transaction.objectStore('wines');
    const request = objectStore.put(wine);
  };

  _removeIndexed = (wine) => {
    const transaction = this.db.transaction(['wines'], 'readwrite');
    const objectStore = transaction.objectStore('wines');
    const request = objectStore.remove(wine.id);
  };
}