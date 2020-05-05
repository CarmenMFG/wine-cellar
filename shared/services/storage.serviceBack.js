class StorageService{
     constructor(type){
        this.type=type;
        if (this.type=='IndexedDB'){
            if (!window.indexedDB) {
            console.log("No hay indexedDB");
            }else{
                this.database = indexedDB.open("bdWines",2);
                this.database.onerror = function() {
                    console.error("Error", database.error);
                };
                this.database.onupgradeneeded = function() {
                    let db = database.result;
                    this.wineTable= db.createObjectStore('wines', {keyPath: 'id'}); // create it
                    console.log("Cuando creo upgrade");
                };
                database.onsuccess = function() {
                   /* let db = this.database.result;
                    const data = db.transaction(["wines"], "readwrite");
                    this.wineTable = data.objectStore("wines");
                    console.log("cuando obtengo"+this.wineTable);*/
        
                };
               
            }
        }
    }

    save(wines){
        if (this.type=='LocalStorage'){
        localStorage.setItem('wines',JSON.stringify(wines)); 
        }
    }
    getAll(){
        if (this.type=='LocalStorage'){
            return (JSON.parse(localStorage.getItem('wines')) || []).map(
                (wine) => new Wine(wine), ) ;
        
        }else if (this.type=='IndexedDB'){
            let active = this.database.result;
            let data = active.transaction(["wines"], "readonly");
            let wineTable = data.objectStore("wines");
            console.log("wineTable"+wineTable);
            let elements = [];
            wineTable.openCursor().onsuccess = function (e) {
            let result = e.target.result;
                if (result === null) {
                    return ;
                }
        
                elements.push(result.value);
                result.continue();
        
            };

        }
    }
}