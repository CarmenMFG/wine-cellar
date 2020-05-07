class WineService{
  constructor(storageService){
    this.storage=storageService;
    this.wines=this.storage.find()
                            .map((wine) => new Wine(wine), ) ;
 }
      
     bindWineListChanged(callback) {
      this.onWineListChanged = callback;
    }
    findWineById(idWine){
      return this.wines.find(({id}) => id==idWine);
   }
   
}

  