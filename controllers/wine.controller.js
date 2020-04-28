class WineController{

    constructor(service,view){
        this.service=service;
        this.view =view;

        //Explicit this binding
       this.view.bindAddwine(this.handleAddWine);
       this.service.bindWineListChanged(this.onWineListChanged);
       this.view.bindChangeImage(this.handlerChangeImage);
       this.view.bindClickCard(this.handlerClickCard);
       this.view.bindUpdateWine(this.handlerUpdateWine);
       this.view.bindDeleteWine(this.handlerDeleteWine);
       this.view.bindResetForm(this.handlerReset)
      //  this.view.bindAddPurchase(this.handleAddPurchase);
      // Display initial users
       this.onWineListChanged(this.service.wines);
    }
     onWineListChanged = (wines) => {
        this.view.displayWines(wines);
     };
 
     handleAddWine=(wineObject)=>{
      this.service.addWine(wineObject);
     };
    
     handlerChangeImage=(image)=>{
     
    }
    handlerReset=()=>{

    }   
    handlerClickCard=(id)=>{
      let wine=this.service.findWineById(id); 
      this.view.completeForm(wine);
    }
    handlerUpdateWine=(wine)=>{
       this.service.updateWine(wine); 
    }
    handlerDeleteWine=(idWine)=>{
        this.service.deleteWine(idWine); 
    }
    
   /* handleAddPurchase=(text)=>{
    }*/
}