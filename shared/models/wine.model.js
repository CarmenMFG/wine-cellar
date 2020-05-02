
class Wine{
    constructor({name,price,isSaleOn,imgSrc,foodPairing}){
        this.id=this.uuidv4();
        this.name=name;
        this.price=price;
        this.isSaleOn=isSaleOn;
        this.imgSrc=imgSrc;
        this.foodPairing=foodPairing.map(food=>new Food(food));
                   
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