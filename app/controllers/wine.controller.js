class WineController{

    constructor(service,view){
        this.service=service;
        this.view =view;

        //Explicit this binding
        this.service.bindWineListChanged(this.onWineListChanged);
        this.view.bindClickCard(this.handlerClickCard);
    
      // Display initial wines
       this.onWineListChanged(this.service.wines);
    }
     onWineListChanged = (wines) => {
        this.view.displayWines(wines);
     };
     handlerClickCard=(id)=>{
         console.log(id);
        /*let wine=this.service.findWineById(id); 
        this.view.completeForm(wine);*/
      }
     
}