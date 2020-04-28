class WineController{

    constructor(service,view){
        this.service=service;
        this.view =view;

        //Explicit this binding
       this.view.bindAddwine(this.handleAddWine);
       this.view.bindChangeImage(this.handlerChangeImage);
      //  this.view.bindAddPurchase(this.handleAddPurchase);
      // Display initial users
       this.onWineListChanged(this.service.wines);
    }
      onWineListChanged = (wines) => {
        this.view.displayWines(wines);
     };
 

  handleAddWine=(wineObject)=>{
      this.service.addWine(wineObject);
      console.log(wineObject);
    };
    handlerChangeImage(image){
        console.log(image);
    }
    
   /* handleAddPurchase=(text)=>{
    }*/
}