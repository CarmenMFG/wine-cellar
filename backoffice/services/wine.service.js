class WineService {
    constructor(storageService) {
        this.storage = storageService;
        /*   this.storage.find()
                        .then((wines) => {
                          this.wines = wines.map((wine) => wine);
                         })
                        .catch(() => {
                           console.log('No hay datos en local/indexed, se coge el array puesto a mano en service');
                              this.wines = initialWines.map((wine) => new Wine(wine));
                         });*/
        /* this.wines=this.storage.find()
                                 .then
                                .map((wine) => new Wine(wine), ) ;*/
    }

    InitialiceBDD() {
        return new Promise((resolve, reject) => {
            this.storage.InitializeBBDD()
                .then(() => {

                    resolve();
                })
                .catch(() => {
                    console.log('No se ha podido inicializr');

                    reject();
                });

        });
    }
    bindFindWines() {
        return new Promise((resolve, reject) => {
            this.storage.find()
                .then((wines) => {
                    this.wines = wines.map((wine) => wine);
                    resolve(this.wines);
                })
                .catch(() => {
                    console.log('No hay datos en local/indexed, se coge el array puesto a mano en service');
                    this.wines = initialWines.map((wine) => new Wine(wine));
                    reject();
                });

        });
    }

    bindWineListChanged(callback) {
        this.onWineListChanged = callback;
    }
    _commit(wines) {
        this.onWineListChanged(wines);
    }
    addWine(wine) {
        let wineObj = new Wine(wine)
        this.wines = [...this.wines, wineObj];
        this.storage.add(wineObj);
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
        this.storage.update(wineOriginal);
        this._commit(this.wines);

    }

    deleteWine(wine) {
        console.log("wine" + JSON.stringify(wine));
        this.wines = this.wines.filter(({ id }) => id != wine.id);
        this.storage.remove(wine);
        this._commit(this.wines);
    }
}