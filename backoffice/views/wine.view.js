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
        this.titleForm=document.getElementById("titleForm");
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
       let htmlWine;
       wines.forEach((wine) => {
        htmlWine=document.createElement("tr");
        htmlWine.id=wine.id;
        htmlWine.innerHTML=`<td>${wine.name}</td>
                            <td>${wine.price}€</td>
                            <td>${wine.isSaleOn}</td>
                            <td> <img src="${wine.imgSrc}"></td>
                            <td>${wine.foodPairing}</td>
                            <td>
                            <a class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>`;
        this.winesCards.append(htmlWine);   
       });                    
               
    }
    _resetInputs(){
        this.image="";
        this.txtName.value="";
        this.txtPrice.value="";
        this.txtIsSaleOn.value="";
        this.txtImage="";
        this.currentWine="";
        this.titleForm.innerHTML="Wines Form"
    }

    
  bindAddwine(handler){
        this.add.addEventListener("click",event=>{
           event.preventDefault();  
            const wine={
                name : this.txtName.value,
                price : this.txtPrice.value,
                isSaleOn : this.txtIsSaleOn.value,
                imgSrc :'../assets/'+this.image,
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
    bindResetForm(handler){
        this.reset.addEventListener("click",event=>{
            event.preventDefault(); 
            handler();
            this._resetInputs();  
        })
    }
    bindClickTrUpdate(handler){
        this.winesCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='edit'){
             this.currentWine=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentWine);
             this.titleForm.innerHTML="Update Wine"
         }
        })  
     }
     bindDeleteWine(handler){
        this.winesCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='delete'){
             this.currentWine=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentWine);
            
         }
        })  
     }

 
   completeForm({name,imgSrc,price,isSaleOn,foodPairing}){
        this.txtName.value=name;
        this.txtPrice.value=price;
        this.txtIsSaleOn.value=isSaleOn;
        this.txtFoodPairing=foodPairing;
        this.image=imgSrc.substr(10);

    }
  
 bindUpdateWine(handler){
        this.update.addEventListener("click",event=>{
          event.preventDefault();  
            let wineUpdate={
                 id:  this.currentWine,
                 name : this.txtName.value,
                 price : this.txtPrice.value,
                 isSaleOn : this.txtIsSaleOn.value,
                 imgSrc :'../assets/'+this.image,
                 foodPairing : null
             }
             console.log(this.image);
             handler(wineUpdate);
             this._resetInputs();
 
         })
    }  
  /*  bindDeleteWine(handler){
        this.delete.addEventListener("click",event=>{
            event.preventDefault(); 
            handler(this.currentWine);
            this._resetInputs();  
        })
    }
   
    bindAddPurchase(handler){
        this.buy.addEventListener("click",event=>{
            event.preventDefault();  
            handler("hola");
        })

    }    */
    
}
    
 

