class WineView{
    constructor(){
        this.winesCards=document.getElementById('winesCards');
        this.btnBuy=document.getElementById('buy');
        
        //Modal del añadir vino
        this.btnAddWine=document.getElementById('btnAddWine');
        this.nameAddWine=document.getElementById('nameAddWine');
        this.priceAddWine=document.getElementById('priceAddWine');
        this.isSaleOnAddWine=document.getElementById('isSaleOnAddWine');
        this.imageAddWine=document.getElementById('imageAddWine');

    }
    displayWines(wines){
       //borro todos los vinos
        this.winesCards.innerHTML="";
       //Escribir todos los vinos..
       let html="";
        wines.forEach((wine) => {
          html+= `<div class="card card-size m-1 card-wine ">
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
        this.btnAddWine.addEventListener("click",event=>{
            event.preventDefault();  
            const wine={
                name : this.nameAddWine.value,
                price : this.priceAddWine.value,
                isSaleOn : this.priceAddWine.value,
                imgSrc :this.imageAddWine.value,
                foodPairing : null
            }
            handler(wine);
        })
    }
    
    
    
    
    
    
    bindAddPurchase(handler){
        this.btnBuy.addEventListener("click",event=>{
            event.preventDefault();  
            handler("hola");
        })
    }

}
