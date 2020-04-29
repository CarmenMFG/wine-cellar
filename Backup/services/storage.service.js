class StorageService{
    constructor(typeStorage){
      let initialWines=[
        {
            "name":"Murmuron",
            "price":10.20,
            "isSaleOn":"Hipercor",
            "imgSrc":"./assets/1.png",
            "foodPairing":null
        },
        {
            "name":"Muñarrate",
            "price":60.60,
            "isSaleOn":"Corte Inglés",
            "imgSrc":"./assets/2.png",
            "foodPairing":null
        },
        {
            "name":"Muñarrate",
            "price":60.60,
            "isSaleOn":"Carrefour",
            "imgSrc":"./assets/2.png",
            "foodPairing":null
        },
        {
            "name":"Excelens",
            "price":8.35,
            "isSaleOn":"Alcampo",
            "imgSrc":"./assets/4.png",
            "foodPairing":null
        },
        {
            "name":"7L",
            "price":15.20,
            "isSaleOn":"Mercadona",
            "imgSrc":"./assets/5.png",
            "foodPairing":null
        }
      ];
      this.storage= typeStorage ;
      if (typeStorage=='LocalStorage'){
                localStorage.setItem("wines",JSON.stringify(initialWines));
                this.wines = (JSON.parse(localStorage.getItem("wines"))).map(
                            wine => new Wine(wine) ); 
      }else{   //IndexedDB
      // Abrimos la DB
            var request = window.indexedDB.open("wines", 1);

            request.onerror = function(event) {
            // Manejamos el error al abrir.
            console.error('error:',event.target.errorCode);
            };

            request.onsuccess = function(event) {
            // Hacemos el proceso exitoso al abrir.
             const db = event.target.result;
           
         
                 
            // puede ser readonly o readwrite
               var transaction = db.transaction(["wines"], "readwrite");
                
             // Agregando los datos en el objectStore
                var objectStore = transaction.objectStore('wine') ;
                initialWines.forEach(
                function(customer){
                    var request = objectStore.add(customer);
                });
                
                };
            };

      }
     

     bindWineListChanged(callback) {
        this.onWineListChanged = callback;
     }
      _commit(wines) {
        this.onWineListChanged(wines);
        if (this.storage=='LocalStorage'){
            localStorage.setItem("wines",JSON.stringify(this.wines));
        }else{

        }  
       }
    
  
      addWine(wine) {
        this.wines = [...this.wines, new Wine(wine)]; 
        console.log(this.wines);
        this._commit(this.wines);
      }
      findWineById(idWine){
         return this.wines.find(({id}) => id==idWine);
      }
      updateWine(wine){
          this.wines = this.wines.map((_wine) =>
          _wine.id === wine.id ? new Wine(wine) : _wine
           );
       this._commit(this.wines);
      }
  
      deleteWine(idWine){
         this.wines=this.wines.filter(({id}) =>id!=idWine);
         this._commit(this.wines);
      }
  
  
  }  







