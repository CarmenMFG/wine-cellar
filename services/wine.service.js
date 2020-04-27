class WineService{
    constructor(){
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
        }
      ];
      this.wines=initialWines.map((wine) => new Wine(wine));

    }
    bindWineListChanged(callback) {
      this.onWineListChanged = callback;
    }
    _commit(wines) {
      this.onWineListChanged(wines);
     }
  

    addWine=(wine)=> {
      this.wines = [...this.wines, new Wine(wine)]; 
      console.log(this.wines);
      this._commit(this.wines);
    }
}

  