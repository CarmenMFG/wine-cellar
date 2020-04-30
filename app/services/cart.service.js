class CartService{
    constructor(){
       this.cart={}; 
       this.onCartChanged=null;
    }
   
    addWineToCart({id,name,price},units){
      this.cart[id]={
            name,
            price,
            units:parseInt(units),
            subtotal:(parseInt(units)*parseFloat(price)).toFixed(2)
      }
       this._commit(this.cart);
    }
    
    bindCartListChanged(callback){
        this.onCartChanged=callback;
    }
    
    deleteWineToCart(idWine){
        this.cart[idWine].units=0;
        this._commit(this.cart);
    }
    
    _commit(cart){
        this.onCartChanged(cart);
    }
   
}        
