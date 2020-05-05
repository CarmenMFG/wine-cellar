class WineService{
  constructor(storageService){
     this.storage=storageService;
     this.wines=this.storage.getAll();
   };
   
     bindWineListChanged(callback) {
      this.onWineListChanged = callback;
    }
    _commit(wines) {
      this.storage.save(this.wines);
      this.onWineListChanged(wines);
     }
    addWine(wine) {
      let wineObj= new Wine(wine)
      this.wines = [...this.wines,wineObj]; 
      if(this.storage.type=="IndexedDB"){
         this.storage.saveIDB(wineObj).then(this._commit(this.wines));
      }else{
         this.storage.save(this.wines);
        this._commit(this.wines)
      }
     
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

  