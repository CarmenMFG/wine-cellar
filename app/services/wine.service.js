class WineService{
   constructor(storageService){
      this.storageService=storageService;
      this.wines=[];
  }
      
     bindWineListChanged(callback) {
      this.onWineListChanged = callback;
    }
    findWineById(idWine){
      return this.wines.find(({id}) => id==idWine);
   }
   loadWines() {
    // Promise<Wine[]>
    return this.storageService.find().then((wines) => (this.wines = wines));
   }

    async loadWinesAwait() {
      const wines = await this.storageService.find();
      this.wines = wines;
      return this.wines;
    }

   
}

  