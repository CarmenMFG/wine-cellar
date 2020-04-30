class WineService{
    constructor(storageService){
      this.storage=storageService;
       this.wines=this.storage.getAll();

    }
     bindWineListChanged(callback) {
      this.onWineListChanged = callback;
    }
    _commit() {
      this.onWineListChanged(this.wines);
      this.storage.save(this.wines);
     }
  

    addWine(wine) {
      this.wines = [...this.wines, new Wine(wine)]; 
      console.log(this.wines);
      this._commit();
    }
    findWineById(idWine){
       return this.wines.find(({id}) => id==idWine);
    }
    updateWine(wine){
        this.wines = this.wines.map((_wine) =>
        _wine.id === wine.id ? new Wine(wine) : _wine
         );
     this._commit();
    }

    deleteWine(idWine){
       this.wines=this.wines.filter(({id}) =>id!=idWine);
       this._commit();
    }


}

  