class DixieService {
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
        if (type === 'Dixie') {
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
      initializeDB = () => {
        return this.type === 'Dixie'
          ?  this._initializeDixie()
          : this._initializeLocalStorage();
      }
     
      _initializeLocalStorage() {
        return Promise.resolve(true);
      }
     
      _initializeDixie =()=>{
          this._openDixie();
          Promise.resolve(true);
      }
     
      _openDixie=()=>{
          if (!this.db){
            this.db = new Dexie('wine-database');
            this.db.version(1).stores({
                wines: 'id'
            });
             for (const wine of this.initialWines) {
                this.db.wines.add(wine);  
            }     
               
       }
     }
        find = () => {
            return this.type === 'Dixie' ? this._findDixie() : this._findLocal();
        };
        
        _findLocal() {
            return Promise.resolve(this._loadStore());
        }
        _findDixie() {
              
            return  this.db.wines.toArray();
        }
        add = (item) => {
            this.type === 'Dixie' ? this._addDixie(item) : this._addLocal(item);
          };
          
        _addLocal = (item) => {
            let items = this._loadStore();
            items = [...items, item];
            localStorage.setItem(this.KEY, JSON.stringify(items));
        };
       
        
    }
    
