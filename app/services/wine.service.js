class WineService{
    constructor(storageService){
      this.storage=storageService;
      this.wines=this.storage.getAll();
 /*
      let initialWines=[
        {
            "name":"Murmuron",
            "price":10.20,
            "isSaleOn":"Hipercor",
            "imgSrc":"../assets/1.png",
            "foodPairing":null
        },
        {
            "name":"Muñarrate",
            "price":60.60,
            "isSaleOn":"Corte Inglés",
            "imgSrc":"../assets/2.png",
            "foodPairing":null
        },
        {
            "name":"Muñarrate",
            "price":60.60,
            "isSaleOn":"",
            "imgSrc":"../assets/2.png",
            "foodPairing":null
        },
        {
            "name":"Excelens",
            "price":8.35,
            "isSaleOn":"",
            "imgSrc":"../assets/4.png",
            "foodPairing":null
        },
        {
            "name":"7L",
            "price":15.20,
            "isSaleOn":"",
            "imgSrc":"../assets/5.png",
            "foodPairing":null
        }
      ];
      this.wines=initialWines.map((wine) => new Wine(wine));*/

    }
     bindWineListChanged(callback) {
      this.onWineListChanged = callback;
    }
    findWineById(idWine){
      return this.wines.find(({id}) => id==idWine);
   }
    /*_commit(wines) {
      this.onWineListChanged(wines);
     }
  

    addWine(wine) {
      this.wines = [...this.wines, new Wine(wine)]; 
      console.log(this.wines);
      this._commit(this.wines);
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
    }*/


}

  