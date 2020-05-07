class WineController{

    constructor(service,cartService,view){
        this.service=service;
        this.cartService=cartService;
        this.view =view;


        //Explicit this binding
        this.view.bindClickCard(this.handlerClickCard);
        this.service.bindWineListChanged(this.onWineListChanged);
        this.cartService.bindCartListChanged(this.onCartListChanged);
        this.view.bindClickDelete(this.handlerDeleteOrder) ;
        this.onWineListChanged(this.service.wines);
     
    }
     onWineListChanged = (wines) => {
       this.view.displayWines(wines);
     };
     onCartListChanged= (cart) => {
        this.view.displayCart(cart);
     }
   
      handlerClickCard=(id,units)=>{
        let wine=this.service.findWineById(id); 
        this.cartService.addWineToCart(wine,units);
      }
    
      handlerDeleteOrder=(idWine)=>{
        this.cartService.deleteWineToCart(idWine);
      }
     
}