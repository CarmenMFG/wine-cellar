class WineView{
    constructor(){
        this.winesCards=document.getElementById('winesCards');
        this.cart=document.getElementById('cart');
        this.bill=document.getElementById("bill");
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
                         <input class="price" type="number" value="0"  min="0" max="200" step="1"/>
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
              if ( order.units>0 ) {
                htmlCart=document.createElement("tr");
                htmlCart.id=id;
                htmlCart.innerHTML=`<td>${order.name}</td>
                                <td>${order.price}€</td>
                                <td>${order.units}</td>
                                <td>${order.subtotal}</td>
                                <td>
                                <a class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                </td>`;
          bill+=parseFloat(order.subtotal);                      
          this.cart.append(htmlCart);   
        } 
        this.bill.innerHTML=bill;
             
      
        }    
     
    }
    bindClickCard(handler){
        this.winesCards.addEventListener("click",event=>{
         event.preventDefault();  
        if (event.target.className=='price'){
            this.currentWine=event.target.parentElement.parentElement.id;
             handler(this.currentWine,event.srcElement.value);//Le paso el id del vino y la cantidad
         }
        })  
     }
     bindClickDelete(handler){
        this.cart.addEventListener("click",event=>{
         event.preventDefault();  
        if (event.target.className=='material-icons'){
             this.currentWine=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentWine);//Le paso el id del vino
         }
        })  
     }
    

    
}
    
 

