class WineView{
    constructor(){
        this.winesCards=document.getElementById('winesCards');
        this.cart=document.getElementById('cart');
        this.bill=document.getElementById("bill");
        this.currentWine;

        //Modal mas informacion sobre el vino..
        this.modalShowInfoWine=document.getElementById("modalShowInfoWine");
        this.modalName=document.getElementById("modalName");
        this.modalInfo=document.getElementById("modalInfo");
        this.modalFoodsPairing=document.getElementById("modalFoodsPairing");
        this.modalPhoto=document.getElementById("modalPhoto");
       
    }
   displayWines(wines){
       //borro todos los vinos
        this.winesCards.innerHTML="";
       //Escribir todos los vinos..
       let html="";
       let info;
        wines.forEach((wine) => {
            info="";
          wine.foodPairing.forEach((food)=>{
            info+=`<b>${food.name}</b><br>`;
            info+=`${food.kcal }kcal<br>`;  
            info =(food.isVegan) ? info+"Is vegan<br>" : info+"No vegan<br>";
            info =(food.isGluten) ? info+"Is gluten<br><br>" : info+"No gluten<br><br>";
           // info =(wine.isGluten)
          });
          
           
         
        


          html+= `<div class="card card-size m-1 card-wine" id="${wine.id}">
                     <img class="card-img-top" src="${wine.imgSrc}" alt="Card image cap">
                     <div class="card-body ">
                        <h4 class="card-title">${wine.name}</h4>
                         <p>${wine.price}€</p>
                         <input id="i_${wine.id}"class="units" type="number" value="0"  min="0" max="200" step="1"/><br>
                         <a href="#infoWine_${wine.id}" class="delete" data-toggle="collapse"><i class="material-icons" data-toggle="tooltip">expand_more</i></a>
                          <p id="infoWine_${wine.id}"  class="collapse">
                            <b style="color:#6588b2;font-size:1.2em;"> Is sale on </b>${wine.isSaleOn}<br>
                            <b style="color:#6588b2;font-size:1.2em;">Foods pairing</b>
                            ${info} 
                           </p>
                         </div>
                  </div>`;
        });   
        this.winesCards.innerHTML= html ;  
           
    }
    displayCart(orders){
        console.log(orders);
        this.cart.innerHTML="";
        let htmlCart;
        let bill=0;
        for (var [id, order] of Object.entries(orders)) {
              if ( order.units > 0 ) {
                htmlCart=document.createElement("tr");
                htmlCart.id=id;
                htmlCart.innerHTML=`<td>${order.units}</td>
                                    <td>${order.name}</td>
                                    <td>${order.price}€</td>
                                    <td>${order.subtotal}</td>
                                    <td>
                                     <a class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete"  style="font-size:15px">&#xE872;</i></a>
                                    </td>`;
          bill+=parseFloat(order.subtotal);                      
          this.cart.append(htmlCart);   
        } 
        this.bill.innerHTML=bill.toFixed(2);
             
      
        }    
     
    }
    bindClickCard(handler){ //Cuando cambia el numero de unidades.. 
        this.winesCards.addEventListener("click",event=>{
         event.preventDefault();  
        if (event.target.className=='units'){
            this.currentWine=event.target.parentElement.parentElement.id;
             handler(this.currentWine,event.srcElement.value);//Le paso el id del vino y la cantidad
         }
        })  
     }
     bindClickCardInfo(handler){ //Cuando click para más informacion.. 
        this.winesCards.addEventListener("click",event=>{
         event.preventDefault(); 
        if (event.target.className=='info material-icons'){
             this.currentWine=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentWine);//Le paso el id del vino del q quiero información
         }
        })  
     }

     bindClickDelete(handler){
        this.cart.addEventListener("click",event=>{
         event.preventDefault();  
        if (event.target.className=='material-icons'){
             this.currentWine=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentWine);//Le paso el id del vino
             document.getElementById("i_"+this.currentWine).value=0;//Pongo a 0 en la carta de vinos
          }
        })  
     }
      

    
}
    
 

