class WineView{
    constructor(){
        this.winesCards=document.getElementById('winesCards');
        this.currentWine;
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
        this.reset=document.getElementById('reset');
        this.image="";

    }
   displayWines(wines){
       //borro todos los vinos
        this.winesCards.innerHTML="";
       //Escribir todos los vinos..
       let html="";
        wines.forEach((wine) => {
          html+= `<div class="card card-size m-1 card-wine" id="${wine.id}">
                     <img class="card-img-top" src="${wine.imgSrc}" alt="Card image cap">
                     <div class="card-body ">
                        <h6 class="card-title">${wine.name}</h6>
                         <p>${wine.price}€</p>
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
                foodPairing :null
            }
            handler(wine);
            this. _resetInputs();

        })
    }
    bindChangeImage(handler){
        this.txtImage.addEventListener("change",event=>{
            event.preventDefault();  
            var input = event.target;
            var file = input.files[0];
            handler(file.name);
            this.image=file.name;
        });
    }

    _resetInputs(){
        this.image="";
        this.txtName.value="";
        this.txtPrice.value="";
        this.txtIsSaleOn.value="";
        this.txtImage="";
        this.currentWine="";
    }
    completeForm({name,imgSrc,price,isSaleOn,foodPairing}){
        this.txtName.value=name;
        this.txtPrice.value=price;
        this.txtIsSaleOn.value=isSaleOn;
        this.txtFoodPairing=foodPairing;
        this.image=imgSrc.substr(9);

    }
    bindClickCard(handler){
       this.winesCards.addEventListener("click",event=>{
        event.preventDefault();  
        if (event.target.className=='card-img-top'){
            this.currentWine=event.target.parentElement.id;
            handler(this.currentWine);
        }
       })  
    }
    bindUpdateWine(handler){
        this.update.addEventListener("click",event=>{
          event.preventDefault();  
            let wineUpdate={
                 id:  this.currentWine,
                 name : this.txtName.value,
                 price : this.txtPrice.value,
                 isSaleOn : this.txtIsSaleOn.value,
                 imgSrc :'./assets/'+this.image,
                 foodPairing : null
             }
             handler(wineUpdate);
             this._resetInputs();
 
         })
    }  
    bindDeleteWine(handler){
        this.delete.addEventListener("click",event=>{
            event.preventDefault(); 
            handler(this.currentWine);
            this._resetInputs();  
        })
    }
    bindResetForm(handler){
        this.reset.addEventListener("click",event=>{
            event.preventDefault(); 
            handler();
            this._resetInputs();  
        })
    }
    bindAddPurchase(handler){
        this.buy.addEventListener("click",event=>{
            event.preventDefault();  
            handler("hola");
        })

    }    
    
}
    
 

