class WineView{
    constructor(){
        this.winesCards=document.getElementById('winesCards');
       //Formulario
        this.txtName=document.getElementById('txtName');
        this.txtPrice=document.getElementById('txtPrice');
        this.txtIsSaleOn=document.getElementById('txtIsSaleOn');
        this.txtImage=document.getElementById('txtImage');
        this.txtFoodPairing=document.getElementById('txtFoodPairing');
        //Botones
        this.buy=document.getElementById('buy');
        this.update=document.getElementById('update');
        this.delete=document.getElementById('delete');
        this.add=document.getElementById('add');
        this.image="";

    }
   displayWines(wines){
       //borro todos los vinos
        this.winesCards.innerHTML="";
       //Escribir todos los vinos..
       let html="";
        wines.forEach((wine) => {
          html+= `<div class="card card-size m-1 card-wine">
                            <img class="card-img-top" src="${wine.imgSrc}" alt="Card image cap">
                          <div class="card-body ">
                              <h6 class="card-title">${wine.name}</h6>
                              <input type="number" value="0"  min="0" max="9" step="1"/>
                           </div>
                  </div>`;
        });   
        this.winesCards.innerHTML= html ;  
           
    }

    
  bindAddwine(handler){
        this.add.addEventListener("click",event=>{
           event.preventDefault();  
            const wine={
                name : this.txtName.value,
                price : this.txtPrice.value,
                isSaleOn : this.txtIsSaleOn.value,
                imgSrc :'./assets/'+this.image,
                foodPairing : null
            }
            handler(wine);
            this.image="";

        })
    }
    bindChangeImage(handler){
        this.txtImage.addEventListener("change",event=>{
            event.preventDefault();  
            var input = event.target;
            var file = input.files[0];
           // console.log(file.name);
            handler(file.name);
            this.image=file.name;
        });
    }
    
    
    
    
    
    
 /*   bindAddPurchase(handler){
        this.btnBuy.addEventListener("click",event=>{
            event.preventDefault();  
            handler("hola");
        })
    }*/

}
