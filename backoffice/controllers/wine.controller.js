class WineController{

    constructor(service,view){
        this.service=service;
        this.view =view;

        //Explicit this binding
       this.view.bindAddwine(this.handleAddWine);
       this.service.bindWineListChanged(this.onWineListChanged);
       this.view.bindChangeImage();
       this.view.bindResetForm();
       this.view.bindClickAddForm();
       this.view.bindAddFood();
       this.view.bindClickTrUpdate(this.handlerClickTrUpdate);
       this.view.bindUpdateWine(this.handlerUpdateWine); 
       this.view.bindDeleteWine(this.handlerDeleteWine);
       // Display initial users
       this.onWineListChanged(this.service.wines);
    }
     onWineListChanged = (wines) => {
        this.view.displayWines(wines);
     };
 
     handleAddWine=(wineObject)=>{
      // console.log("desde el controller"+JSON.stringify(wineObject));
        this.service.addWine(wineObject);
     };
      
    handlerClickTrUpdate=(id)=>{
        let wine=this.service.findWineById(id); 
        this.view.completeForm(wine);
     }
    
    handlerUpdateWine=(wine)=>{
       this.service.updateWine(wine); 
    }
    handlerDeleteWine=(idWine)=>{
        this.service.deleteWine(idWine); 
    }    
   
}