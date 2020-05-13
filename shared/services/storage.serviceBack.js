class StorageService {
    KEY = 'wines';
    /**
     *
     * @param {String} type Tipo de Storage: indexedDB localStorage
     * @param {Object} configuration Objeto de configuracion: { id: string }
     */
  
    constructor({ type, configuration }) {
        if (this.type=="IndexedDB"){
                this.db = new Dexie("wine_database");
                this.db.version(1).stores({
                wines: 'id'
            });
        }
  
      this.type = type;
      this.configuration = configuration;
    }
   
    add = (item) => {
      this.type === 'indexedDB' ? this._addIndexed(item) : this._addLocal(item);
    };
  
    _addLocal = (item) => {
      let items = this._loadStore();
      items = [...items, item];
      localStorage.setItem(this.KEY, JSON.stringify(items));
    };
    
    _addIndexed =(item) =>{
      return this.db.wines.put(item);
    }
  
    remove = (content) => {
      this.type === 'indexedDB'
        ? this._removeIndexed(content)
        : this._removeLocal(content);
    };
  
    _removeLocal = (item) => {
      const id = this.configuration.key;
      console.log ("Dentro del remove"+id+"  "+JSON.stringify((JSON.parse(localStorage.getItem(this.KEY)))));
      const items = this._loadStore().filter((_item) => _item[id] !== item[id]);
      localStorage.setItem(this.KEY, JSON.stringify(items));
    };
    _removeIndexed =(item) => {
        const id = this.configuration.key;
        //this.db.wines.where([id]).anyOf(item[id]).delete();
        this.db.transaction('rw', this.db.wines, function* () {
            var deleteCount = yield this.db.wines
                .where([id]).anyOf(item[id])
                .delete();
           console.log ("Successfully deleted " + deleteCount + " items");
        }).catch (e => {
            console.error (e);
        });
    }
  
    update = (item) => {
      this.type === 'indexedDB'
        ? this._updateIndexed(item)
        : this._updateLocal(item);
    };
  
    _updateLocal = (item) => {
      const id = this.configuration.key;
      const items = this._loadStore().map((_item) =>
        item[id] === _item[id] ? item : _item,
      );
      localStorage.setItem(this.KEY, JSON.stringify(items));
    };
  
    findOne = (item) => {
      return this.type === 'indexedDB'
        ? this._findOneIndexed(item)
        : this._findOneLocal(item);
    };
  
    _findOneLocal(item) {
      const idToFind = item[this.configuration.key];
      const items = this._loadStore();
      return items.find((item) => item[this.configuration.key] === idToFind);
    }
  
    find = () => {
      return this.type === 'indexedDB' ? this._findIndexed() : this._findLocal();
    };
  
    _findLocal() {
      return this._loadStore();
    }
  /*  _findIndexed(){
        const all = await this.db.wines.toArray();
        return all;
    }*/
    _loadStore() {
        return (JSON.parse(localStorage.getItem(this.KEY)) || []);
      }

    }