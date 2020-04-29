class WineView{
    constructor(){
        this.winesCards=document.getElementById('winesCards');
        this.currentWine;
       
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
                         <input class="price" type="number" value="0"  min="0" max="9" step="1"/>
                     </div>
                  </div>`;
        });   
        this.winesCards.innerHTML= html ;  
           
    }
    bindClickCard(handler){
        this.winesCards.addEventListener("click",event=>{
         event.preventDefault();  
         console.log(event.target.className);
         if (event.target.className=='price'){
            this.currentWine=event.target.parentElement.parentElement.id;
             handler(this.currentWine);
         }
        })  
     }

    
}
    
 

