class WineService {
    constructor(storageService) {
        this.storageService=storageService;
        this.wines = [];
    }    


    bindWineListChanged(callback) {
        this.onWineListChanged = callback;
    }
    _commit(wines) {
        this.onWineListChanged(wines);
    }

    loadWines() {
        // Promise<Wine[]>
        return this.storageService.find().then((wines) => (this.wines = wines));
      }
    
     async loadWinesAwait() {
         console.log(this.storageService);
        const wines = await this.storageService.find();
        this.wines = wines;
        return this.wines;
      }
    addWine(wine) {
        let wineObj = new Wine(wine)
        this.wines = [...this.wines, wineObj];
        this.storageService.add(wineObj);
        this._commit(this.wines);

    }
    findWineById(idWine) {
        return this.wines.find(({ id }) => id == idWine);
    }
    updateWine({ id, name, price, isSaleOn, imgSrc, foodPairing }) {

        foodPairing = foodPairing.map(food => new Food(food));
        let wineOriginal = this.wines.find(item => item.id == id);
        wineOriginal.name = name;
        wineOriginal.price = price;
        wineOriginal.isSaleOn = isSaleOn;
        wineOriginal.imgSrc = imgSrc;
        wineOriginal.foodPairing = foodPairing;


        /*   this.wines = this.wines.map((_wine) =>
            _wine.id === wine.id ? new Wine(wine) : _wine
            );*/
        this.storageService.update(wineOriginal);
        this._commit(this.wines);

    }

    deleteWine(wine) {
        console.log("wine" + JSON.stringify(wine));
        this.wines = this.wines.filter(({ id }) => id != wine.id);
        this.storageService.remove(wine);
        this._commit(this.wines);
    }
}