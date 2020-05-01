class WineView{
    constructor(){
        this.winesCards=document.getElementById('winesCards');
        this.currentWine;
        this.btnShowForm=document.getElementById("btnShowForm");
        this.manageWines=document.getElementById("manageWines");
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
        htmlWine.innerHTML=`<td> <img src="${wine.imgSrc}"></td>
                            <td>${wine.name}</td>
                            <td>${wine.price}€</td>
                            <td>${wine.isSaleOn}</td>
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
        this.txtImage=null;
        this.currentWine="";
        this.titleForm.innerHTML="Wines Form";
        this.update.disabled=false;
        this.add.disabled=false;
       
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
            this._resetInputs();
            this.manageWines.style.display = 'none';
        })
    }
   bindChangeImage(){
        this.txtImage.addEventListener("change",event=>{
            event.preventDefault();  
            var input = event.target;
            var file = input.files[0];
            this.image=file.name;
        });
    }
    bindResetForm(){
        this.reset.addEventListener("click",event=>{
            event.preventDefault(); 
            this._resetInputs();  
        })
    }
    bindClickTrUpdate(handler){
        this.winesCards.addEventListener("click",event=>{
         event.preventDefault();  
         if (event.target.parentElement.className=='edit'){
             this.currentWine=event.target.parentElement.parentElement.parentElement.id;
             handler(this.currentWine);
             this.titleForm.innerHTML="Update <b>Wine</b>";
             this.manageWines.style.display = 'block';
             this.add.disabled=true;
             this.update.disabled=false;
            
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
             this.manageWines.style.display = 'none';
 
         })
    } 
    bindClickAddForm(){
        this.btnShowForm.addEventListener("click",event=>{
            event.preventDefault();  
            this._resetInputs();  
            this.titleForm.innerHTML="Add <b>Wine</b>";
            this.manageWines.style.display = 'block';
            this.update.disabled=true;
            this.add.disabled=false;
           
        })
    } 
  
}
    
 

