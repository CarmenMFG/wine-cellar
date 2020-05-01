
class Wine{
    constructor({name,price,isSaleOn,imgSrc,foodPairing}){
        this.id=this.uuidv4();
        this.name=name;
        this.price=price;
        this.isSaleOn=isSaleOn;
        this.imgSrc=imgSrc;
        if (foodPairing!==null){
          this.foodPairing=foodPairing.map(food=>new Food(food));
        }else{
          this.foodPairing=foodPairing;
        }
       
       // this.foodPairing=foodPairing;
       // this.foodPairing=new Food({name:'Patatas',isVegan:true,isGluten:true,kcal:15});
        
    }
    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      }
}