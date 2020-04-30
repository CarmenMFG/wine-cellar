class WineService{
  constructor(storageService){
    this.storage=storageService;
     this.wines=this.storage.getAll();

  }
     bindWineListChanged(callback) {
      this.onWineListChanged = callback;
    }
    _commit(wines) {
      this.onWineListChanged(wines);
      this.storage.save(this.wines);
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

  